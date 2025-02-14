import { SaveGroup } from "../enums/save.enum";



export interface Save {
    _id: string;
    saveGroup: SaveGroup;
    saveRefId: string;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface MeSaved {
    memberId: string;
    saveRefId: string;
    mySave: boolean;
}