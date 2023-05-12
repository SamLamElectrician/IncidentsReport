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

def get_incidents(incident_type):
    response = requests.get(f'{BASE_URL}incidents/{incident_type}/', auth=(USERNAME, PASSWORD))
    return response.json()


# fetch all incidents
@app.route('/incidents')
def incidents():
    types = ['denial', 'intrusion', 'executable']
    incidents = [get_incidents(incident_type) for incident_type in types]
    return jsonify(incidents)

# fetch specific incident types
@app.route('/incidents/<incident_type>/')
def specific_incidents(incident_type):
    incidents = get_incidents(incident_type)
    response = requests.get(f'{BASE_URL}identities/', auth=(USERNAME, PASSWORD))
    if response.status_code == 200:
        ip_to_employee = response.json()

        # Convert the incidents to a pandas DataFrame
        df = pd.DataFrame(incidents['results'])
        print(df)
        # Replace the values in the 'internal_ip' column with the employee numbers, if 'internal_ip' column exists
        if response.status_code == 200:
            ip_to_employee = response.json()

        for result in incidents['results']:
            if 'internal_ip' in result:
                if result['internal_ip'] in ip_to_employee:
                    result['internal_ip'] = ip_to_employee[result['internal_ip']]
            
            if 'machine_ip' in result:
                if result['machine_ip'] in ip_to_employee:
                    result['machine_ip'] = ip_to_employee[result['machine_ip']]

    return jsonify(incidents)
    

@app.route('/identities')
def get_employee_ids():
    response = requests.get(f'{BASE_URL}identities/', auth=(USERNAME, PASSWORD))
    return jsonify(response.json())


if __name__ == "__main__":
    app.run(port=9000)


