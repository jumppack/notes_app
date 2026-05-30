import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({message: "Unauthorized"});
  }

  let secret = process.env.JWT_SECRET;
  const tokenString = token.split(' ')[1];

  try {
    const decoded = jwt.verify(tokenString, secret);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({message: 'Forbidden: Invalid token'});
  }
};
