import { Button, Card, CardActions, CardContent, CardMedia, Icon, Typography } from "@mui/material";
import React from "react";
import { CommuntyType } from "../../types";

export default function Config(props: { community: CommuntyType }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
                props.community.Departments.map((dept: any) => (
                    <Card key={dept.Alias} style={{ margin: 10 , maxWidth: '20vw' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={dept.image}  // Assuming dept.image contains the image URL
                            alt={dept.Fullname}
                        />
                        <CardContent>
                            <Typography color={'text.secondary'}>{dept.Fullname}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">Patrol!</Button>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    );
}
