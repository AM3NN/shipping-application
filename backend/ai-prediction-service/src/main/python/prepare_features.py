import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split

df = pd.read_csv('../resources/orders_cleaned.csv')

# Feature selection
X = df[['partId', 'quantity', 'thickness', 'height', 'width', 'weight', 'textPaperType', 'coverFinishType']]
y_price = df['totalAmount']
y_time = df['estimatedFabricationTime']

# Encode categorical features
preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', ['quantity', 'thickness', 'height', 'width', 'weight']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['textPaperType', 'coverFinishType'])
    ])

X_processed = preprocessor.fit_transform(X)

# Split data
X_train, X_test, y_price_train, y_price_test, y_time_train, y_time_test = train_test_split(
    X_processed, y_price, y_time, test_size=0.2, random_state=42
)

# Save preprocessor for reuse
import joblib
joblib.dump(preprocessor, '../resources/preprocessor.pkl')