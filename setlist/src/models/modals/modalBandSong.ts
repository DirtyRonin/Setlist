import { IModal, ModalTypes } from ".";
import { IEntityActionProps, IBandSong } from "..";

export interface IModalBandSong extends IModal {
    value : IBandSong
}

export type bandSongModalActions = Record<keyof typeof ModalTypes, (props: IEntityActionProps) => void>