import React, { useEffect, useState } from 'react';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import axios from 'axios';
import './statistic.css';

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

  const handleArtistClick = (artistId: string) => {
    setSelectedArtist(artistId);
    setDisplayTable('genre');
  };

  const handleTableChange = (table: 'artist' | 'album' | 'genre') => {
    setDisplayTable(table);
  };

  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      <hr />
      {statistics && (
        <div className="box-info">
          <li>
            <LibraryMusicIcon className='icon'/>
            <span className="text">
              <h3>{statistics.totalSongs}</h3>
              <p>Total Songs</p>
            </span>
          </li>
          <li>
            <HeadsetMicIcon className='icon'/>
            <span className="text">
              <h3>{statistics.totalArtists}</h3>
              <p>Total Artists</p>
            </span>
          </li>
          <li>
            <AlbumIcon className='icon'/>
            <span className="text">
              <h3>{statistics.totalAlbums}</h3>
              <p>Total Album</p>
            </span>
          </li>
          <li>
            <MusicNoteIcon className='icon'/>
            <span className="text">
              <h3>{statistics.totalGenres}</h3>
              <p>Total Genres</p>
            </span>
          </li>
        </div>
      )}
      <div className="table-toggle">
        <button onClick={() => handleTableChange('artist')}>Artist Songs</button>
        <button onClick={() => handleTableChange('album')}>Album Songs</button>
        <button onClick={() => handleTableChange('genre')}>Genre Songs</button>
      </div>
      {statistics && (
        <div className="table-info">
          {displayTable === 'artist' && (
            <table>
              <thead>
                <tr>
                  <th>artist</th>
                  <th>total songs</th>
                </tr>
              </thead>
              <tbody>
                {statistics.songsByArtist.map((songsByArtist, index) => (
                  <tr key={index} onClick={() => handleArtistClick(songsByArtist._id)}>
                    <td>{songsByArtist._id}</td>
                    <td>{songsByArtist.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {displayTable === 'album' && (
            <table>
              <thead>
                <tr>
                  <th>album</th>
                  <th>total songs</th>
                </tr>
              </thead>
              <tbody>
                {statistics.songsByAlbum.map((albumStat, index) => (
                  <tr key={index}>
                    <td>{albumStat._id}</td>
                    <td>{albumStat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {displayTable === 'genre' && (
            <table>
              <thead>
                <tr>
                  <th>genre</th>
                  <th>total songs</th>
                </tr>
              </thead>
              <tbody>
                {selectedArtist ?
                  statistics.songsByGenre
                    .filter((song) => song._id === selectedArtist)
                    .map((genreStat, index) => (
                      <tr key={index}>
                        <td>{genreStat._id}</td>
                        <td>{genreStat.count}</td>
                      </tr>
                    ))
                  :
                  statistics.songsByGenre.map((genreStat, index) => (
                    <tr key={index}>
                      <td>{genreStat._id}</td>
                      <td>{genreStat.count}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Statistic;
