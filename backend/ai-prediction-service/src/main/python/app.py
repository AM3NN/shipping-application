from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

preprocessor = joblib.load('../resources/preprocessor.pkl')
price_model = joblib.load('../resources/price_model.pkl')
time_model = joblib.load('../resources/time_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    df = pd.DataFrame([data])

    required_columns = ['quantity', 'thickness', 'height', 'width', 'weight',
                        'text_paper_type', 'cover_finish_type', 'binding_type']
    for col in required_columns:
        if col not in df.columns:
            return jsonify({"error": f"Missing field: {col}"}), 400

    X_processed = preprocessor.transform(df)

    predicted_price = price_model.predict(X_processed)[0]
    estimated_time = time_model.predict(X_processed)[0]

    return jsonify({
        "predictedPrice": round(predicted_price, 2),
        "estimatedFabricationTime": f"{round(estimated_time)} days"
    })

if __name__ == '__main__':
    app.run(debug=True)
