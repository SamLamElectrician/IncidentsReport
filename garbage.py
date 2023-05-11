from flask import Flask, jsonify
from dotenv import load_dotenv
import requests
import os
from requests.auth import HTTPBasicAuth
import pandas as pd


app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, world!"

@app.route('/')
def get_incidents():
    respons

def get_incidents(incident_type):
    response = requests.get(
        f'{BASE_URL}{incident_type}/',
        auth=(USERNAME, PASSWORD)
    )
    return response.json()

@app.route('/incidents/')
def incidents():
    types = ['denial', 'intrusion', 'executable']
    incidents = [get_incidents(incident_type) for incident_type in types]
    return jsonify(incidents)

    

if __name__ == "__main__":
# load_dotenv()

# base_url = 'https://incident-api.use1stag.elevatesecurity.io/incidents'
# login = os.getenv("LOGIN")
# password = os.getenv("PASSWORD")
    app.run(port=9000)    