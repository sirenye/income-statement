//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=jOz8KSdiXywEq5SMlJNREg4BXP7fuA1H'
      );
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello, Income Statement Viewer!</h1>
    </div>
  );
}

export default App;