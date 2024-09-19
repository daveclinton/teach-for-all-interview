# Teach for All Interview with React and React Native 

This project contains a **monorepo** setup using **NX**, which includes two applications: a **React** app for the web and a **React Native Expo** app for mobile. Both apps share logic and validation using **Zod**, and they feature dynamic, multi-step forms that create a cohesive user experience across both platforms.

## Features

### React Native Expo App (Mobile)
https://github.com/user-attachments/assets/febd02dd-0bb3-4c2a-8dcc-26c3ae27b9e0
- **Custom Splash Screen**: A personalized splash screen that is displayed when the app starts.
- **Multi-Step Form**:
  - **Step 1**: The user is prompted with an initial action or question.
  - **Step 2**: The user fills in their details in the form.
  - **Step 3**: After completing the form, the user has an option to either submit or start over and fill the form again.

### React App (Web)
https://github.com/user-attachments/assets/f141408c-7da9-491c-9889-488000997b2e
- **Fully Responsive**: The web app is fully responsive, using **Tailwind CSS** to ensure it works well across devices of different sizes.
- **Multi-Step Form**:
  - **Step 1**: The user is prompted to start filling in details.
  - **Step 2**: A dynamic form allows the user to add or remove fields as needed.
  - **Step 3**: A success page confirms form submission.

Both apps share the same validation logic using **Zod** for consistency between mobile and web platforms.

## Project Structure

The project follows a monorepo structure using **NX** to manage multiple applications in a single repository:

- **/apps/web**: Contains the React web app.
- **/apps/mobile-app**: Contains the React Native Expo app.
- **/libs**: Contains shared logic, including validation logic using **Zod**.

## Prerequisites

Before you can run the project, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
- A package manager: **npm**, **Yarn**, or **Bun**
- **NX CLI**: You can install this globally using:
  ```bash
  npm install -g nx
