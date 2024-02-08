import React, { useState } from 'react';
import './sidebar.css';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Filter1Icon from '@mui/icons-material/Filter1';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

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
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <AnalyticsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Statistics</span>
          </li>
          <li className="sidebarListItem">
            <LibraryMusicIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Add Song</span>
          </li>
          <li className="sidebarListItem" onClick={handleClickFilter}>
            <Filter1Icon className="sidebarIcon" />
            <span className="sidebarListItemText">Filter</span>
          </li>
          {showFilterOptions && (
            <li className="sidebarListItem">
              <select
                className="filterDropdown"
                onChange={(e) => handleFilterOption(e.target.value)}
              >
                <option value="">Select Filter</option>
                <option value="artist">Filter by Artist</option>
                <option value="album">Filter by Album</option>
              </select>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;