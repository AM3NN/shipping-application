from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    preprocessor = joblib.load('../resources/preprocessor.pkl')
    price_model = joblib.load('../resources/price_model.pkl')
    time_model = joblib.load('../resources/time_model.pkl')
except Exception as e:
    print(f"Error loading models: {e}")
    raise e

DEFAULT_VALUES = {
    'quantity': 1,
    'production_page': 1,
    'thickness': 0.0,
    'height': 0.0,
    'width': 0.0,
    'weight': 0.0,
    'text_paper_type': '70#OFFSET',
    'cover_finish_type': 'NONE',
    'binding_type': 'SS',
    'text_color': '1/1',
    'shrinkwrap': 0,
    'three_hole_drill': 0,
    'perf': 0
}

NUMERIC_FIELDS = ['quantity', 'production_page', 'thickness', 'height', 'width', 'weight']

CATEGORICAL_FIELDS = ['text_paper_type', 'cover_finish_type', 'binding_type', 'text_color']

BINARY_FLAGS = ['shrinkwrap', 'three_hole_drill', 'perf']


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON payload received"}), 400

        input_data = {}
        for col, default in DEFAULT_VALUES.items():
            value = data.get(col)

            if col in NUMERIC_FIELDS:
                try:
                    input_data[col] = float(value) if value not in [None, ''] else default
                except (ValueError, TypeError):
                    input_data[col] = default

            elif col in CATEGORICAL_FIELDS:
                input_data[col] = value if value else default

            elif col in BINARY_FLAGS:
                input_data[col] = 1 if value in [True, 'true', 'True', 1, '1'] else 0

        df = pd.DataFrame([input_data])

        if df['quantity'].iloc[0] <= 0:
            return jsonify({"error": "Quantity must be greater than 0"}), 400
        if df['production_page'].iloc[0] <= 0:
            return jsonify({"error": "Number of pages must be greater than 0"}), 400

        try:
            X_processed = preprocessor.transform(df)
        except Exception as e:
            print(f"Preprocessing error: {e}")
            return jsonify({"error": "Failed to process input features. Check data types."}), 500

        predicted_price = float(price_model.predict(X_processed)[0])
        estimated_time = float(time_model.predict(X_processed)[0])

        if df['text_color'].iloc[0] == '4/4':
            # Increase price by 25% for full color
            predicted_price *= 1.25
        elif df['text_color'].iloc[0] == '4/1':
            predicted_price *= 1.1

        final_price = round(predicted_price, 2)
        final_time = max(1, int(round(estimated_time)))  # At least 1 day

        return jsonify({
            "predictedPrice": final_price,
            "estimatedFabricationTime": f"{final_time} days"
        })

    except Exception as e:
        print(f"Error in /predict: {e}")
        return jsonify({
            "error": "Prediction failed due to internal error. Please check inputs."
        }), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)