module.exports = {
    isLoggedIn: (req, res, next) => {
        if(!req.session.user) {
          return res.status(401).send('You need to be signed in to do that')
        }
    
        next()
      },
    isAdmin: (req, res, next) => {}
} 