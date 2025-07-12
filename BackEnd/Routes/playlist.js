import express from "express";
import {
  createPlaylist,
  addMusicToPlaylist,
  getPlaylistMusic,
  deletePlaylist,
  removeMusicFromPlaylist,
} from "../Controllers/playlistController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/new", isAuthenticated, createPlaylist);
router.post("/:id", isAuthenticated, addMusicToPlaylist);
router.get("/:id", isAuthenticated, getPlaylistMusic);
router.delete("/:id", isAuthenticated, deletePlaylist);
router.delete("/:playlistId/music/:musicId", isAuthenticated, removeMusicFromPlaylist);

export default router;
