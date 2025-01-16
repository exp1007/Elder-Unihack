import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);

    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken); // Persist token in localStorage
    };

    const clearToken = () => {
        setToken(null);
        localStorage.removeItem('authToken'); // Clear token from localStorage
    };

    return (
        <SessionContext.Provider value={{ token, saveToken, clearToken }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);
