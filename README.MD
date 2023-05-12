How to Run
=============================

### Backend

Using a flask backend
1. Enable your venv using ```virtualenv env``` in the terminal
2. Start your venv using ```cd flaskServer && env/Scripts/activate``` and on linux based machines ```cd flaskServer && env/bin/activate```
3. Install the packages of Flask, Flask-Cors, os, requests, pandas, dotenv using ```pip3 install <packageName>```
4.Run the following command in your terminal ```python app.py``` to start the server

*Windows computer might have issues due to pip not install properly
1. Using the windows search bar, search ```%appdata% and open it
2. Navigate one folder up and go into Local folder
3. Navigate one folder down to Local folder
4. Copy the path to your python
5. Using command prompt ```cd path to python folder```
6. For any packages you would want to use ```python -m pip install <packageName>```

### Frontend
1. Go into your client folder using ```cd client```
2. using npm or yarn, install the packages from your package.json file using ```npm i```
3. run ```npm run dev``` to start the next server

Overall approach
=============================
### Backend
I am one for learning so I decided to do it in flask consider that it is elevate's current backend stack. I used the dotenv package because I did not want to expose the Login/Password and financial lost if it does get exposed. Using python build-in template strings, I tried to make it dry as possible

Using Pandas, I transmuted the data after fetching employee data to change the ip address to match the employee number and return the final product. I choose to do using Pandas instead JS because it was more efficient to run.

I did consider running express, however, I picked up flask super recently and found it was extremly efficient compared to JS. 

### Frontend

I used Next.js because React is recently deprecated and not offered support. I do admit I did not use next.js to it's full capacity with the serverside rendering. I used nextUi as it was a clean approach to tables while displaying the correct data. It was my only option because I would have not wanted to use jinja templating compared to how robust next.js is.

Approvements
=============================
I am still working on some of these because this was a super cool project to work on

1. I am trying to implement a search function, left the search bar there because it made sense in terms of UX
2. Maybe data transmutation to create a graph later down the line 
3. adding a loading state--> nextUI is somewhat new and there was a bug with conditional rendering with Tables
4.  Color coding of how critical the risk is





