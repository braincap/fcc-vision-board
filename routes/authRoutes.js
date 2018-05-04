const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    (req, res, next) => {
      console.log('/auth/google');
      next();
    },
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  

  app.get(
    '/auth/google/callback',
    (req, res, next) => {
      console.log('/auth/google/callback');
      next();
    },
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
