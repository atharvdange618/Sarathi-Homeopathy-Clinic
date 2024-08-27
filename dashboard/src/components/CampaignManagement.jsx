import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

function CampaignManagement() {
    const [campaigns, setCampaigns] = useState([]);
    const [newCampaign, setNewCampaign] = useState({
        title: '',
        description: '',
        image: '',
        startDate: '',
        endDate: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/campaigns`);
            if (response.status === 200) {
                setCampaigns(response.data);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleInputChange = (e) => {
        setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                const response = await axios.put(`${APP_URL}/api/campaigns/${editingId}`, newCampaign, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    toast.success(response.data.message);
                    fetchCampaigns();
                    setNewCampaign({ title: '', description: '', image: '', startDate: '', endDate: '' });
                    setIsEditing(false);
                    setEditingId(null);
                }
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            try {
                const response = await axios.post(`${APP_URL}/api/campaigns`, newCampaign, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    toast.success(response.data.message);
                    fetchCampaigns();
                    setNewCampaign({ title: '', description: '', image: '', startDate: '', endDate: '' });
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleEdit = (campaign) => {
        setNewCampaign(campaign);
        setIsEditing(true);
        setEditingId(campaign._id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${APP_URL}/api/campaigns/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchCampaigns();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="p-6">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Campaign Management</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    name="title"
                    value={newCampaign.title}
                    onChange={handleInputChange}
                    placeholder="Campaign Title"
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                    name="description"
                    value={newCampaign.description}
                    onChange={handleInputChange}
                    placeholder="Campaign Description"
                    className="w-full p-2 mb-2 border rounded"
                    rows="4"
                />
                <input
                    type="text"
                    name="image"
                    value={newCampaign.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    type="date"
                    name="startDate"
                    value={newCampaign.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    type="date"
                    name="endDate"
                    value={newCampaign.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    {isEditing ? 'Update Campaign' : 'Add Campaign'}
                </button>
            </form>

            {/* Desktop View */}
            <table className="w-full border-collapse border border-gray-300 hidden md:table">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Start Date</th>
                        <th className="border border-gray-300 p-2">End Date</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(campaign => (
                        <tr key={campaign._id}>
                            <td className="border border-gray-300 p-2">{campaign.title}</td>
                            <td className="border border-gray-300 p-2">{campaign.description.substring(0, 100)}...</td>
                            <td className="border border-gray-300 p-2">{new Date(campaign.startDate).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">{new Date(campaign.endDate).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => handleEdit(campaign)} className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(campaign._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile View */}
            <div className="md:hidden">
                {campaigns.map(campaign => (
                    <div key={campaign._id} className="bg-white shadow rounded-lg p-4 mb-4">
                        <div className="mb-2 flex justify-between">
                            <h3 className="font-semibold text-lg">{campaign.title}</h3>
                            <div>
                                <button onClick={() => handleEdit(campaign)} className="text-blue-500 mr-4" aria-label="Edit">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(campaign._id)} className="text-red-500" aria-label="Delete">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-2"><strong>Description:</strong> {campaign.description.substring(0, 100)}...</p>
                        <p className="text-gray-600 mb-2"><strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-2"><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CampaignManagement;
