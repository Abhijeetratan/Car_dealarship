// isAdmin middleware
const isAdmin = (req, res, next) => {
    // Assuming the user information is stored in req.user after authentication middleware
    const user = req.user;

    // Check if the user has admin role
    if (user && user.role === 'admin') { // Assuming role is stored in the user object
        next(); // User is an admin, proceed to the next middleware/route handler
    } else {
        // User does not have admin role, send a 403 Forbidden response
        res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
};

module.exports = isAdmin;
