// songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongState {
  songs: Song[]; // Change from 'song' to 'songs' and update the initial state
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [], // Change from 'song' to 'songs'
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    fetchSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongSuccess(state, action: PayloadAction<Song[]>) { // Change action payload to Song[]
      state.loading = false;
      state.songs = action.payload; // Change from 'song' to 'songs'
    },
    fetchSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSongStart, fetchSongSuccess, fetchSongFailure } = songSlice.actions;

export const selectSong = (state: RootState) => state.song.songs; // Change from 'song' to 'songs'

// Other selectors remain unchanged

// Async action creator using Redux Thunk
export const fetchSong = () => async (dispatch: any) => {
  dispatch(fetchSongStart());
  try {
    const response = await axios.get<Song[]>('http://localhost:4000/api/v1/song');
    console.log(response.data); // Log the response data
    dispatch(fetchSongSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export default songSlice.reducer;
