import pandas as pd
from sklearn.model_selection import train_test_split
import joblib

# Load raw data
df = pd.read_csv('../resources/orders.csv', on_bad_lines='skip', low_memory=False)

# Dates
df['reception_date'] = pd.to_datetime(df['reception_date'], errors='coerce')
df['delivery_date'] = pd.to_datetime(df['delivery_date'], errors='coerce')
df['fabrication_time_days'] = (df['delivery_date'] - df['reception_date']).dt.days
df['fabrication_time_days'].fillna(df['fabrication_time_days'].median(), inplace=True)
df = df[df['fabrication_time_days'] >= 0]

# Numeric
for col in ['quantity', 'thickness', 'height', 'width', 'weight', 'unit_price']:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# Drop rows with missing critical fields
df.dropna(subset=['quantity', 'thickness', 'height', 'width', 'weight',
                  'text_paper_type', 'cover_finish_type', 'binding_type'], inplace=True)

# Define input features
X = df[['quantity', 'thickness', 'height', 'width', 'weight',
        'text_paper_type', 'cover_finish_type', 'binding_type']]
y_price = df['unit_price']
y_time = df['fabrication_time_days']

# Load or create preprocessor
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', ['quantity', 'thickness', 'height', 'width', 'weight']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['text_paper_type', 'cover_finish_type', 'binding_type'])
    ]
)

# Fit + save preprocessor
X_processed = preprocessor.fit_transform(X)
joblib.dump(preprocessor, '../resources/preprocessor.pkl')

# Train/test split
X_train, X_test, y_price_train, y_price_test, y_time_train, y_time_test = train_test_split(
    X_processed, y_price, y_time, test_size=0.2, random_state=42)

# Train and save models
from sklearn.ensemble import RandomForestRegressor

price_model = RandomForestRegressor()
price_model.fit(X_train, y_price_train)
joblib.dump(price_model, '../resources/price_model.pkl')

time_model = RandomForestRegressor()
time_model.fit(X_train, y_time_train)
joblib.dump(time_model, '../resources/time_model.pkl')

# Optional: print evaluation
from sklearn.metrics import mean_absolute_error
print("Price MAE:", mean_absolute_error(y_price_test, price_model.predict(X_test)))
print("Time MAE:", mean_absolute_error(y_time_test, time_model.predict(X_test)))
