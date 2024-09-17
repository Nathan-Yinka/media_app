# Media Platform Web Application

## Overview

This web application is a media platform that enables content creators and administrators to manage and interact with blog content. The application implements secure token-based authentication, role-based access control (RBAC), and features for content creation and approval workflows.

### Key Features:
- **Secure API Token Authentication**: Django Rest Framework’s (DRF) token-based authentication is used to ensure secure access.
- **Role-Based Access Control (RBAC)**: Two distinct roles - Content Creator and Administrator, ensuring users can only access features relevant to their roles.
- **Content Management**: Content creators can create, edit, and manage blog posts, while administrators can review, approve, or reject posts.
- **Dynamic Frontend**: React.js is used to provide a modern, responsive user interface that dynamically interacts with the Django backend API.

## Live URLs

- **Backend**: [https://media-app-jmcm.onrender.com](https://media-app-jmcm.onrender.com)
- **Frontend**: [https://mediomapp.vercel.app/](https://mediomapp.vercel.app/)
- **API Documentation (Swagger)**: [https://media-app-jmcm.onrender.com](https://media-app-jmcm.onrender.com)

## Setup Instructions

### Prerequisites:
- **Python** (v3.8+)
- **Node.js** (v14+)
- **MySQL** (or your preferred RDBMS)
- **Django** (v3.2+)
- **React.js** (v18+)
- **Visual Studio Code** (or any code editor)
- **Postman** (for API testing)
- **Docker** (v20.10+)
- **Docker Compose** (v1.29+)
  
### Backend (Django) Setup:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nathan-Yinka/media_app.git
   cd media_app/backend
   
   ```

2. **Create a virtual environment:**
    ```bash
    python3 -m venv env
   python3 -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   pip install -r requirements.txt
    ```

3. **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure environment variables: Create a .env file in the backend directory:**
    ```
    CLOUD_NAME=dtostqvav
    API_KEY=342665571274246
    API_SECRET=VRS0ZRdeRebc9X1MNwQsNz475D8

    PGHOST='ep-old-union-a5by6rze.us-east-2.aws.neon.tech'
    PGDATABASE='mydb'
    PGUSER='mydb_owner'
    PGPASSWORD='jxKBk98pgmXa'
    ```

5. **Run migrations:**
    ```
    python manage.py migrate
    ```

6. **Create a superuser (for admin access):**
    ```
    python manage.py createsuperuser
    ```

7. **Start the Django development server:**
    ```
    Start the Django development server:
    ```

### Frontend (React.js) Setup:
1. **Navigate to the frontend directory:**
    ```bash
    cd media_app/frontend
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Create a .env file for the frontend:**
    ```
    VITE_PUBLIC_BASEURL=http://localhost:8000
    ```

4. **Start the React development server:**
    ```
    npm run dev
    ```

### Running the Application:

- Backend: The Django API will be running at http://localhost:8000/
- Frontend: The React app will be running at http://localhost:5173/

You can now test the login, role-based access, and content management features.


### Database Configuration:

1. Create a MySQL database and update the DATABASE_URL in your Django .env file.
2. Run migrations again to set up the database schema

    ```
    python manage.py migrate
    ```

### API Testing:
- The API endpoints are documented using Swagger, accessible at  http://localhost:8000
- You can use Postman or curl to test the API endpoints for login, blog management, and role-specific functionalities.
- The API endpoints are documented using Django Rest Framework’s browsable API.


### Design Choices

1. **Authentication & Security:**
- Django Rest Framework (DRF): Token-based authentication ensures that all API endpoints are secure. DRF provides robust token management out-of-the-box.
- Password Management: Django’s built-in password hashing and security mechanisms ensure user credentials are securely stored and managed.

2.  ***Role-Based Access Control (RBAC):***
- DRF’s permission classes are used to enforce role-based access control. Only administrators can access management features, and content creators have access only to their own posts.

3. **Dynamic Data Handling:**
- React.js with Axios is used to interact with the Django API. This allows for dynamic content loading and updating without refreshing the page.
- State Management: React’s Context API is used for managing global state (e.g., user authentication) across the application.

4. **Database Design:**
- Postgresql: The database schema is designed to handle relationships between users, roles, blog posts, and categories. Foreign keys are used to ensure data integrity.

### Conclusion:
- This project leverages Django for secure and efficient backend API management and React.js for a modern, dynamic frontend. The system is designed with extensibility in mind, providing a strong foundation for future features



### By Oludare Nathaniel Adeyinka
