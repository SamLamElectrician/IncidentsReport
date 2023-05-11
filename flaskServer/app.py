import requests
from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from operator import itemgetter
from itertools import chain
from flask_cors import CORS

# base variables using env 
load_dotenv()
USERNAME = os.getenv("LOGIN")
PASSWORD = os.getenv('PASSWORD')
BASE_URL = 'https://incident-api.use1stag.elevatesecurity.io/incidents/'

# init the app
app = Flask(__name__)
# enable cors so front end can access the backend through flask_cors
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# general end point creater
def get_incidents(incident_type):
    response = requests.get(
        f'{BASE_URL}{incident_type}/',
        auth=(USERNAME, PASSWORD)
    )
    return response.json()

# endpoint for ALL incidents
@app.route('/incidents')
def incidents():
    types = ['denial', 'intrusion', 'executable']
    incidents = [get_incidents(incident_type) for incident_type in types]
    return jsonify(incidents)

# url generator for denial
def get_denial_incidents():
    response = requests.get(
        f'{BASE_URL}denial/',
        auth=(USERNAME, PASSWORD)
    )
    return response.json()

#aend point access
@app.route('/incidents/denial/')
def denial_incidents():
    incidents = get_denial_incidents()
    return jsonify(incidents) 


def get_intrusion_incidents():
    response = requests.get(
        f'{BASE_URL}intrusion/',
        auth=(USERNAME, PASSWORD)
    )
    return response.json()

@app.route('/incidents/intrusion/')
def intrusion_incidents():
    incidents = get_intrusion_incidents()
    return jsonify(incidents) 


def get_executable_incidents():
    response = requests.get(
        f'{BASE_URL}executable/',
        auth=(USERNAME, PASSWORD)
    )
    return response.json()

@app.route('/incidents/executable/')
def executable_incidents():
    incidents = get_executable_incidents()
    return jsonify(incidents) 

if __name__ == "__main__":
    app.run(port=9000)


   