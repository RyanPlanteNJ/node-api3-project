const express = require('express');
const Posts = require('./postDb.js');
const {validatePost} = require('../middleware.js');
const {validatePostID} = require('../middleware.js');





const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const posts = await Posts.get();
    if(posts.length > 0) {
      res.status(200).json(posts);
    } else {res.status(404).json({
      message: 'No posts available' });
    }
  } catch (error) {
    next (error)
  }
});

router.get('/:id', validatePostID, async (req, res, next) => {
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retreived"
      });
    }
  });

router.delete('/:id', validatePostID, async (req, res, next) => {
    const post = await Posts.remove(req.params.id);
    if (post) {
      res.status(200).json(req.body)
    } else {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed"
      });
    }
  });

router.put('/:id', validatePostID, validatePost, async (req, res, next) => {
    if (req.body.text){
      const editPostInfo = await Posts.update(req.params.id, req.body)
      res.status(201).json(editPostInfo);
    }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
