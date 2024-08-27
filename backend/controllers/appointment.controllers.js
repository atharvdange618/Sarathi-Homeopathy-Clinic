import Appointment from '../model/appointment.model.js';
import Notification from '../model/notification.model.js';

// Add a new appointment
export const addAppointment = async (req, res) => {
    try {
        const { name, number, date, message } = req.body;
        const newAppointment = new Appointment({ name, number, date, message });
        await newAppointment.save();

        // Create a notification for the new appointment
        const notification = new Notification({
            type: 'new_appointment',
            message: `New appointment added for ${name} on ${date}`,
            data: {
                appointmentId: newAppointment._id,
                date: date,
            },
        });

        await notification.save();

        res.status(201).json({ message: "Appointment added successfully", newAppointment });
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all appointments
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 }); // Sort by date
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};