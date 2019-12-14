const router = require('express').Router();
let Score = require('../models/score.model');

router.route('/').get((req, res) => {
  Score.find()
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newScore = new Score({
    username,
    description,
    duration,
    date,
  });

  newScore.save()
  .then(() => res.json('Score added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;