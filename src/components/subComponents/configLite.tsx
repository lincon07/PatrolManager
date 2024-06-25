import { BadgeRounded, DataArray, Dns, Error, Grade, Grading, LocalFireDepartment, LocalPolice, LocationCity, People, Storage } from "@mui/icons-material";
import { Button, FormControl, Icon, InputLabel, MenuItem, Select, Step, StepButton, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { useEffect } from "react";
import { CommuntyType, DeptType, ServerType } from "../../types";
import { useNavigate } from "react-router-dom";

export default function ConfigLite(props: { community: CommuntyType }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [departmentSelected, setDepartmentSelected] = React.useState<DeptType | null>(null);
    const [serverSelected, setServerSelected] = React.useState<ServerType | null>(null);
    const nav = useNavigate();
    const handleStepper = (step: number) => {
        // Ensure the user can only move to the next step if the required information is selected
        if (step === 1 && departmentSelected === null) return;
        if (step === 2 && serverSelected === null) return;
        setActiveStep(step);
    };

    const handleDepartmentChange = (dept: DeptType) => {
        setDepartmentSelected(dept);
    };

    const handleServerChange = (server: ServerType) => {
        setServerSelected(server);
    };

    // Deparment Icon switch case 
    const departmentIcon = (icon: string) => {
        switch (icon) {
            case 'LEO':
                return <LocalPolice fontSize="medium" />;
            case 'Fire':
                return <LocalFireDepartment fontSize="medium" />;
            case 'DoC':
                return <BadgeRounded fontSize="medium" />;
            case 'CIV':
                return <People fontSize="medium" />;
            default:
                return <Error fontSize="medium" />;
        }
    };

    // Start Patrol
    const handleStartPatrol = () => {
        sessionStorage.setItem('patrolConfig', JSON.stringify({ departmentSelected, serverSelected }));
        nav('/patrol');
    }
    return (
        <div>
            <Stepper orientation="vertical" activeStep={activeStep}>
                <Step completed={departmentSelected !== null}>
                    <StepButton onClick={() => handleStepper(0)} icon={<LocationCity />}>
                        <StepLabel>Department</StepLabel>
                    </StepButton>
                    <StepContent>
                        <FormControl sx={{ minWidth: '25vw' }} variant="standard">
                            <InputLabel>select</InputLabel>
                            <Select
                                variant="standard"
                                value={departmentSelected?.Alias || ''}
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <em>Select department</em>;
                                    }
                                    const selectedDept = props.community.Departments.find((dept: any) => dept.Alias === selected);
                                    return selectedDept?.Fullname || '';
                                }}
                            >
                                {props.community.Departments.map((dept: any) => (
                                    <MenuItem key={dept.Alias} value={dept.Alias} onClick={() => handleDepartmentChange(dept)}>
                                        <Icon sx={{ mr: '10px' }}>{departmentIcon(dept.Icon)}</Icon>
                                        {dept.Fullname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </StepContent>
                </Step>
                <Step completed={serverSelected !== null}>
                    <StepButton onClick={() => handleStepper(1)} icon={<Storage />} disabled={departmentSelected === null}>
                        <StepLabel>Server</StepLabel>
                    </StepButton>
                    <StepContent>
                        <FormControl sx={{ minWidth: '25vw' }} variant="standard">
                            <InputLabel>select</InputLabel>
                            <Select
                                variant="standard"
                                value={serverSelected?.Alias || ''}
                                onChange={(event) => {
                                    const selectedServer = props.community.Servers.find((server: any) => server.Alias === event.target.value);
                                    handleServerChange(selectedServer);
                                }}
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <em>Select server</em>;
                                    }
                                    const selectedServer = props.community.Servers.find((server: any) => server.Alias === selected);
                                    return selectedServer?.Fullname || '';
                                }}
                            >
                                {props.community.Servers.map((server: any) => (
                                    <MenuItem key={server.Alias} value={server.Alias}>
                                        <Icon sx={{ mr: '10px' }}> <Dns /> </Icon> {server.Fullname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onClick={() => handleStepper(2)} icon={<Grading />} disabled={serverSelected === null}>
                        <StepLabel>Review and Patrol!</StepLabel>
                    </StepButton>
                    <StepContent>
                        <Button color="success" onClick={handleStartPatrol}>Patrol!</Button>
                    </StepContent>
                </Step>
            </Stepper>
        </div>
    );
}
