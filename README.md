# Income Statement Viewer


This is a responsive web application for viewing, filtering, and sorting Apple Inc.'s (AAPL) income statement data. Built with React and styled using TailwindCSS, the app provides features like dynamic filtering, sorting, and a clean, mobile-friendly interface.


---


## Features


1. Display income statement data in a table format.
2. Filter data based on:
  - Year range.
  - Revenue range (in billions).
  - Net income range (in billions).
3. Sort data by:
  - Date.
  - Revenue.
  - Net income.
4. Fully responsive design that works seamlessly on both desktop and mobile devices.


---


## Live Demo


You can access the live version of the app here: [Live Demo](https://income-statement.vercel.app)


---


## How to Run the Project Locally


Follow these steps to set up and run the project locally on your computer:


### **Step 1: Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later).
- npm or yarn (comes with Node.js installation).


---


### **Step 2: Clone the Repository**
1. Open your terminal and run the following command:
  ```bash
  git clone https://github.com/<your-username>/income-statement.git
  ```
2. Navigate to the project directory:
  ```bash
  cd income-statement
  ```


---


### **Step 3: Install Dependencies**
1. Install the required npm packages by running:
  ```bash
  npm install
  ```


---


### **Step 4: Start the Development Server**
1. Start the React development server with the following command:
  ```bash
  npm start
  ```
2. Open your browser and navigate to:
  ```
  http://localhost:3000
  ```


---


### **Step 5: Build for Production**
To create an optimized production build of the app:
1. Run the following command:
  ```bash
  npm run build
  ```
2. The optimized build files will be available in the `build/` directory.


---


### **Step 6: Deploy the Project**
You can deploy this project to any hosting platform. Below are instructions for the most popular ones:


#### **Option 1: Vercel**
1. Install the Vercel CLI globally:
  ```bash
  npm install -g vercel
  ```
2. Deploy your project:
  ```bash
  vercel
  ```
3. Follow the prompts and get your deployment URL.


#### **Option 2: Netlify**
1. Build the project:
  ```bash
  npm run build
  ```
2. Drag and drop the `build/` folder to the [Netlify](https://www.netlify.com/) deployment area.


#### **Option 3: GitHub Pages**
1. Install GitHub Pages package:
  ```bash
  npm install gh-pages --save-dev
  ```
2. Add the following `homepage` key to your `package.json`:
  ```json
  "homepage": "https://<your-username>.github.io/<repository-name>"
  ```
3. Add the deployment scripts to the `scripts` section of `package.json`:
  ```json
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
  ```
4. Deploy the app:
  ```bash
  npm run deploy
  ```


---


## Project Folder Structure
The project is organized as follows:


```
src/
├── components/
│   ├── Filters.tsx          # Handles filtering logic and UI
│   ├── Table.tsx            # Renders the table with data and sorting
├── App.tsx                  # Main component
├── App.css                  # Custom styling
├── index.tsx                # Entry point of the app
├── index.css                # TailwindCSS base styling
```


---


## Technologies Used


- **React**: Frontend framework for building user interfaces.
- **TypeScript**: Ensures type safety and better developer experience.
- **TailwindCSS**: Utility-first CSS framework for fast and responsive styling.
- **Vercel/Netlify/GitHub Pages**: Used for deployment.


---


## Contact


If you have any questions or need further assistance, please reach out at:
- **Email**: [your-email@example.com]
- **GitHub**: [https://github.com/your-username](https://github.com/your-username)
