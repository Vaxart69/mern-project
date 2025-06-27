import jwt from 'jsonwebtoken';


const auth = (requiredType) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        if (user.userType !== requiredType) {
            return res.status(403).json({ message: 'Wrong user type' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;
