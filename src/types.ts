import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface ServerType {
    Alias: string;
    Fullname: string;
}
export interface DeptType {
    Alias: string;
    Fullname: string;
    Icon: string;
    image: string;
}

export interface CommuntyType {
    Alias: string;
    Fullname: string;
    Departments: DeptType[];
    Servers: ServerType[];
}