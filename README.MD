# Incident Report 

## App Images and Architecture

**homepage**
![image](https://github.com/SamLamElectrician/IncidentsReport/assets/99058689/923c0e00-f349-4319-83bb-0c3e13cfc6ba)
**Data presented in a table**
![image](https://github.com/SamLamElectrician/IncidentsReport/assets/99058689/1500dca6-166f-4263-89ac-47fabc51741f)
**App Architecture**
![image](https://github.com/SamLamElectrician/IncidentsReport/assets/99058689/fbaef011-6f1a-4e45-a38b-436b86db0147)
**Additional wireframing to visualize data**
![image](https://github.com/SamLamElectrician/IncidentsReport/assets/99058689/9daea58f-9156-4d13-8b44-1be0795d958e)
**how my final data was presented**
![image](https://github.com/SamLamElectrician/IncidentsReport/assets/99058689/e09b7256-90fd-44d0-8cdc-39508a133e22)





## How to Run

### Backend Instructions

Using a flask backend<br />
 
1. Enable your virtual environment (venv) by running `virtualenv env` in the terminal.<br /> 
2. Install Packages using `pip install -r requirements.txt`
3. Activate your virtual environment by running `cd flaskServer && env/Scripts/activate` on Windows or `cd flaskServer && env/bin/activate` on Linux-based machines.<br />
4. Add login credentials (username and password) to an environment (ENV) file.<br /> 
5. Run the following command in your terminal to start the server: `python app.py`<br />

**Note for Windows Users: If you encounter issues with pip installation, follow these steps:**

1. Use the Windows search bar to search for %appdata% and open it.
2. Navigate one folder up and go into the Local folder.
3. Navigate one folder down to the Local folder again.
4. Copy the path to your Python installation.
5. Open the command prompt and navigate to the Python folder using the cd command.
6. To install any required packages, use the command `python -m pip install <packageName>`

**Note: For either windows or linux, you would need a .env file with your login and password

### Frontend Instructions

1. Navigate to the client folder using the command `cd client`
2. Install the required packages from the package.json file using npm or yarn. `Run npm i`
3. Start the frontend server by running `npm run dev`

# Overall approach

### Backend

For the backend, I chose Flask because it is part of Elevate's current backend stack. To protect sensitive login credentials and prevent financial loss if they get exposed, I used the dotenv package. Additionally, I utilized Python's built-in template strings to ensure a DRY (Don't Repeat Yourself) approach.

To manipulate the data fetched from the employee data source, I used the Pandas library to replace the IP address with the employee number and return the final result. I chose Pandas over Dictionaries because it provided more efficient execution. I used pandas to manipulate the data by renaming certain columns, normalizing the data, mapping employee ID to employee number, and creating new columns. It help standardize the data

While Express was a consideration, I found Flask to be extremely efficient and recently picked it up, making it a suitable choice for this project.

### Frontend

I opted for Next.js for the frontend because React is recently deprecated and no longer supported. Although I didn't fully utilize Next.js's server-side rendering capabilities, I used Next UI as a clean and efficient approach to displaying tables with the correct data. It was my preferred option over using Jinja templating due to the robustness of Next.js. 

# Improvements

I am actively working on improving the project with the following enhancements:

-Implementing a search function to enhance user experience.<br />
-Exploring the possibility of data transmutation for graph creation in the future.<br /> -~~Adding a loading state for better user feedback. There was a bug with conditional rendering in Next UI, which I'm in the process of resolving.~~<br /> -~~Implementing color coding to indicate the criticality of risks.~~<br />
-~~Further improving my knowledge of Pandas to avoid using lambda functions, as they have an O(N^2) time complexity.~~ <br />
-fully utilizing the sever side rendering with next<br />
-docker to deploy and standardize how a client would see it without having the packages<br />
-~~sorting the data in the backend rather than frontend~~<br />
https://docs.google.com/document/d/1UVnXQBwCiLAOHpRsoFrScJzZupio9fSfE9ZH06GFygE/edit?usp=sharing
