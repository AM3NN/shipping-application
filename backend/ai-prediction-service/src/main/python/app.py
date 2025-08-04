from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your preprocessor and models
preprocessor = joblib.load('../resources/preprocessor.pkl')
price_model = joblib.load('../resources/price_model.pkl')
time_model = joblib.load('../resources/time_model.pkl')

# Define all required columns expected by the preprocessor
required_columns = [
    'quantity', 'thickness', 'height', 'width', 'weight',
    'text_paper_type', 'cover_finish_type', 'binding_type',
    'shrinkwrap', 'production_page', 'perf', 'three_hole_drill', 'text_color'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON payload received"}), 400

        df = pd.DataFrame([data])

        # Check for missing columns
        missing_cols = [col for col in required_columns if col not in df.columns]
        if missing_cols:
            return jsonify({"error": f"Missing fields: {', '.join(missing_cols)}"}), 400

        # Optional: if you want to fill any missing values with None (in case client sends incomplete data)
        # for col in required_columns:
        #     if df[col].isnull().any():
        #         df[col] = df[col].fillna(value=None)

        # Transform input with your preprocessor
        X_processed = preprocessor.transform(df)

        # Make predictions
        predicted_price = price_model.predict(X_processed)[0]
        estimated_time = time_model.predict(X_processed)[0]

        return jsonify({
            "predictedPrice": round(predicted_price, 2),
            "estimatedFabricationTime": f"{round(estimated_time)} days"
        })
    except Exception as e:
        # Log error and send JSON error response
        print(f"Error in /predict: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
