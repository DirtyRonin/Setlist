import {library, Library} from "@fortawesome/fontawesome-svg-core"
import {faEdit,faEllipsisH} from "@fortawesome/free-solid-svg-icons"

export const initFontAwesomeLib = (): Library => {
    library.add(faEdit,faEllipsisH)

    return library
}