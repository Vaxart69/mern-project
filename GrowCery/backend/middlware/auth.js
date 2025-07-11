import jwt from 'jsonwebtoken';


const auth = (requiredType) => (req, res, next) => {

    // get the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    // no token
    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }
    
    try {

        // validate the token
        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        // of the returned user type is not the specified type then return error
        if (user.userType !== requiredType) {
            return res.status(403).json({ message: 'Wrong user type' });
        }
        
        req.user = user;
        next(); // next function
    } catch (error) {

        // else error
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;
