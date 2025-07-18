import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/v1/users`) 
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then((data) => {
            setUsers(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message || 'Something went wrong');
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
    <div>
        <h2>User List</h2>
        <ul>
            {users.map(({ _id, name, email }) => (
            <li key={_id}>
                <strong>{name}</strong> ({email}) - ID: {_id}
            </li>
            ))}
        </ul>
    </div>
    );
}