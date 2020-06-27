import { ModalTypes } from "../models";

export const IsModalReadonly = (modal : ModalTypes) => modal === ModalTypes.Remove || modal === ModalTypes.Read  || modal === ModalTypes.None 