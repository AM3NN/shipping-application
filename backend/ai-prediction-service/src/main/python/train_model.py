import pandas as pd
from sklearn.model_selection import train_test_split
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load cleaned data
df = pd.read_csv('../resources/orders_cleaned.csv', low_memory=False)

# Define feature columns (all fabrication-related)
numeric_features = ['quantity', 'production_page', 'thickness', 'height', 'width', 'weight',
                    'shrinkwrap', 'three_hole_drill', 'perf']
categorical_features = ['text_paper_type', 'cover_finish_type', 'binding_type', 'text_color']

# Prepare features and targets
X = df[numeric_features + categorical_features]
y_price = df['unit_price']
y_time = df['fabrication_time_days']

# Check for missing values
if X.isna().any().any():
    print("Warning: Missing values in features:", X.isna().sum())

# Check unique values in categorical features
for col in categorical_features:
    print(f"Unique values in {col}:", df[col].unique())

# Preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
    ]
)

# Transform features
X_processed = preprocessor.fit_transform(X)
joblib.dump(preprocessor, '../resources/preprocessor.pkl')

# Split data
X_train, X_test, y_price_train, y_price_test, y_time_train, y_time_test = train_test_split(
    X_processed, y_price, y_time, test_size=0.2, random_state=42)

# Train price model
price_model = RandomForestRegressor(random_state=42)
price_model.fit(X_train, y_price_train)
joblib.dump(price_model, '../resources/price_model.pkl')

# Train time model
time_model = RandomForestRegressor(random_state=42)
time_model.fit(X_train, y_time_train)
joblib.dump(time_model, '../resources/time_model.pkl')

# Get feature importances
feature_names = numeric_features + list(preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features))
price_importances = pd.Series(price_model.feature_importances_, index=feature_names)
time_importances = pd.Series(time_model.feature_importances_, index=feature_names)

# Print results
print("Price Model Feature Importances:")
print(price_importances.sort_values(ascending=False))
print("\nTime Model Feature Importances:")
print(time_importances.sort_values(ascending=False))

print("\nPrice MAE:", mean_absolute_error(y_price_test, price_model.predict(X_test)))
print("Time MAE:", mean_absolute_error(y_time_test, time_model.predict(X_test)))