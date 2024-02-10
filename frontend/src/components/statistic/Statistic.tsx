import React, { useEffect, useState } from 'react';
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

  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      {statistics && (
        <div>
          <p>Total number of songs: {statistics.totalSongs}</p>
          <p>Total number of artists: {statistics.totalArtists}</p>
          <p>Total number of albums: {statistics.totalAlbums}</p>
          <p>Total number of genres: {statistics.totalGenres}</p>
          <h3>Songs by Genre</h3>
          <ul>
            {statistics.songsByGenre.map((genreStat, index) => (
              <li key={index}>{genreStat._id}: {genreStat.count}</li>
            ))}
          </ul>
          <h3>Songs by Artist</h3>
          <ul>
            {statistics.songsByArtist.map((artistStat, index) => (
              <li key={index}>{artistStat._id}: {artistStat.count}</li>
            ))}
          </ul>
          <h3>Songs by Album</h3>
          <ul>
            {statistics.songsByAlbum.map((albumStat, index) => (
              <li key={index}>{albumStat._id}: {albumStat.count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Statistic;
