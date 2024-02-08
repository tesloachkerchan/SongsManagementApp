import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Main from '../../components/main/Main';
import './home.css';

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
          <Main />
        </div>
      </>
    </div>
  );
}

export default Home;