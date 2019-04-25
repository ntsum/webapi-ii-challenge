const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})


router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json({
      messageOfTheDay: process.env.MOTD,
      posts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Where da info @?"
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "this id has no posts :("
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "cannot get ur info pal"
    });
  }
});

router.post('/', async (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (title && contents) {
    try {
      const post = await Posts.insert({
        title,
        contents
      });
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "cant post sorry"
      })
    }
  } else {
    res.status(400).json({
      errorMessage: "y u no put in title and contents????"
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    console.log(post);
    if (post > 0) {
      res.status(200).json({ message: "gone 4ever" })
    }
    else {
      res.status(404).json({ message: "post does not exist" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "no touchy, no delete" });
  }
});

router.put('/:id', async (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (title && contents) {
    try {
      const post = await Posts.update(req.params.id, { title, contents });
      if (post > 0) {
        res.status(200).json(post);
      }
      else {
        res.status(404).json({ message: "posts for this id? where? nowhere" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "CANT UPDATE THIS!!!!"
      })
    }
  } else {
    res.status(400).json({ errorMessage: "give me the title and contents" })
  }

});

module.exports = router;