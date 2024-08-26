import { Schema, model } from 'mongoose';

const visitorSchema = new Schema({
    ip: { type: String, required: true }, // IP address of the visitor
    timestamp: { type: Date, default: Date.now }, // When the visitor accessed the site
});

const Visitor = model('Visitor', visitorSchema);

export default Visitor;