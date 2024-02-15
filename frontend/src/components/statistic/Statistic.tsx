import React, { useEffect, useState } from 'react';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import axios from 'axios';
import styled from '@emotion/styled';

// Styled components for the styles
const StatisticsContainer = styled.div`
    border-radius: 5px;
    margin-top: 40px;
    margin: 15px;
`;

const StatisticsTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 5px;
    text-align: center;
    font-size: xx-large;
`;

const Hr = styled.hr`
    color: #f2f2f2;
    width: 100%;
`;

const BoxInfo = styled.div`
    display: flex;

    li {
        margin: 20px;
        display: flex;
        list-style: none;
        flex: 2.5;
        background-color: #f2f2f2;
        text-align: center;
        padding: 25px;
        border-radius: 10%;
        cursor: pointer;

        &:hover {
            -webkit-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
        }
        .icon{
    margin-right: 20px;
    height: 40px;
    width: 40px;
}
    }
`;

const Icon = styled.span`
    margin-right: 20px;
    height: 40px;
    width: 40px;
`;

const TableToggle = styled.div`
    text-align: center;
    margin-top: 30px;

    button {
        margin: 5px;
        padding: 7px;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            -webkit-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
        }
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 95%;
    margin: 30px;

    th, td {
        text-align: center;
        
    }
    td{
      padding: 9px;
      
    }
    tr{
      &:hover{
        -webkit-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
      }
    }

    th {
        padding: 12px;
        cursor: pointer;
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
`;
const Pagination = styled.div`
  margin-top: 16px;
  text-align: center;

  button {
    background-color: black;
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 3px;
    margin-left: 8px;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }

    &:disabled {
      background-color: #ccc;
    }
  }
`;

interface StatisticData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { _id: string; count: number }[];
  songsByArtist: { _id: string; count: number }[];
  songsByAlbum: { _id: string; count: number }[];
}

function Statistic() {
  const [statistics, setStatistics] = useState<StatisticData | null>(null);
  const [displayTable, setDisplayTable] = useState<'artist' | 'album' | 'genre'>('artist');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4; // Change this value to adjust the number of items per page
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<StatisticData>('http://localhost:4000/api/v1/song/statistics');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleTableChange = (table: 'artist' | 'album' | 'genre') => {
    setDisplayTable(table);
    setCurrentPage(1); // Reset current page when changing tables
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(getTotalItems() / itemsPerPage)));
  };

  const getTotalItems = () => {
    switch (displayTable) {
      case 'artist':
        return statistics?.songsByArtist.length ?? 0;
      case 'album':
        return statistics?.songsByAlbum.length ?? 0;
      case 'genre':
        return selectedArtist
          ? statistics?.songsByGenre.filter((song) => song._id === selectedArtist).length ?? 0
          : statistics?.songsByGenre.length ?? 0;
      default:
        return 0;
    }
  };

  const getCurrentItems = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  switch (displayTable) {
    case 'artist':
      return statistics?.songsByArtist.slice(startIndex, endIndex) ?? [];
    case 'album':
      return statistics?.songsByAlbum.slice(startIndex, endIndex) ?? [];
    case 'genre':
      return selectedArtist
        ? statistics?.songsByGenre.filter((song) => song._id === selectedArtist).slice(startIndex, endIndex) ?? []
        : statistics?.songsByGenre.slice(startIndex, endIndex) ?? [];
    default:
      return [];
  }
};

  const handleArtistClick = (artistId: string) => {
    setSelectedArtist(artistId);
    setDisplayTable('genre');
  };

  return (
    <StatisticsContainer>
      <StatisticsTitle>Statistics</StatisticsTitle>
      <Hr />
      {statistics && (
        <BoxInfo>
          <li>
            <LibraryMusicIcon className='icon'/>
            <Icon>
              <h3>{statistics.totalSongs}</h3>
              <p>Total Songs</p>
            </Icon>
          </li>
          <li>
            <HeadsetMicIcon className='icon'/>
            <Icon>
              <h3>{statistics.totalArtists}</h3>
              <p>Total Artists</p>
            </Icon>
          </li>
          <li>
            <AlbumIcon className='icon'/>
            <Icon>
              <h3>{statistics.totalAlbums}</h3>
              <p>Total Album</p>
            </Icon>
          </li>
          <li>
            <MusicNoteIcon className='icon'/>
            <Icon>
              <h3>{statistics.totalGenres}</h3>
              <p>Total Genres</p>
            </Icon>
          </li>
        </BoxInfo>
      )}
      <TableToggle>
        <button onClick={() => handleTableChange('artist')}>Artist Songs</button>
        <button onClick={() => handleTableChange('album')}>Album Songs</button>
        <button onClick={() => handleTableChange('genre')}>Genre Songs</button>
      </TableToggle>
      {statistics && (
        <div className="table-info">
          {displayTable === 'artist' && (
            <StyledTable>
              <thead>
                <tr>
                  <th>artist</th>
                  <th>total songs</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((songsByArtist, index) => (
                  <tr key={index} onClick={() => handleArtistClick(songsByArtist._id)}>
                    <td>{songsByArtist._id}</td>
                    <td>{songsByArtist.count}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
          {displayTable === 'artist' && (
            <Pagination>
              <button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
              <span>{`Page ${currentPage} of ${Math.ceil(getTotalItems() / itemsPerPage)}`}</span>
              <button className="next-btn" onClick={handleNextPage} disabled={currentPage === Math.ceil(getTotalItems() / itemsPerPage)}>Next</button>
            </Pagination>
          )}
          {displayTable === 'album' && (
            <StyledTable>
              <thead>
                <tr>
                  <th>album</th>
                  <th>total songs</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((albumStat, index) => (
                  <tr key={index}>
                    <td>{albumStat._id}</td>
                    <td>{albumStat.count}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
          {displayTable === 'album' && (
            <Pagination>
              <button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
              <span>{`Page ${currentPage} of ${Math.ceil(getTotalItems() / itemsPerPage)}`}</span>
              <button className="next-btn" onClick={handleNextPage} disabled={currentPage === Math.ceil(getTotalItems() / itemsPerPage)}>Next</button>
            </Pagination>
          )}
          {displayTable === 'genre' && (
            <StyledTable>
              <thead>
                <tr>
                  <th>genre</th>
                  <th>total songs</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((genreStat, index) => (
                  <tr key={index}>
                    <td>{genreStat._id}</td>
                    <td>{genreStat.count}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
          {displayTable === 'genre' && (
            <Pagination>
              <button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
              <span>{`Page ${currentPage} of ${Math.ceil(getTotalItems() / itemsPerPage)}`}</span>
              <button className="next-btn" onClick={handleNextPage} disabled={currentPage === Math.ceil(getTotalItems() / itemsPerPage)}>Next</button>
            </Pagination>
          )}
        </div>
      )}
    </StatisticsContainer>
  );
}

export default Statistic;
