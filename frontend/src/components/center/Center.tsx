import React from 'react';
import './center.css';
import {Routes, Route } from 'react-router-dom';
import Main from '../main/Main';
import Statistic from '../statistic/Statistic';

function Center() {
  return (
    <div className='center'>
      
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/statistic" element={<Statistic />} /> {/* Adjust path */}
        </Routes>
    
    </div>
  );
}

export default Center;
