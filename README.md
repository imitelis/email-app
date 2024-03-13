# Email App

## Done

### (Required stack):

- Your own read-write PostgresSQL database deployed in AWS RDS. This is where you will store all state specific to your application.
- A graphical web frontend written in Typescript.
- Use either Vue or a React framework.
- A backend written in Python using either Flask or Django.
- A README.md in your repository

### (Required functions):

- Basic Email Sending and Receiving
- User Registration and Login System
- Basic Email Search Functionality

## Stack

- **FrontEnd:** Vite + React + TypeScript, eslint, MaterialUI
- **BackEnd:** Flask, Flask-RESTX, OpenAPI, SQLAlchemy, PyJWT, bcrypt
- **Database:** PostgreSQL, Amazon RDS
- **Quality Assurance:** BackEnd: PyTest, HTTPX & FrontEnd: Jest, Cypress
- **CI/CD:** Git Actions, Amazon CloudWatch
- **Deployment:** Docker, Amazon EC2, Fly.io

## Coder manual

### FrontEnd:

- In order to start FrontEnd, go to `frontend` folder and use `npm install` for dependencies
- Then use `npm run dev` to start the dev app in default port `localhost:9000`
- For production use `npm run build` and then `npm run preview` for production app

### BackEnd:

- In order to start BackEnd, go to `backend` folder and use `python3 -m venv venv` for venv
- Then use `source venv/bin/activate` to start using the venv and its dependencies
- Run `pip install -r reqs.txt` to install the dependencies from the `reqs.txt` file
- Finally use `flask run` to start the dev app in default port `0.0.0.0:8000`
- For production consider something steadier like `gunicorn -w 4 -b 0.0.0.0:8000 main:app`

### Database:

- BackEnd won't start if there is no PostgreSQL DB connected at the `DATABASE_URI`, so check that first
- For simplicity, we consider an empty `emaildb` now, we can eventually think of dockerization
- You might use pgAdmin 4 and after setting your username and password, create new db there

### Testing BackEnd:

- Start similar setup as backend located in the same folder `backend`
- Run `export PYTHONPATH=$(pwd)` to set the folder path in the tests files
- For the unit tests you can run `python3 tests/unit_user.py` and for each unittest accordingly (even without the backend running)
- For the functional tests you can run `pytest -s tests/test_api.py` and for each pytest accordingly (even without the backend running)
- Note that all the pytest testing files must start with 'test' as a preffix

### Testing FrontEnd:

- Start similar setup as frontend located in the same folder `frontend`
- For the unit tests you can start testing with `npm run test` (even without the frontend running)
- For the E2E tests you must start the frontend first at `localhost:9000` (by default) and then `npm run e2e:run`
- You can start both frontend and E2E tests by using `npm run dev & npm run e2e:run`
- If you want to open Cypress and build your own E2E tests, you can use `npm run cypress:open`

### Pipelines:

- You should check that the pipelines in your own branchs or own forks are working correctly
- Just do a simple `git push origin main` to trigger the pipelines in the origin repository
- If something goes wrong, you can re-run the jobs once more in the `Actions` part of the GitHub repository