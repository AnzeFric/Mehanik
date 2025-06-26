# Mehanik - Backend

## API endpoints

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User register

#### User

- `GET /api/users/` - Return user
- `GET /api/users/mechanics` - Returns all mechanics
- `PATCH /api/users/` - Patch user or mechanic
- `DELETE /api/users/` - Disable user account

#### Customer

- `GET /api/customers/` - Return all customers from mechanic
- `POST /api/customers/` - Save customer
- `PATCH /api/customers/` - Patch customer
- `DELETE /api/customers/` - Delete customer

#### Appointment

- `GET /api/appointments/` - Return all user appointments
- `POST /api/appointments/` - Save new appointment
- `POST /api/appointments/get` - Return all mechanic appointments
- `PATCH /api/appointments/` - Patch appointment: status, dates, user message or mechanic response
- `DELETE /api/appointments/` - Delete appointment

#### Notification

- `POST /api/notifications/` - Save expo push token

#### Repair

- `POST /api/repairs/` - Save new repair
- `POST /api/repairs/get` - Get repair by vehicle uuid
- `PATCH /api/repairs/` - Update repair
- `DELETE /api/repairs/` - Delete repair

#### Vehicle

- `GET /api/vehicles/` - Get user vehicles
- `POST /api/vehicles/` - Save new vehicle from user or customer from mechanic
- `PATCH /api/vehicles/` - Update vehicle
- `DELETE /api/vehicles/` - Delete vehicle
