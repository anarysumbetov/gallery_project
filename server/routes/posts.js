import express from "express";

import { getPosts, getPost, createPost, updatedPost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', createPost);
router.patch('/:id', updatedPost);

export default router;