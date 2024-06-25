import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Dataset, ExpandMore, Home, LocalPolice, MoreVert } from "@mui/icons-material";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogActions,
    Snackbar,
    AlertProps,
    AlertColor,
    LinearProgress,
    InputLabel,
    TextField,
    Tabs,
    Tab,
} from "@mui/material";

export default function Patrol() {
    const ExistingPatrolConfig = JSON.parse(sessionStorage.getItem('patrolConfig') || '{}');
    const nav = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const patrolConfig = JSON.parse(sessionStorage.getItem('patrolConfig') || '{}');
    const [onDuty, setOnDuty] = React.useState(patrolConfig.isOnDuty || false);
    const [ EndPatrolDialog, setEndPatrolDialog] = React.useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
    const [SnacbarSeverity, setSnackbarSeverity] = React.useState<AlertColor>('success'); // ['success', 'error', 'warning', 'info', 'default', 'inherit'
    const [SnacbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [tabValue, setTabValue] = useState(0);

    // Handle Menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    // Handle start patrol
    const handleStartPatrol = () => {
        const data = {
            ...ExistingPatrolConfig,
            isOnDuty: true,
        }
        sessionStorage.setItem('patrolConfig', JSON.stringify(data));
        setOnDuty(true);
        setSnackbarOpen(true);
        setSnackbarSeverity('info');
        setSnackbarMessage('Patrol Started!');
    }
    const handleStopPatrol = () => {
        const data = {
            ...ExistingPatrolConfig,
            isOnDuty: false,
        }
        sessionStorage.setItem('patrolConfig', JSON.stringify(data));
        setOnDuty(false);
        setEndPatrolDialog(false);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Patrol Stopped!');
    }
    const handleEndDialog = () => {
        setEndPatrolDialog(true);
    }
    const handleTabChange = (event:any, newValue:any) => {
        setTabValue(newValue);
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '80vw' }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 0.4 }}>
                        {patrolConfig.departmentSelected?.Alias || 'Department'} Manager
                    </Typography>
                    <Typography sx={{ flexGrow: 0.6 }} color="text.secondary">
                        00:00:00
                    </Typography>
                    <Tooltip title="Patrol Logs">
                    <IconButton> <Dataset fontSize='inherit' /> </IconButton>
                    </Tooltip>
                    <Tooltip title="Home">
                        <IconButton onClick={() => nav('/')}>
                            <Home />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '10vh', minWidth: '90%' }}>
                <Typography color="GrayText" sx={{ alignSelf: 'flex-start', mb: 2 }}>
                    Patrol Actions
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', p: 3, gap: 3, maxWidth: '70%' }}>
                        <Button variant="contained" color="inherit" disabled={onDuty}  onClick={handleStartPatrol}>
                            Activate Patrol
                        </Button>
                        <Button variant="contained" color="inherit" disabled={!onDuty}>
                            Pause Patrol
                        </Button>
                        <Button variant="contained" color="inherit" disabled={!onDuty} onClick={handleEndDialog}>
                            Stop Patrol
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10vh', minWidth: '90%' }}>
                <Typography color="GrayText" sx={{ alignSelf: 'flex-start', mb: 2 }}>
                    Subdivision Actions
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, minWidth: '70%',  }}>
                        {patrolConfig.departmentSelected?.Subdivisions?.length ? (
                            patrolConfig.departmentSelected.Subdivisions.map((sub: any) => (
                                <Accordion key={sub.Alias} sx={{ width: '100%' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography sx={{ flexGrow: 1 }}>{sub.Fullname}</Typography>
                                        <Typography sx={{ mr: '10px' }} color="GrayText">
                                            00:00:00
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails></AccordionDetails>
                                    <AccordionActions>
                                        <Button color="inherit">Start Patrol</Button>
                                        <Button color="inherit">Stop Patrol</Button>
                                        <Button color="inherit">Pause Patrol</Button>
                                    </AccordionActions>
                                </Accordion>
                            ))
                        ) : (
                            <Alert severity="error">No subdivisions found</Alert>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '10vh', minWidth: '90%' }}>
                <Typography color="GrayText" sx={{ alignSelf: 'flex-start', mb: 2 }}>
                    Manage Settings
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', p: 3, gap: 3, maxWidth: '70%' }}>
                      
                        <Typography>TBD</Typography>
                     </Box>
                </Box>
            </Box>

            <Dialog open={EndPatrolDialog} onClose={() => {setEndPatrolDialog(false)}}>
                <DialogTitle>Warning!</DialogTitle>
                <Typography sx={{p: '10px' , color: 'text.secondary'}}>Are you sure you want to stop patrol?</Typography>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleStopPatrol}>Yes</Button>
                    <Button color="success" variant="contained" onClick={() => {setEndPatrolDialog(false)}}>No</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={ () => {setSnackbarOpen(false)}}>
                <Alert sx={{minWidth: '30vw', color: 'white'}} severity={SnacbarSeverity} variant="filled">{SnacbarMessage}</Alert>
            </Snackbar>
        </Box>
    );
}