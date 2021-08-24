import { createAction } from "typesafe-actions";

import { IModalActionsProps } from "models";

const setModal = createAction(
    "SET_MODALS"
)<IModalActionsProps>();

export default { setModal }