import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import Center from '../../components/center/Center';

function Home() {
  const handleFilter = (filterType: string) => {
    // Implement your filter logic here
    console.log(`Filtering by ${filterType}`);
  };

  return (
    <div>
      <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar handleFilter={handleFilter} />
          <Center />
        </div>
      </>
    </div>
  );
}

export default Home;