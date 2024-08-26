import { useEffect, useState } from 'react';
import axios from 'axios';

function ContentManagement() {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: '', content: '' });
    const APP_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = () => {
        axios.get(`${APP_URL}/api/articles`)
            .then(response => setArticles(response.data))
            .catch(error => console.error('Error fetching articles', error));
    };

    const handleInputChange = (e) => {
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${APP_URL}/api/articles`, newArticle)
            .then(() => {
                fetchArticles();
                setNewArticle({ title: '', content: '' });
            })
            .catch(error => console.error('Error creating article', error));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Content Management</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    name="title"
                    value={newArticle.title}
                    onChange={handleInputChange}
                    placeholder="Article Title"
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                    name="content"
                    value={newArticle.content}
                    onChange={handleInputChange}
                    placeholder="Article Content"
                    className="w-full p-2 mb-2 border rounded"
                    rows="4"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Add Article
                </button>
            </form>
            <div>
                {articles.map(article => (
                    <div key={article.id} className="bg-white p-4 mb-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p>{article.content.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentManagement;