
import {Routes, Route } from 'react-router-dom';
import Main from '../main/Main';
import Statistic from '../statistic/Statistic';
import styled from '@emotion/styled';

const Centers = styled.div`
flex:8.5;
`;

function Center() {
  return (
    <Centers>
      
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/statistic" element={<Statistic />} /> {/* Adjust path */}
        </Routes>
    
    </Centers>
  );
}

export default Center;
