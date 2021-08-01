import { IModal, ModalTypes } from ".";
import { ISetlistSong, ISetlistSongEntityActionProps } from "..";

export interface IModalSetlistSong extends IModal {
    value: ISetlistSong
}

export type setlistSongModalActions = Record<keyof typeof ModalTypes, (props: ISetlistSongEntityActionProps) => void>