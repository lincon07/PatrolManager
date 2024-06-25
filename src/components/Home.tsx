import { AppBar, Toolbar, Typography, Container, IconButton, Tooltip, Box, Button, Card, CardContent, CardMedia, CardActions, Divider, Alert, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { DarkMode, Dataset, Diversity1, LightMode, ManageAccounts, Person, ViewCompact, ViewCompactAlt } from '@mui/icons-material';
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
    const [JSONError, setJSONError] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState<CurrentUserType>({ Fullname: '', Email: '' , isCompact: null , isDarkMode: false});
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // Toolbar 
    const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    // Load community data
    React.useEffect(() => {
        // Load current community
        axios.get('http://localhost:3101/Community')
            .then(response => {
                console.log(response.data);
                setCommunity(response.data);
            })
            .catch(error => {
                console.log('Community JSON was not found',error);
                setJSONError(true);
            })
    }, [])
    // Load current User
    React.useEffect(() => {
        axios.get('http://localhost:3102/currentUser')
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
        axios.put('http://localhost:3102/currentUser', {isCompact: !compactMode})
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
                {JSONError ? <Alert severity="error">Error loading data!</Alert> 
                : 
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 0.5 }}>Patrol Manager</Typography>
                <Typography variant='h6' sx={{ flexGrow: 0.5 }} color='GrayText'> Good {currentTime >= 12 ? "Evening" : "Morning"} {currentUser.Fullname}</Typography>
                <Tooltip title="Patrol Logs">
                    <IconButton> <Dataset fontSize='inherit' /> </IconButton>
                </Tooltip>
                <Tooltip title={darkMode ? 'Use light mode' : 'Use dark mode'} onClick={toggleDarkMode}>
                    <IconButton> {darkMode ? <LightMode fontSize='inherit' /> : <DarkMode />} </IconButton>
                </Tooltip>
                <Tooltip title={ compactMode ?  "use exapanded mode" : "use compact mode"} onClick={toggleCompact}>
                    <IconButton> { compactMode ?  <ViewCompactAlt /> :  <ViewCompact />} </IconButton>
                </Tooltip>
                <Tooltip title="Manage account" onClick={handleMenuOpen}>
                    <IconButton color="inherit">
                        <ManageAccounts />
                    </IconButton>
                </Tooltip>
                <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                >
                <MenuItem onClick={handleMenuClose}> <Person sx={{mr: '15px'}}/> Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}><Diversity1 sx={{mr: '15px'}} /> {community.Alias}</MenuItem>
            </Menu>
            </Toolbar>
                }
            </AppBar>
            
           {
            JSONError ? 
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , alignContent: 'center' , alignItems: 'center' , width: '90vw', marginTop: '10vh' , overflowX: 'none'}}>
            <Typography variant='h5' color='GrayText'>Could not detect community and user files. Restart to retry.</Typography>
           </Box>

            : 
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , alignContent: 'center' , alignItems: 'center' , width: '90vw', marginTop: '10vh' , overflowX: 'none'}}>
            <Typography variant='h6' fontSize='small' color='text.secondary'>Connected community: {community.Alias} </Typography>
            <div style={{display:'flex' , flexDirection: 'row' , flexWrap: 'wrap', marginTop: '6vh'}}>

                { compactMode ? <ConfigLite community={community}/>
                :
                <Config  community={community}/>
                }
            </div>
           </Box>
           }
        </div>
     
    );
}
