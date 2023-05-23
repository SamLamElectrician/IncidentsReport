import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import pandas as pd
import threading

incident_data_saved = None


# load environment variables
load_dotenv()
USERNAME = os.getenv("LOGIN")
PASSWORD = os.getenv('PASSWORD')
BASE_URL = 'https://incident-api.use1stag.elevatesecurity.io/'


# initialize flask app
app = Flask(__name__)

# enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# return data from URL
def get_incidents(incident_type):
    try:
        response = requests.get(f'{BASE_URL}incidents/{incident_type}/', auth=(USERNAME, PASSWORD))
        response.raise_for_status()  # raise HTTPError if the response status code isn't 200
        return response.json()
    except RequestException as e:
        print(f'Error fetching data: {e}')
        return None


# general function to sort for key values and reverse
def reverse_dict(d):
    return {v: k for k, v in d.items()}
# transposing data
def transpose_data(incident_type, ip_to_employee):
    # reversing the employee data to grab employee ip to map
    employee_to_ip = reverse_dict(ip_to_employee)
    # getting data from the get request
    incidents = get_incidents(incident_type)
    # converting the data to a data frame
    df = pd.DataFrame(incidents['results'])
    # Add 'incident_type' column
    df['incident_report'] = incident_type
    # Add 'employeeID', 'internal_ip', and 'machine_ip' fields by mapping from relevant fields
    if 'reported_by' in df.columns and incident_type == 'denial':
        df['internal_ip'] = df['reported_by'].map(employee_to_ip)
        df.rename(columns={"reported_by": "employee_id"}, inplace=True)
        # creating an internal ip if there is a reported by column
    if 'internal_ip' in df.columns and incident_type == 'intrusion':
        # adding employee id associated with internal ip
        df['employee_id'] = df['internal_ip'].map(ip_to_employee)
    if 'machine_ip' in df.columns and incident_type == 'executable':
        # adding employee id associated with machine ip
        df['employee_id'] = df['machine_ip'].map(ip_to_employee)
        df.rename(columns={"machine_ip": "internal_ip"}, inplace=True)
    if 'source_ip' not in df.columns and incident_type == 'executable':
        df['source_ip'] = "Not Available"
    return df

    
@app.route('/incidents')
def incidents():
    return jsonify(incident_data_saved)


def background_get_incidents():
    global incident_data_saved
    types = ['denial', 'intrusion', 'executable']
    response = requests.get(f'{BASE_URL}identities/', auth=(USERNAME, PASSWORD))
    # mapping through the data to transpose the data to return it
    if response.status_code == 200:
        ip_to_employee = response.json()
        incidents = [transpose_data(incident_type, ip_to_employee) for incident_type in types]
        all_incidents = pd.concat(incidents)
        # sorting via unix time
        all_incidents['timestamp'] = pd.to_numeric(all_incidents['timestamp'])
        # Sort by 'time_occurred'
        all_incidents.sort_values(by='timestamp', inplace=True, ascending=False)
        all_incidents.dropna(inplace=True)
        # Convert sorted DataFrame back to JSON
        incident_data_saved = all_incidents.to_dict('records')
    threading.Timer(30, background_get_incidents).start()
    

if __name__ == "__main__":
    background_get_incidents()
    app.run(port=9000)


