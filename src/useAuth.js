import { useState, useEffect } from 'react';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetch('/api/users/user-info')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                setCurrentUser(data);
                setLoading(false);
            })
            .catch(error => {
                if (error.message.includes('404')) {
                    setCurrentUser(null);
                }
                setLoading(false);
            });
    }, []);

    return { loading, currentUser };
}

export default useAuth;
