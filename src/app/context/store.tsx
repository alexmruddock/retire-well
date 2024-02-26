"use client";

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

type ContextProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    userEmail: string;
    setUserEmail: Dispatch<SetStateAction<string>>;
    userRole: string;
    setUserRole: Dispatch<SetStateAction<string>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    organizationId: string;
    setOrganizationId: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    userEmail: '',
    setUserEmail: () => { },
    userRole: '',
    setUserRole: () => { },
    userId: '',
    setUserId: () => { },
    organizationId: '',
    setOrganizationId: () => { }
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [organizationId, setOrganizationId] = useState<string>('');

    // Update state from localStorage on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
            setUserEmail(localStorage.getItem('userEmail') || '');
            setUserRole(localStorage.getItem('userRole') || '');
            setUserId(localStorage.getItem('userId') || '');
            setOrganizationId(localStorage.getItem('organizationId') || '');
        }
    }, []);

    // Update localStorage whenever the state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isLoggedIn', isLoggedIn.toString());
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userId', userId);
            localStorage.setItem('organizationId', organizationId);
        }
    }, [isLoggedIn, userEmail, userRole, userId, organizationId]);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userEmail,
            setUserEmail,
            userRole,
            setUserRole,
            userId,
            setUserId,
            organizationId,
            setOrganizationId
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);
