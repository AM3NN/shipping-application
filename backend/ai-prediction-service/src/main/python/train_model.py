import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib

# Load cleaned data
df = pd.read_csv('../resources/orders_cleaned.csv')

# Define input features
X = df[['quantity', 'thickness', 'height', 'width', 'weight'] +
       [col for col in df.columns if 'text_paper_type_' in col or 'cover_finish_type_' in col or 'binding_type_' in col]]

# Define targets
y_price = df['unit_price']
y_time = df['fabrication_time_days']

# Split data
X_train, X_test, y_price_train, y_price_test, y_time_train, y_time_test = train_test_split(X, y_price, y_time, test_size=0.2, random_state=42)

# Train price model
price_model = RandomForestRegressor(n_estimators=100)
price_model.fit(X_train, y_price_train)
joblib.dump(price_model, '../resources/price_model.pkl')

# Train time model
time_model = RandomForestRegressor(n_estimators=100)
time_model.fit(X_train, y_time_train)
joblib.dump(time_model, '../resources/time_model.pkl')

# Evaluate
print("Price MAE:", mean_absolute_error(y_price_test, price_model.predict(X_test)))
print("Time MAE:", mean_absolute_error(y_time_test, time_model.predict(X_test)))