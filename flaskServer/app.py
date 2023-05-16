import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import pandas as pd


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
    response = requests.get(f'{BASE_URL}incidents/{incident_type}/', auth=(USERNAME, PASSWORD))
    return response.json()

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
    if 'reported_by' in df.columns:
        # creating an internal ip if there is a reported by column
        df['internal_ip'] = df['reported_by'].map(employee_to_ip).fillna(df['reported_by'])
        # deleting the reported by column to make data more uniform
        df = df.drop('reported_by', axis=1)
    if 'internal_ip' in df.columns:
        # adding employee id associated with internal ip
        df['employee_id'] = df['internal_ip'].map(ip_to_employee).fillna(df['internal_ip'])
    if 'machine_ip' in df.columns:
        # adding employee id associated with machine ip
        df['employee_id'] = df['machine_ip'].map(ip_to_employee).fillna(df['machine_ip'])
        df.rename(columns={"machine_ip": "internal_ip"}, inplace=True)
    
    # Convert DataFrame back to dictionary
    incidents['results'] = df.to_dict('records')

    return incidents

    
@app.route('/incidents')
def incidents():
    types = ['denial', 'intrusion', 'executable']
    response = requests.get(f'{BASE_URL}identities/', auth=(USERNAME, PASSWORD))
    # mapping through the data to transpose the data to return it
    if response.status_code == 200:
        ip_to_employee = response.json()
        incidents = [transpose_data(incident_type, ip_to_employee) for incident_type in types]
        return jsonify(incidents)
    return jsonify([]) 



    
# data endpoint for backend to be used
@app.route('/identities')
def get_employee_ids():
    response = requests.get(f'{BASE_URL}identities/', auth=(USERNAME, PASSWORD))
    return jsonify(response.json())


if __name__ == "__main__":
    app.run(port=9000)


