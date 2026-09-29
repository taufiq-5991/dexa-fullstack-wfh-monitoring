# API Endpoint Structure

## Auth
- `POST /auth/login` - Login (No token required, obviously)
- `POST /auth/verifyToken` - Verify Token

## Roles
- `GET /roles` - Get list of roles
- `GET /roles/:id` - Get role detail

## Attendances
- `POST /attendances/clock-in` - Clock in attendance
- `POST /attendances/clock-out` - Clock out attendance
- `GET /attendances` - Get list of attendances (Admin HRD only)
- `GET /attendances/my-attendances` - Get user's own attendances

## Admin Monitoring
- `POST /admin-monitoring/hash-password` - Hash password from string (Admin HRD only)
- `POST /admin-monitoring` - Create new employee and user data (Admin HRD only)
- `GET /admin-monitoring` - Get list of employees with user ID & role (Admin HRD only)
- `GET /admin-monitoring/:id` - Get employee detail with user ID, role, and attendances (Admin HRD only)
- `PUT /admin-monitoring/:id` - Update employee and user data by employee ID (Admin HRD only)
- `DELETE /admin-monitoring/:id` - Delete employee, user data, and attendances (Admin HRD only)