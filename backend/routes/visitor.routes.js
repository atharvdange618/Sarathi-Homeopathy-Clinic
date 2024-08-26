import { Router } from 'express';
const router = Router();
import { getDailyVisitors, getMonthlyVisitors } from '../controllers/visitor.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.get('/visitors/daily', protectRoute, getDailyVisitors);
router.get('/visitors/monthly', protectRoute, getMonthlyVisitors);

export default router;