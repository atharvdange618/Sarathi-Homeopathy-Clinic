import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function PatientManagement() {
    const [patients, setPatients] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [newAppointment, setNewAppointment] = useState({
        name: '',
        number: '',
        date: '',
        message: ''
    });
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token')

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/patients`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setPatients(response.data);
            }
        } catch (error) {
            toast.error(`Error fetching patients: ${error.message}`);
        }
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }

    const handleInputChange = (e) => {
        setNewAppointment({
            ...newAppointment,
            [e.target.id]: e.target.value
        });
    };

    const deletePatients = async (id) => {
        try {
            const response = await axios.delete(`${APP_URL}/api/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                toast.success(response.data.message);
                setRefresh(prev => !prev)
            }
        } catch (error) {
            toast.error(`Error deleting appointment ${error.message}`)
        }
    }

    useEffect(() => {
        fetchPatients();
    }, [APP_URL, token, refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APP_URL}/api/appointments`, newAppointment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                toast.success(response.data.message);
                setNewAppointment({ name: '', number: '', date: '', message: '' });
                setRefresh(prev => !prev)
            }
        } catch (error) {
            toast.error(`Error adding appointment ${error.message}`)
        }
    };

    return (
        <div className="p-6">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

            {/* Appointment Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add New Appointment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        id="name"
                        placeholder="Patient Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={newAppointment.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        id="number"
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={newAppointment.number}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="date"
                        id="date"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        id="message"
                        placeholder="Complaints"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={newAppointment.message}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                    Add Appointment
                </button>
            </form>

            {/* Patient List */}
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Phone</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Notes</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {patients.map((patient) => (
                        <tr key={patient._id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">{patient.name}</td>
                            <td className="py-3 px-4">{patient.number}</td>
                            <td className="py-3 px-4">{formatDate(patient.date)}</td>
                            <td className="py-3 px-4">{patient.message}</td>
                            <td className="py-3 px-4">
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => deletePatients(patient._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientManagement;