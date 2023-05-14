import './App.css';
import Chart from './components/charts';
import { useState, useEffect } from "react";


function App() {
  return (
    <div className="App">
        <Chart color={'#BF9B6F'} cat1={'category'} />
        <Chart color={'#BF9B6F'} cat1={'items'} />
        <Chart color={'#BF9B6F'} cat1={'company'} />
    </div>
  );
}

export default App;
