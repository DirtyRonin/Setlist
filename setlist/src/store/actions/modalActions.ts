import { createAction } from "typesafe-actions";

import { IModalActionsProps } from "models";

const setModals = createAction(
    "SET_MODALS"
)<IModalActionsProps>();

export default { setModals }