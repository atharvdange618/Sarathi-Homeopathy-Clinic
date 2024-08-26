import { Router } from 'express';
const router = Router();
import { addAppointment, getAppointments, deleteAppointment, } from '../controllers/appointment.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post('/appointments', protectRoute, addAppointment);        // Add a new appointment
router.get('/patients', protectRoute, getAppointments);            // Get all appointments
router.delete('/appointments/:id', protectRoute, deleteAppointment); // Delete an appointment

export default router;