import pandas as pd
from geopy.geocoders import OpenCage
import time

# Load the CSV file into a Pandas DataFrame
df = pd.read_csv('jobs.csv')

# Initialize the OpenCage geocoder
geocoder = OpenCage('8b2f5e9e4a0a451cadb82a99ec247276')  # Replace 'your-api-key' with your OpenCage API key

# Function to geocode an address
def geocode_address(city, country):
    try:
        location = geocoder.geocode(f"{city}, {country}", timeout=10)
        return location.latitude, location.longitude
    except:
        return None, None

# Apply the geocoding function to each row
df['latitude'] = None
df['longitude'] = None

for index, row in df.iterrows():
    lat, lon = geocode_address(row['city'], row['country'])
    df.at[index, 'latitude'] = lat
    df.at[index, 'longitude'] = lon
    time.sleep(1)  # To avoid hitting the rate limit of the geocoding service

# Save the updated DataFrame to a new CSV file
df.to_csv('jobs_with_coordinates.csv', index=False)

import dash
from dash import dcc
from dash import html
from dash.dependencies import Input, Output
import pandas as pd
import plotly.express as px

# Load the updated CSV file into a Pandas DataFrame
df = pd.read_csv('jobs_with_coordinates.csv')

# Initialize the Dash app
app = dash.Dash(__name__)

# Create the map using Plotly Express
fig = px.scatter_mapbox(
    df,
    lat="latitude",
    lon="longitude",
    hover_name="title",
    hover_data=["company", "city","tags"],
    zoom=3,
    height=600
)

# Update map style
fig.update_layout(mapbox_style="open-street-map")

# Define the layout of the Dash app
app.layout = html.Div([
    html.H1("Job Locations Map"),
    dcc.Graph(figure=fig)
])

# Run the Dash app
if __name__ == '__main__':
    app.run_server(debug=True)
