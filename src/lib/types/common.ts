
export interface T {
    [key: string]: any;
};

export interface StatisticModifier {
    _id: string;
    targetKey: string;
    modifier: number;
};

export enum Direction {
    ASC = 1,
    DESC = -1,
};

export enum ProductGender {
    MAN = "MAN",
    WOMAN = "WOMAN"
};

export enum ProductStatus {
    HOLD = "HOLD",
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    DELETE = "DELETE",
};