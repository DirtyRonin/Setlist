//query: "?$type=Read&$id=80968fa2-312c-469f-9115-619d2fef06d5"

import { ModalTypes } from "models"
import validator from "validator"
import { GetModalTypeByString } from "./modalTypesHelper"

export const mapQuery = (query: String): { type: ModalTypes; id: number; bandId: number; songId: number, setlistId: number, customEventId: number } => {
    const args = query.substring(2).split('&$').reduce((map, querySegment) => {
        const props = querySegment.split('=')
        map.set(props[0], props[1])
        return map
    }, new Map<string, string>())

    const getValue = (key: string) => args.get(key) ?? ''
    const getId = (key: string) => validator.isNumeric(getValue(key)) ? +getValue(key) : 0

    return {
        id: getId('id'),
        type: GetModalTypeByString(getValue('type')),
        bandId: getId('bandId'),
        songId: getId('songId'),
        setlistId: getId('setlistId'),
        customEventId: getId('customEventId')
    }
}





