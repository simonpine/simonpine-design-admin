import './App.css';
import Chart from './components/charts';
import { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function App() {
  return (
    <div className="App">
        <Chart color={'#82ca9d'} cat1={'category'} />
        <Chart color={'#82ca9d'} cat1={'items'} />
    </div>
  );
}

export default App;
