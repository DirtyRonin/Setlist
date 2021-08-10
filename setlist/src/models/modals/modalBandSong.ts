import { IModal, ModalTypes } from ".";
import { IBandSong, IBandSongEntityActionProps } from "..";

export interface IModalBandSong extends IModal {
    value : IBandSong
}

export type bandSongModalActions = Record<keyof typeof ModalTypes, (props: IBandSongEntityActionProps) => void>