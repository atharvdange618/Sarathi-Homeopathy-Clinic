import Visitor from '../model/visitor.model.js';

const trackVisitor = async (req, res, next) => {
    try {
        const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const url = req.originalUrl;

        await Visitor.create({
            ip,
            userAgent,
            url,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error tracking visitor:', error);
    } finally {
        next();
    }
};

export default trackVisitor;