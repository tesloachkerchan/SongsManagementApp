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
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(5); // Change the number of songs per page as needed
  const [editSong, setEditSong] = useState<Song | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSong, setNewSong] = useState<Song>({
    _id: '',
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

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

  const handleEdit = (song: Song) => {
    setEditSong(song);
  };

  const handleUpdate = async (updatedSong: Song) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/song/${updatedSong._id}`, updatedSong);
      const updatedSongData = response.data;
      setSongs(songs.map(song => (song._id === updatedSongData._id ? updatedSongData : song)));
      setEditSong(null); // Clear the edit state
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/song`, newSong);
      const createdSong = response.data;
      setSongs([...songs, createdSong]);
      setNewSong({
        _id: '',
        title: '',
        artist: '',
        album: '',
        genre: '',
      });
      setShowCreateForm(false); // Hide the create form after submission
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSong(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Get current songs
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='main'>
      <div className='header'>
        <h2>Songs List</h2>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>AddSong</button>
        
      </div>
      <hr />
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
          {currentSongs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>
                <button className="editButton" onClick={() => handleEdit(song)}>Update</button>
                <button className="deleteButton" onClick={() => deleteSong(song._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="prev-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <button className="next-btn" onClick={() => paginate(currentPage + 1)} disabled={currentSongs.length < songsPerPage}>Next</button>
      </div>
      {editSong && (
        <div className='edit-song'>
          <h2>Edit Song</h2>
          <form onSubmit={() => handleUpdate(editSong)}>
            <input type="text" name="title" value={editSong.title} onChange={(e) => setEditSong({...editSong, title: e.target.value})} />
            <input type="text" name="artist" value={editSong.artist} onChange={(e) => setEditSong({...editSong, artist: e.target.value})} />
            <input type="text" name="album" value={editSong.album} onChange={(e) => setEditSong({...editSong, album: e.target.value})} />
            <input type="text" name="genre" value={editSong.genre} onChange={(e) => setEditSong({...editSong, genre: e.target.value})} />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      {showCreateForm && (
        <div className='add-song'>
          <h2>Create Song</h2>
          <form onSubmit={handleCreate}>
            <input type="text" name="title" placeholder="Title" value={newSong.title} onChange={handleChange} />
            <input type="text" name="artist" placeholder="Artist" value={newSong.artist} onChange={handleChange} />
            <input type="text" name="album" placeholder="Album" value={newSong.album} onChange={handleChange} />
            <input type="text" name="genre" placeholder="Genre" value={newSong.genre} onChange={handleChange} />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
      
    </div>
  );
}

export default Main;
