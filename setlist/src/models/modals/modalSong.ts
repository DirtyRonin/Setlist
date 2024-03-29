import { IModal, ModalTypes } from ".";
import { ISong, ISongEntityActionProps } from "..";

export interface IModalSong extends IModal {
    value: ISong
}

// export type SongModalTypes = ModalTypes | "Add"
// export const SongModalTypes = { ...ModalTypes, Add: "Add" as const }

export type songModalActions = Record<ModalTypes, (props: ISongEntityActionProps) => void>