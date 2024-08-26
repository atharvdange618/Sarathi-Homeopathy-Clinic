import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    message: { type: String }
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;