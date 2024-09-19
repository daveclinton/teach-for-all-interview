# Teach for All Interview with React and React Native 

This project contains a monorepo setup using NX, featuring a **React** app for web and a **React Native Expo** app for mobile. Both apps share logic and validation using **Zod** and provide a dynamic, multi-step form experience.

## Table of Contents
- [Teach for All Interview with React and React Native](#teach-for-all-interview-with-react-and-react-native)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [React Native Expo App (Mobile)](#react-native-expo-app-mobile)
    - [React App (Web)](#react-app-web)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)

## Features

### React Native Expo App (Mobile)

- **Custom Splash Screen**: A personalized splash screen is shown when the app starts.
- **Multi-Step Form**:
  - **Step 1**: Prompt the user with an initial action.
  - **Step 2**: Fill in details.
  - **Step 3**: An option is provided to either submit or fill the form again.

### React App (Web)
<img width="1240" alt="Screenshot 2024-09-19 at 9 40 04 PM" src="https://github.com/user-attachments/assets/60d86053-4486-4ba0-8e39-c729921c493e">
- **Fully Responsive**: The web app is fully responsive and styled using **Tailwind CSS**.
- **Multi-Step Form**:
  - **Step 1**: Prompt the user to start filling in details.
  - **Step 2**: A dynamic form allows the user to add or remove fields as needed.
  - **Step 3**: A success page that completes the form submission.

Both apps share validation logic, ensuring consistent form validation between mobile and web platforms.

## Project Structure

- `/apps/web`: The React web app (served via `npx nx serve web`).
- `/apps/mobile-app`: The React Native Expo app (run via `npx nx run mobile-app:start --reset-cache`).
- `/libs`: Shared libraries including validation logic with **Zod**.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** or **Yarn** or **Bun**
- **NX** (`npm install -g nx` or `yarn global add nx`)
- **Expo CLI** (`npm install -g expo-cli`)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
