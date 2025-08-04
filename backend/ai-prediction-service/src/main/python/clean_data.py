import pandas as pd
import numpy as np

# Load raw data
df = pd.read_csv('../resources/orders.csv', on_bad_lines='skip', low_memory=False)

# Step 1: Convert date columns to datetime
df['reception_date'] = pd.to_datetime(df['reception_date'], errors='coerce')
df['delivery_date'] = pd.to_datetime(df['delivery_date'], errors='coerce')
df['expected_date'] = pd.to_datetime(df['expected_date'], errors='coerce', format='%Y-%m-%d')

# Step 2: Calculate fabrication_time_days and fill missing values
df['fabrication_time_days'] = (df['delivery_date'] - df['reception_date']).dt.days
median_fabrication_time = df['fabrication_time_days'].median()
df['fabrication_time_days'].fillna(median_fabrication_time, inplace=True)

# Step 3: Ensure non-negative fabrication time
df = df[df['fabrication_time_days'] >= 0]

# Step 4: Convert numeric columns to numeric type
numeric_cols = ['quantity', 'production_page', 'thickness', 'height', 'width', 'weight', 'unit_price']
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# Step 5: Impute missing numeric values
for col in numeric_cols:
    df[col].fillna(df[col].median(), inplace=True)

# Step 6: Impute missing categorical values with mode
categorical_cols = ['text_paper_type', 'cover_finish_type', 'binding_type', 'text_color']
for col in categorical_cols:
    mode_value = df[col].mode()[0]
    df[col].fillna(mode_value, inplace=True)

# Step 7: Handle binary columns (assume 0 for missing)
binary_cols = ['shrinkwrap', 'three_hole_drill', 'perf']
for col in binary_cols:
    df[col].fillna(0, inplace=True)

# Step 8: Impute delivery_date for consistency
missing_delivery = df['delivery_date'].isna()
df.loc[missing_delivery, 'delivery_date'] = df.loc[missing_delivery, 'reception_date'] + \
                                            pd.to_timedelta(df.loc[missing_delivery, 'fabrication_time_days'], unit='days')

# Step 9: Handle remaining missing dates
df['delivery_date'].fillna(df['reception_date'] + pd.to_timedelta(median_fabrication_time, unit='days'), inplace=True)
df['reception_date'].fillna(df['expected_date'], inplace=True)
df['expected_date'].fillna(df['reception_date'], inplace=True)

# Step 10: Drop rows with critical missing values
df.dropna(subset=['order_id', 'part_id'], inplace=True)

# Step 11: Save cleaned CSV
df.to_csv('../resources/orders_cleaned.csv', index=False)
print("Cleaned CSV saved as '../resources/orders_cleaned.csv'")