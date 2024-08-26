import express from 'express';
import { signup, login, logout } from '../controllers/auth.controllers.js';
import { body, validationResult } from 'express-validator';
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router();

// Signup route with input validation
router.post(
    '/signup',
    [
        body('name')
            .notEmpty().withMessage('Full name is required')
            .isLength({ min: 1 }).withMessage('Full name must be at least 1 character long'),
        body('email')
            .isEmail().withMessage('Enter a valid email address'),
        body('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        signup(req, res, next);
    }
);

// Login route with input validation
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').exists().withMessage('Password is required'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        login(req, res, next);
    }
);

// Logout route with authentication middleware
router.get('/logout', protectRoute, logout);

// Example of a protected route that requires authentication
router.get('/profile', protectRoute, (req, res) => {
    res.json({ message: `Welcome ${req.user.fullname}, this is your profile.` });
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default router;