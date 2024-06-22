import { DataArray, Grade, LocationCity } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, Step, StepButton, StepContent, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { CommuntyType, DeptType, ServerType } from "../../types";

export default function ConfigLite(props: { community: any }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [departmentSelected, setDepartmentSelected] = React.useState<DeptType | null>({ Alias: '', Fullname: '', Icon: '', image: '' });
    const [serverSelected, setServerSelected] = React.useState<ServerType | null>(null);

    const handleStepper = (step: number) => {
        // Ensure the user can only move to the next step if the required information is selected
        if (step === 1 && departmentSelected === null) return;
        if (step === 2 && serverSelected === null) return;
        setActiveStep(step);
    };

    const handleDepartmentChange = (dept:any) => {
        console.log('dasdsa')
        console.log(dept);
    };

    const handleServerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setServerSelected(event.target.value as ServerType);
    };

    return (
        <div>
            <Stepper orientation="vertical" activeStep={activeStep}>
                <Step completed={departmentSelected !== null}>
                    <StepButton icon={<LocationCity />}>
                        <StepLabel>Department</StepLabel>
                    </StepButton>
                    <StepContent>
                        <FormControl sx={{ minWidth: '25vw' }} variant="standard">
                            <InputLabel>select</InputLabel>
                            <Select variant="standard" onChange={handleDepartmentChange} value={departmentSelected || 'Null'}>
                                {props.community.Departments.map((dept: any) => (
                                    <MenuItem key={dept.Alias} value={dept.Fullname}>
                                        {dept.Fullname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </StepContent>
                </Step>
                <Step completed={serverSelected !== null}>
                    <StepButton icon={<DataArray />} onClick={() => handleStepper(1)}>
                        <StepLabel>Server</StepLabel>
                    </StepButton>
                    <StepContent>
                        {/* Add server selection form here */}
                        <FormControl sx={{ minWidth: '25vw' }} variant="standard">
                            <InputLabel>select</InputLabel>
                            <Select variant="standard" onChange={() => {handleServerChange}} value={serverSelected || ''}>
                                {/* Replace with actual server data */}
                                {props.community.Servers.map((server: any) => (
                                    <MenuItem key={server.Alias} value={server.Alias}>
                                        {server.Fullname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton icon={<Grade />} onClick={() => handleStepper(2)}>
                        <StepLabel>Review and Patrol!</StepLabel>
                    </StepButton>
                </Step>
            </Stepper>
        </div>
    );
}
