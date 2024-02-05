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
      return res.status(404).send();
    }

    res.send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
