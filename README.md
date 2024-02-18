# Birth Query Network


## Milestones:

### 1. 21 Feb 9:00 PM COL, Roles & Responsibilities
  *  Recorded video (Angel)
  *  Text (David)

### 2. 25 Feb 9:00 PM COL, End-to-End Prototype
  *  Record video of app

### 3. 27 Feb 9:00 PM COL, Provisional Design Plan
  *  Design plan (document of stack and app)

### 4. 1 Mar 9:00 PM COL, Final Submission
  *  Functioning app deployed
  *  Access to codebase (git repo)
  *  Final design plan


## To Dos

### To Do (the stack):
  *  Your own read-write PostgresSQL database deployed in AWS RDS. This is where you will store all state specific to your application. 
  *  A graphical web frontend written in Typescript. 
    *  Use either Vue or a React framework. 
  *  A backend written in Python using either Flask or Django.
  *  A README.md in your repository


### To Do (functions):
  *  Basic Email Sending and Receiving
  *  User Registration and Login System
  *  Basic Email Search Functionality


## Homework

### To Discuss:
  *  Docker compose or separated components (frontend and backend/db) ?
  *  React Query or Redux
  *  SSR or nay ?

### On check:

### David:
  *  Set ORM of user, email and email folders
  *  Start `backend` folder and configure project
  *  Check Swagger/OpenAPI on Flask
  *  Check injection dependency on Flask
  *  Build login and secured emails API on Flask
  *  Set middlewares, secrets and database

### Marlon:
  *  Check Elastic Beanstalk
  *  Check RDS for PostgreSQL
  *  Check WSGI and workers on Flask
  *  Build API for users on Flask
  *  Work deploying backend and db on AWS
  *  Review basics of CI/CD and backend pipeline (AWS)

### Carlos:
  *  Review basics of Redux and Session management
  *  Review basics of CI/CD and frontend pipeline (fly/heroku)
  *  Start `frontend` folder and configure vite and TS
  *  Set the `login`, `signup` and `email` pages
  *  Set the `NavBar` component

### Angel:
  *  Review basics of Bootstrap/TailwindCSS
  *  Review basics of Auth and useHooks
  *  Review basics of Cypress and Jest
  *  Set the `notfound`, `inbox` and `folder` pages
  *  Set the `Footer` component


## Coder manual

### FrontEnd:
  *  In order to start frontend, go to "frontend" folder and use `npm install` for dependencies
  *  Then use `npm run dev` to start the dev app in default port `localhost:9000`


### BackEnd:
  *  In order to start backend, go to "backend" folder and use `python3 -m venv venv` for venv
  *  Then use `source venv/bin/activate` to start using the venv and its dependencies
  *  Run `pip install -r reqs.txt` to install the dependencies from the `reqs.txt` file
  *  Finally use `python3 main.py` to start the dev app in default port `localhost:8000`
