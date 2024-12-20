import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Invalid token' });
    }
    req.user = decoded;  // Attach the decoded user info to the request
    next();
  });
};

export default authenticate;
