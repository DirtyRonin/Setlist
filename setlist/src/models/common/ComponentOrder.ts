import { IModal, Catalog } from "..";

export interface IComponentOrder {
    id: string;
    displayIn: DisplayIn;
    value: IModal | Catalog
}

export type DisplayIn = "Main" | "Modal"
export const DisplayIn: Record<DisplayIn, DisplayIn> = {
    Main: "Main",
    Modal: "Modal"
}

export interface INotification {
    message: string,
    dismissed: boolean,
    key:string,
    options: {
        key: string,
        variant: string,
        action: (key: string) => JSX.Element,
    }
}



