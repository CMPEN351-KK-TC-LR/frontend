import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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

    const value = {
        loading,
        currentUser,
        login: (user) => setCurrentUser(user),
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};


export default useAuth;
