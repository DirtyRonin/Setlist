import { IModal, ModalTypes } from ".";
import { ISong, ISongEntityActionProps, IEntityActionProps } from "..";

export interface IModalSong extends IModal {
    value : ISong
}

export type songModalActions = Record<keyof typeof ModalTypes, (props: IEntityActionProps) => void>