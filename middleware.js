const Posts = require('./posts/postDb.js');
const Users = require('./users/userDb.js');

module.exports = {
  logger: function (req, res, next) {
    console.log(`${req.method} Request, ${req.url}, ${Date()}`);
    next();
  },

  validateUserId: function (req, res, next) {
    const {
      id
    } = req.params;
    Users.getById(id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          next(new Error('invalid user id'));
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'exception',
          err
        });
      });
  },

  validateUser: function (req, res, next) {
    const UserInfo = req.body;
    !UserInfo || UserInfo === {} ?
    res.status(400).json({ message: 'missing user data' }) : !UserInfo.name || UserInfo.name === '' ? res.status(400).json({ message: 'missing rquired name field' }) :
    next();
  },

  validatePost: function (req, res, next) {
    const PostInfo = req.body;
    !PostInfo || PostInfo === {} ? res.status(400).json({ message: 'missing post data' }) : !PostInfo.text || PostInfo.text === '' ? res.status(400).json({ message: 'missing required text field'}) : next();
  },

  validatePostID: function (req, res, next) {
    Posts.getById(req.params.id)
    .then(post=> {
      if(post) {
        req.post = post
        next()
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'})
      }
    })
    .catch(next)
  }
};
