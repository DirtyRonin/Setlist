import { ModalTypes } from "../models";

export const IsModalReadonly = (modal: ModalTypes) => modal === ModalTypes.Remove || modal === ModalTypes.Read || modal === ModalTypes.None
export const IsCatalog = (modal: ModalTypes) => modal === ModalTypes.Add

export const GetModalTypeByString = (type: string): ModalTypes =>
    type !== undefined || type !== null ?
        type === `${ModalTypes.Read}` ? ModalTypes.Read :
            type === `${ModalTypes.Edit}` ? ModalTypes.Edit :
                type === `${ModalTypes.New}` ? ModalTypes.New :
                    type === `${ModalTypes.Remove}` ? ModalTypes.Remove :
                        type === `${ModalTypes.Add}` ? ModalTypes.Add :
                            type === `${ModalTypes.ShowCatalog}` ? ModalTypes.ShowCatalog :
                                ModalTypes.None :
        ModalTypes.None