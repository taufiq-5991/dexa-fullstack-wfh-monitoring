WFH Monitoring System

## Description
This project is a WFH Monitoring System running on React frontend and NestJS Microservices backend that connects to a MySQL database hosted on Aiven cloud.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Install back-end by navigating to the server directory:
   ```
   cd server
   ```
3. Install back-end dependencies in the server directory:
   ```
   npm install
   ```
4. Install front-end by navigating back from the server to the client directory:
   ```
   cd ../client
   ```
5. Install front-end dependencies in the client directory:
   ```
   npm install
   ```

## Configuration
- Ensure that you have a MySQL database running
- Update the configuration settings in the `.env` files in both front-end and back-end as needed.
- There are `.env.example` files as configuration variable references

## Running the back-end
To start the back-end in development mode, run:
1. Ensure that you are in server directory:
   ```
   cd server
   ```
2. Run the app in development mode:
   ```
   npm run start:dev
   ```

## Running the front-end
To start the front-end in development mode, run:
1. Ensure that you are in client directory:
   ```
   cd client
   ```
2. Run the app in development mode:
   ```
   npm start
   ```

## API Endpoint Structure

### Auth
- `POST /auth/login` - Login (No token required, obviously)
- `POST /auth/verifyToken` - Verify Token

### Roles
- `GET /roles` - Get list of roles
- `GET /roles/:id` - Get role detail

### Attendances
- `POST /attendances/clock-in` - Clock in attendance
- `POST /attendances/clock-out` - Clock out attendance
- `GET /attendances` - Get list of attendances (Admin HRD only)
- `GET /attendances/my-attendances` - Get user's own attendances

### Admin Monitoring
- `POST /admin-monitoring/hash-password` - Hash password from string (Admin HRD only)
- `POST /admin-monitoring` - Create new employee and user data (Admin HRD only)
- `GET /admin-monitoring` - Get list of employees with user ID & role (Admin HRD only)
- `GET /admin-monitoring/:id` - Get employee detail with user ID, role, and attendances (Admin HRD only)
- `PUT /admin-monitoring/:id` - Update employee and user data by employee ID (Admin HRD only)
- `DELETE /admin-monitoring/:id` - Delete employee, user data, and attendances (Admin HRD only)

## License
This project is licensed under the MIT License.