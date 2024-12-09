const roleMiddleware = async (roles) => {
    return (req, res, next) => {
        if (!roles.include(req.user.role)){
            return res.status(403).json({message: 'Access Denied'});
        }
        next();
    };
};

module.exports = roleMiddleware;