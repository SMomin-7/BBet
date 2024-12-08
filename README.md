```markdown
# BBet: Basketball Betting Application

Welcome to BBet, a web-based application for placing bets on basketball games, viewing player and team statistics, and exploring leaderboards. Follow these instructions to set up and run the project for grading purposes.

---

## Prerequisites

Ensure you have the following installed:
1. [Node.js](https://nodejs.org/) (v16 or higher) and npm
2. [Python](https://www.python.org/downloads/) (v3.9 or higher)
3. [Django](https://www.djangoproject.com/download/) (latest stable version)
4. [MySQL Server](https://dev.mysql.com/downloads/mysql/)
5. [Postman](https://www.postman.com/downloads/) (optional but recommended for API testing)
6. [Git](https://git-scm.com/) (optional for cloning the repository)

---

## Step 1: Clone the Repository

Clone the repository to your local machine:
```bash
git clone https://github.com/SMomin-7/BBet.git
cd BBet
```

---

## Step 2: Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # For Mac/Linux
   venv\Scripts\activate      # For Windows
   ```

3. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure the database settings in `backend/settings.py`:
   Update the `DATABASES` section with your MySQL credentials:
   ```python
   DATABASES = {
       'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'bettingapp',  
        'USER': 'root',        
        'PASSWORD': 'Shaims786@',  
        'HOST': 'localhost',   
        'PORT': '3306',        
    }
   }
   ```

5. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Populate the database with sample data:
   ```bash
   python manage.py loaddata sample_data.json
   ```

7. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

---

## Step 3: Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend should now be running on `http://localhost:3000`.

---

## Step 4: Connect Frontend and Backend

1. Open the `frontend/src/config.js` file.
2. Ensure the backend API URL is set correctly:
   ```javascript
   export const API_BASE_URL = "http://127.0.0.1:8000/api/";
   ```

---

## Step 5: Testing the Application

1. Open your browser and navigate to:
   - Frontend: `http://localhost:3000`
   - Backend API (optional): `http://127.0.0.1:8000/api/`

2. Features to test:
   - User signup and login
   - Placing bets on matches
   - Viewing match details, player stats, and leaderboards
   - Automated updates for match results, odds, and payouts

---

## Grading Notes

- The project includes sample data (`sample_data.json`) for users, matches, and stats.
- **Automated Backend Updates:** No admin panel is required; updates are handled programmatically.
- If you encounter issues:
  - Ensure the backend server is running.
  - Verify the frontend and backend are connected correctly.
  - Confirm the MySQL database is configured properly.

---

## Troubleshooting

1. **Database Connection Issues:**
   - Verify that the MySQL server is running.
   - Check credentials in `backend/settings.py`.

2. **Frontend Issues:**
   - Clear npm cache and reinstall dependencies:
     ```bash
     npm cache clean --force
     npm install
     ```

3. **Backend Issues:**
   - Ensure all Python dependencies are installed.

---

## Contact

If you encounter any issues or need further assistance, please create an issue in the repository or reach out to me directly.

Enjoy using **BBet**
