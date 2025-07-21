import pandas as pd

df = pd.read_csv('../resources/orders.csv', on_bad_lines='skip', low_memory=False)
df['expected_date'] = pd.to_datetime(df['expected_date'], errors='coerce')
df['reception_date'] = pd.to_datetime(df['reception_date'], errors='coerce')
df['delivery_date'] = pd.to_datetime(df['delivery_date'], errors='coerce')
df['fabrication_time_days'] = (df['delivery_date'] - df['reception_date']).dt.days
df['fabrication_time_days'] = df['fabrication_time_days'].fillna(df['fabrication_time_days'].median())
numeric_cols = ['quantity', 'thickness', 'height', 'width', 'weight', 'unit_price']
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')
df = pd.get_dummies(df, columns=['text_paper_type', 'cover_finish_type', 'binding_type'])
df.to_csv('../resources/orders_cleaned.csv', index=False)
