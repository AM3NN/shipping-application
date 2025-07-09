from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained models
price_model = joblib.load('../resources/price_model.pkl')
time_model = joblib.load('../resources/time_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Convert to DataFrame
    df = pd.DataFrame([data])

    # Ensure correct feature format
    df = pd.get_dummies(df)

    # Predict
    predicted_price = price_model.predict(df)[0]
    predicted_time = time_model.predict(df)[0]

    return jsonify({
        "predictedPrice": round(float(predicted_price), 2),
        "estimatedFabricationTime": f"{int(round(predicted_time, 0))} days"
    })

if __name__ == '__main__':
    app.run(debug=True)