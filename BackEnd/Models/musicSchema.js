import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  song_name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Music = mongoose.model('Music', musicSchema);

export default Music;
