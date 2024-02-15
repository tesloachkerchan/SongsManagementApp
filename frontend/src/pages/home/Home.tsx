import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Center from '../../components/center/Center';
import styled from '@emotion/styled';

const HomeContainer = styled.div`
    display: flex;
    width: 100%;`

function Home() {
  const handleFilter = (filterType: string) => {
    // Implement your filter logic here
    console.log(`Filtering by ${filterType}`);
  };

  return (
    <div>
      <>
        <Topbar />
        <HomeContainer>
          <Sidebar handleFilter={handleFilter} />
          <Center />
        </HomeContainer>
      </>
    </div>
  );
}

export default Home;