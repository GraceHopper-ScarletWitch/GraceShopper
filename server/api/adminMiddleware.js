const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.userStatus !== 'admin') return res.sendStatus(401)
  next()
}

module.exports = adminMiddleware
