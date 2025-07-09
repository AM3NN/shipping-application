import pandas as pd

df = pd.read_csv('../resources/orders.csv', on_bad_lines='skip', low_memory=False)

print("Columns:", df.columns.tolist())
print("\nMissing values:\n", df.isnull().sum())
print("\nSample data:\n", df.head(2).to_dict())