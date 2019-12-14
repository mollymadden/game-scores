const router = require('express').Router();
let Score = require('../models/score.model');

router.route('/').get((req, res) => {
  Score.find()
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const game = req.body.game;
  const score = Number(req.body.score);
  const date = Date.parse(req.body.date);

  const newScore = new Score({
    username,
    game,
    score,
    date,
  });

  newScore.save()
  .then(() => res.json('Score added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Score.findById(req.params.id)
      .then(score => res.json(score))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Score.findByIdAndDelete(req.params.id)
      .then(() => res.json('Score deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Score.findById(req.params.id)
      .then(score => {
        score.username = req.body.username;
        score.game = req.body.game;
        score.score = Number(req.body.score);
        score.date = Date.parse(req.body.date);
  
        score.save()
          .then(() => res.json('Score updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;