import './App.css';
import Chart from './components/charts';
import Nav from './components/nav';
import { useState, useEffect } from "react";


function App() {
  return (
    <div className="App">
      <Nav main={1}></Nav>
      <div className='charts'>
        <div className='categoryChartCont'>
          <h2 className='h2Chart'>Products sold by category</h2>
          <Chart color={'#BF9B6F'} cat1={'category'} />
        </div>
        <div className='companyChartCont'>
          <h2 className='h2Chart'>Products sold by company</h2>
          <Chart color={'#BF9B6F'} cat1={'company'} />
        </div>
        <div className='productsChartCont'>
          <h2 className='h2Chart'>Number of products sold</h2>
          <Chart className='A' color={'#BF9B6F'} cat1={'items'} />
        </div>
      </div>
    </div>
  );
}

export default App;
