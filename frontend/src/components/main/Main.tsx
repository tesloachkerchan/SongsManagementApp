import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

function Main() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Song[]>('http://localhost:4000/api/v1/song');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteSong = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/song/${id}`);
      // Remove the deleted song from the state
      setSongs(songs.filter(song => song._id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  return (
    <div className='main'>
      <div className='header'>
        <h2>Songs List</h2>
        <hr />
      </div>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
            <th>genre</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>
                <button className="editButton">Update</button>
                <button className="deleteButton" onClick={() => deleteSong(song._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="prev-btn" disabled>Prev</button>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
}

export default Main;
