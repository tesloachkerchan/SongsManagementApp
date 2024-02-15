import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Filter1Icon from '@mui/icons-material/Filter1';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import styled from '@emotion/styled';

const SidebarContainer = styled.div`
    flex: 1.5;
    height: calc(100vh - 50px);
    overflow-y: scroll;
    position: sticky;
    top: 50px;
`;

const SidebarWrapper = styled.div`
    padding: 20px;
    margin-top: 50px;
`;

const SidebarList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    cursor: pointer;
`;

const SidebarListItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    text-decoration: none;
    a {
    text-decoration: none;
    color: black;
  }
  .sidebarIcon {
    margin-right: 15px;
}
`;

const SidebarListItemText = styled.span`
    font-size: large;
`;

const SearchBar = styled.div`
    width: 100%;
    height: 30px;
    border-radius: 5px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    input{
    background-color: #f2f2f2;
}
`;

const SearchInput = styled.input`
    border: none;
    width: 70%;

    &:focus {
        outline: none;
    }
`;

const FilterDropdown = styled.select`
    width: 100%;
`;

interface SidebarProps {
  handleFilter: (filterType: string) => void;
}

function Sidebar({ handleFilter }: SidebarProps) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handleClickFilter = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleFilterOption = (option: string) => {
    handleFilter(option);
    setShowFilterOptions(false);
  };

  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SearchBar>
          <SearchIcon className='searchIcon'/>
          <SearchInput type='text' placeholder='search' className="searchInput" />
        </SearchBar>
        <SidebarList>
          <SidebarListItem>
            <Link to='/'>
              <HomeIcon className="sidebarIcon" />
              <SidebarListItemText>Home</SidebarListItemText>
            </Link>
          </SidebarListItem>
          <SidebarListItem>
            <Link to='/statistic'>
              <AnalyticsIcon className="sidebarIcon" />
              <SidebarListItemText>Statistics</SidebarListItemText>
            </Link>
          </SidebarListItem>
          <SidebarListItem onClick={handleClickFilter}>
            <Filter1Icon className="sidebarIcon" />
            <SidebarListItemText>Filter</SidebarListItemText>
          </SidebarListItem>
          {showFilterOptions && (
            <SidebarListItem>
              <FilterDropdown
                className="filterDropdown"
                onChange={(e) => handleFilterOption(e.target.value)}
              >
                <option value="">Select Filter</option>
                <option value="artist">Filter by Artist</option>
                <option value="album">Filter by Album</option>
              </FilterDropdown>
            </SidebarListItem>
          )}
        </SidebarList>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
