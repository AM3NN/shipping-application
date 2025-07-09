import pandas as pd

# Load the CSV
df = pd.read_csv('../resources/orders.csv', on_bad_lines='skip', low_memory=False)

# Convert date strings to datetime objects
df['expected_date'] = pd.to_datetime(df['expected_date'], errors='coerce')
df['reception_date'] = pd.to_datetime(df['reception_date'], errors='coerce')
df['delivery_date'] = pd.to_datetime(df['delivery_date'], errors='coerce')

# Calculate fabrication time in days
df['fabrication_time_days'] = (df['delivery_date'] - df['reception_date']).dt.days

# Fill missing fabrication time with median
df['fabrication_time_days'].fillna(df['fabrication_time_days'].median(), inplace=True)

# Convert numeric fields to correct type
numeric_cols = ['quantity', 'thickness', 'height', 'width', 'weight', 'unit_price']
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# One-hot encode categorical fields
df = pd.get_dummies(df, columns=['text_paper_type', 'cover_finish_type', 'binding_type'])

# Save cleaned version
df.to_csv('../resources/orders_cleaned.csv', index=False)