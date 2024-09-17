const roleAuth = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    };
  };
  
  module.exports = roleAuth;