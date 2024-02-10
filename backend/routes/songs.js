// routes/songs.js

const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const app = express()
app.use(express.json());

// Create a song
router.post('/', async (req, res) => {
  try {
    const title = req.body.title;
    const artist = req.body.artist;
    const album = req.body.album;
    const genre = req.body.genre;

    if (!title || !artist || !album || !genre) {
      throw new Error('Invalid request payload. Missing required fields.');
    }

    const song = new Song({ title, artist, album, genre });
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});


// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a song by ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'artist', 'album', 'genre'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!song) {
      return res.status(404).send();
    }

    res.send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a song by ID
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).send('song not found');
    }

    res.send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get overall statistics
router.get('/statistics', async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').exec(); // Using exec() to execute the distinct() query
    const totalAlbums = await Song.distinct('album').exec(); // Using exec() to execute the distinct() query
    const totalGenres = await Song.distinct('genre').exec(); // Using exec() to execute the distinct() query

    const songsByGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);

    const songsByArtist = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } }
    ]);

    const songsByAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } }
    ]);

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
