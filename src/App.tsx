import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from './components/Home';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Patrol from './components/patrol';
import axios from 'axios';
import { CurrentUserType } from './types';

const App = () => {
    const [currentUser, setcurrentUser] = useState<CurrentUserType>({ Fullname: '', Email: '', isCompact: null , isDarkMode: true});
    useEffect(() => {
        axios.get('http://localhost:3102/currentUser')
            .then(response => {
                console.log('UI MODE - ',response.data.isDarkMode);
                setcurrentUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })


    }, []);

    const [darkMode, setDarkMode] = useState(currentUser.isDarkMode);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                    <Route path="/patrol" element={<Patrol />}  />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
