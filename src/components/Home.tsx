import { AppBar, Toolbar, Typography, Container, IconButton, Tooltip, Box, Button, Card, CardContent, CardMedia, CardActions, Divider } from '@mui/material';
import React, { useState } from 'react';
import { DarkMode, Dataset, LightMode, ViewCompact, ViewCompactAlt } from '@mui/icons-material';
import { CommuntyType, CurrentUserType, DeptType } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfigLite from './subComponents/configLite';
import Config from './subComponents/config';
// pages 

export default function Home(props: { darkMode: boolean, toggleDarkMode: () => void } ) {
    // Handle theme change
    const { darkMode, toggleDarkMode } = props;
    const [compactMode , toggleCompactMode] = React.useState(true);
    const currentTime = new Date().getHours();
    const [community, setCommunity] = React.useState<CommuntyType>({ Alias: '', Fullname: '', Departments: [], Servers: []});
    const [currentUser, setCurrentUser] = React.useState<CurrentUserType>({ Fullname: '', Email: '' , isCompact: null});
    // Load community data
    React.useEffect(() => {
        // Load current community
        axios.get('http://localhost:3001/Community')
            .then(response => {
                console.log(response.data);
                setCommunity(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    // Load current User
    React.useEffect(() => {
        axios.get('http://localhost:3002/currentUser')
            .then(response => {
                console.log(response.data);
                setCurrentUser(response.data);
                toggleCompactMode(response.data.isCompact);
                console.log(response.data.isCompact)
            })
            .catch(error => {
                console.log(error);
            }
        )}, [])
    // Toggle compact mode and update the user's preference JSON 
    const toggleCompact = () => {
        axios.put('http://localhost:3002/currentUser', {isCompact: !compactMode})
            .then(response => {
                console.log(response.data);
                setCurrentUser(response.data);
                toggleCompactMode(response.data.isCompact);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // Start Patrol
    const nav = useNavigate();
    const startPatrol = (dept: DeptType) => {
        sessionStorage.setItem('patrolConfig', JSON.stringify(dept));
        nav('/patrol', );
    }

    return (
        <div style={{display: 'flex' , flexDirection: 'column'}}>
             <AppBar>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Patrol Manager</Typography>
                    <Tooltip title="Patrol Logs">
                        <IconButton> <Dataset fontSize='inherit' /> </IconButton>
                    </Tooltip>
                    <Tooltip title={darkMode ? 'Use light mode' : 'Use dark mode'} onClick={toggleDarkMode}>
                        <IconButton> {darkMode ? <LightMode fontSize='inherit' /> : <DarkMode />} </IconButton>
                    </Tooltip>
                    <Tooltip title={ compactMode ?  "use exapanded mode" : "use compact mode"} onClick={toggleCompact}>
                        <IconButton> { compactMode ?  <ViewCompactAlt /> :  <ViewCompact />} </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , alignContent: 'center' , alignItems: 'center' , width: '90vw', marginTop: '10vh' , overflowX: 'none'}}>
            <Typography variant='h5' color='GrayText'> Good {currentTime >= 12 ? "Evening" : "Morning"} {currentUser.Fullname}</Typography>
            <Typography variant='h6' fontSize='small' color='text.secondary'>Community: {community.Alias} </Typography>
            <div style={{display:'flex' , flexDirection: 'row' , flexWrap: 'wrap', marginTop: '6vh'}}>
            <Divider  />

                { compactMode ? <ConfigLite community={community}/>
                :
                <Config  community={community}/>
                }
            </div>
                
         </Box>
        </div>
     
    );
}
