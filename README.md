# Mehanik

A React Native mobile application designed to streamline auto repair shop operations. Built with Node.js/Express backend as part of a Bachelor's thesis project in Computer Science.

## About

Mehanik is a comprehensive mobile solution that digitizes and optimizes auto repair shop workflows, making it easier for mechanics and customers to manage repair services efficiently.

## Features

### For Mechanics

- **Timetable**: View accepted and finished repairs throught time
- **New appointments**: Able to accept, reject or modify user repair requests
- **Customer library**: View past repair, customer and vehicle data that the mechanic input with images

### For Customers

- **Appointments**: View mechanic response on the requested appointments
- **Vehicles**: Input vehicle data that is sent to mechanic upon requesting appointments
- **Mechanics**: Provides a list of available mechanics that the user can select from
- **Mechanic data**: Provides mechanic data that was input. The data includes work hours, general prices, contact, etc.
- **Mechanic timetable**: View open appointments from the selected mechanic

## Tech Stack

### Mobile App (React Native)

- **Framework**: React Native
- **Navigation**: Expo router
- **State Management**: Zustand

### Backend (Node.js/Express)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase
- **Authentication**: JWT

## Installation

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/AnzeFric/Mehanik.git
cd Mehanik
```

2. Navigate to the backend directory:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Create environment file and configure variables:

```bash
cp .env.example .env
```

5. Start the backend server:

```bash
npm start
```

### Mobile App Setup

1. Navigate to the mobile app directory:

```bash
cd mobile
```

2. Install dependencies:

```bash
npm install
```

3. Start Metro bundler:

```bash
npx react-native start
```

4. Run on Android:

```bash
npx expo run:android
```

## Contributing

This project was developed as part of a Bachelor's thesis. While it's primarily an academic project, contributions and suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
