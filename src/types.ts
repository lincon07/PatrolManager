import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
 // CommunityType is a type that defines the structure of the community object
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


// current User type

export interface CurrentUserType {
    Fullname: string;
    Email: string;
    isCompact: boolean;
}