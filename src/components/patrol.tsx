import { ListAlt } from "@mui/icons-material";
import { AppBar, Button, Divider, List, ListItem, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Patrol() {  
    const patrolConfg = JSON.parse(sessionStorage.getItem('patrolConfig') || '{}');
    return (
        <div>
           <AppBar>
                <Toolbar>
                    <Typography>{patrolConfg.Alias} Manager</Typography>
                </Toolbar>
           </AppBar>

           <List>
                    <ListItem  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center' , alignItems: 'center' , width: '100vw', marginTop: '5vh'}}>
                        <Button color="inherit" variant="contained">Start Patrol</Button>
                        <Button color="inherit" variant="contained" disabled>Stop Patrol</Button>
                        <Button color="inherit" variant="contained" disabled>Pause Patrol</Button>
                    </ListItem>
            </List>
      
       


        </div>
    );
}