import pandas as pd

df = pd.read_csv('../resources/orders.csv', on_bad_lines='skip', low_memory=False)


print("Unique cover_finish_type values:", df['cover_finish_type'].unique())