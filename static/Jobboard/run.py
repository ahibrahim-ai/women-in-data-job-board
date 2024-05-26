import pandas as pd
import json

# Load the data
file_path = 'jobs.csv'
jobs_df = pd.read_csv(file_path)

# Convert DataFrame to JSON
jobs_json = jobs_df.to_json(orient='records')

# Save to a JSON file
with open('jobs.json', 'w') as json_file:
    json_file.write(jobs_json)
