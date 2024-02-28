# Email App

## Milestones:

### 1. 21 Feb 9:00 PM, Roles & Responsibilities

- Recorded video (Angel)
- Text (David)

### 2. 25 Feb 9:00 PM, End-to-End Prototype

- Record video of app

### 3. 27 Feb 9:00 PM, Provisional Design Plan

- Design plan (document of stack and app)

### 4. 1 Mar 9:00 PM, Final Submission

- Functioning app deployed
- Access to codebase (git repo to Karen)
- Final design plan

## To Dos

### To Do (the stack):

- Your own read-write PostgresSQL database deployed in AWS RDS. This is where you will store all state specific to your application.
- A graphical web frontend written in Typescript.
- Use either Vue or a React framework.
- A backend written in Python using either Flask or Django.
- A README.md in your repository

### To Do (the functions):

- Basic Email Sending and Receiving
- User Registration and Login System
- Basic Email Search Functionality

## Stack

- **FrontEnd:** Vite + React + TypeScript, MaterialUI
- **Backend:** Flask, Flask-RESTX, Swagger / OpenAPI, SQLAlchemy, PyJWT, bcrypt
- **Database:** PostgreSQL, Amazon RDS
- **Quality Assurance:** (for BackEnd: PyTest, HTTPX), (for FrontEnd: Jest, Cypress)
- **CI/CD:** Git Actions, Amazon Elastic Beanstalk, Amazon CloudWatch
- **Deployment:** Docker, Amazon EC2

## Homework

### To Discuss:

- Docker compose or separated components (frontend and backend/db) ?

### David:

- Set ORM of user, email and email folders V
- Start `backend` folder and configure project V
- Check Swagger/OpenAPI on Flask V
- Check injection dependency on Flask V
- Build login and secured emails API on Flask V
- Set middlewares, secrets and database V
- Check Dockerization of Flask app V
- Check WSGI and workers on Flask (gunicorn) V
- Check SMTP server on Flask V
- Build unit testing on Flask V

### Marlon:

- Check Elastic Beanstalk
- Check RDS for PostgreSQL V
- Build API for users on Flask V
- Work deploying backend and db on AWS
- Review basics of CI/CD and backend pipeline (AWS)
- Check functional tests with Flask
- Build functional testing on Flask

### Carlos:

- Review basics of Redux and Session management V
- Review basics of CI/CD and frontend pipeline (fly/heroku) V
- Start `frontend` folder and configure vite and TS V
- Build the `login`, `signup` and `email` pages V
- Build the `NavBar` component V
- Build the `user context` in React V

### Angel:

- Review basics of Bootstrap/TailwindCSS
- Review basics of Auth and useHooks
- Review basics of Cypress and Jest
- Build the `notfound`, `inbox` and `folder` pages
- Build the `Footer` component
- Build some E2E tests in Cypress

## Coder manual

### FrontEnd:

- In order to start frontend, go to "frontend" folder and use `npm install` for dependencies
- Then use `npm run dev` to start the dev app in default port `localhost:9000`
- For production use `npm run build` and then `npm run preview` for production app

### BackEnd:

- In order to start backend, go to "backend" folder and use `python3 -m venv venv` for venv
- Then use `source venv/bin/activate` to start using the venv and its dependencies
- Run `pip install -r reqs.txt` to install the dependencies from the `reqs.txt` file
- Finally use `flask run` to start the dev app in default port `0.0.0.0:8000`
- For production consider something steadier like `gunicorn -w 4 -b 0.0.0.0:8000 main:app`

### Database:

- BackEnd won't start if there is no PostgreSQL DB connected at `DATABASE_URI` port, so check that
- For simplicity, we consider an empty `emaildb` now, we can eventually think of dockerization
- You might use pgAdmin 4 and after setting your username and password, create new db there

### Testing BackEnd:

- Start similar setup as backend located in the same folder "backend"
- Run `export PYTHONPATH=$(pwd)` to set the modules in the tests files
- Then run `python3 tests/unit_user.py` and then `python3 tests/unit_email.py` for the unit tests
