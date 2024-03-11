import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

// Styled components for the styles
const MainContainer = styled.div`
  flex: 8.5;
  text-align: center;
  margin: 15px;
`;

const Header = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-left: 50px;
  border: none;
  font-size: large;
  background: none;
  cursor: pointer;
`;

const HeaderTitle = styled.h2`
  margin-bottom: 5px;
  font-size: xx-large;
`;

const Hr = styled.hr`
  color: #f2f2f2;
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 95%;
  margin: 30px;
  text-transform: capitalize;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  cursor: pointer;
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    -webkit-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 1px 16px -7px rgba(0, 0, 0, 0.75);
  }
`;

const EditButton = styled.button`
  background-color: gray;
  color: white;
  margin: 5px;
  border: none;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  margin: 5px;
  border: none;
  border-radius: 5px;
  padding: 3px;
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

const AddSong = styled.div`
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
  }

  form {
    display: grid;
    grid-gap: 10px;

    input[type="text"],
    button {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    button {
      background-color: #007bff;
      color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }

    input[type="text"]::placeholder {
      color: #aaa;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Functional component
function Main() {
  // Component logic...
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(6); // Change the number of songs per page as needed
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
      const response = await axios.patch(`http://localhost:4000/api/v1/song/${updatedSong._id}`, updatedSong);
      const updatedSongData = response.data;
      setSongs(songs.map(song => (song._id === updatedSongData.id ? updatedSongData : song)));
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
    <MainContainer>
      <Header>
        <HeaderTitle>Songs List</HeaderTitle>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Hide Form' : 'Add Song'}
        </Button>
      </Header>
      <Hr />
      {!showCreateForm && (
        <React.Fragment>
          <Table>
            <thead>
              <tr>
                <TableHeader>title</TableHeader>
                <TableHeader>artist</TableHeader>
                <TableHeader>album</TableHeader>
                <TableHeader>genre</TableHeader>
                <TableHeader>action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {currentSongs.map((song) => (
                <TableRow key={song._id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>{song.genre}</td>
                  <td>
                    <EditButton onClick={() => handleEdit(song)}>Update</EditButton>
                    <DeleteButton onClick={() => deleteSong(song._id)}>Delete</DeleteButton>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <button className="prev-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            <span>{`Page ${currentPage} of ${Math.ceil((songs.length )/ songsPerPage)}`}</span>
            <button className="next-btn" onClick={() => paginate(currentPage + 1)} disabled={currentPage===Math.ceil((songs.length )/ songsPerPage)}>Next</button>
          </Pagination>
        </React.Fragment>
      )}
      {editSong && (
        <AddSong>
          <h2>Edit Song</h2>
          <form onSubmit={(e) => {
            handleUpdate(editSong)
          }}>
            <input type="text" name="title" value={editSong.title} onChange={(e) => setEditSong({...editSong, title: e.target.value})} />
            <input type="text" name="artist" value={editSong.artist} onChange={(e) => setEditSong({...editSong, artist: e.target.value})} />
            <input type="text" name="album" value={editSong.album} onChange={(e) => setEditSong({...editSong, album: e.target.value})} />
            <input type="text" name="genre" value={editSong.genre} onChange={(e) => setEditSong({...editSong, genre: e.target.value})} />
            <button type="submit">Save</button>
          </form>
        </AddSong>
      )}
      {showCreateForm && (
        <AddSong>
          <h2>Create Song</h2>
          <form onSubmit={handleCreate}>
            <input type="text" name="title" placeholder="Title" value={newSong.title} onChange={handleChange} />
            <input type="text" name="artist" placeholder="Artist" value={newSong.artist} onChange={handleChange} />
            <input type="text" name="album" placeholder="Album" value={newSong.album} onChange={handleChange} />
            <input type="text" name="genre" placeholder="Genre" value={newSong.genre} onChange={handleChange} />
            <button type="submit">Create</button>
          </form>
        </AddSong>
      )}
    </MainContainer>
  );
}

export default Main;
