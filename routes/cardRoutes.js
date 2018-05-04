const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Card = mongoose.model('cards');

module.exports = app => {
  app.post('/api/publish_card', requireAuth, async (req, res) => {
    const { title, inputImageURL, name } = req.body;
    const card = new Card({
      title,
      inputImageURL,
      _user: req.user.id,
      name
    });
    await card.save();
    res.send(await Card.find({}));
  });

  app.get('/api/get_cards', async (req, res) => {
    const cards = await Card.find({});
    res.send(cards);
  });

  app.post('/api/like_card', requireAuth, async (req, res) => {
    const { cardID, currentUserID } = req.body;
    const card = await Card.findById(cardID);
    if (card.likedBy.map(user => user.toString()).includes(currentUserID)) {
      res.status(304).send('Already liked');
      return;
    }
    card.likedBy.push(currentUserID);
    await card.save();
    res.send(await Card.find({}));
  });

  app.post('/api/unlike_card', requireAuth, async (req, res) => {
    const { cardID, currentUserID } = req.body;
    const card = await Card.findById(cardID);
    if (!card.likedBy.map(user => user.toString()).includes(currentUserID)) {
      res.status(304).send('Already Unliked');
      return;
    }
    card.likedBy.splice(card.likedBy.indexOf(currentUserID), 1);
    await card.save();
    res.send(await Card.find({}));
  });

  app.delete('/api/delete_card:cardID', requireAuth, async (req, res) => {
    await Card.findByIdAndRemove(req.params.cardID);
    res.send(await Card.find({}));
  });
};
