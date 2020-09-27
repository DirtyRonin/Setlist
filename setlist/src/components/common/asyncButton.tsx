import React, { useState } from "react"
import { Button } from "react-bootstrap"

export type ButtonState = 'INITIAL' | 'SUCCESS'
type ButtonActionStates = ButtonState | 'REQUEST' | 'FAILURE' | 'CANCEL'

export interface IAsyncButtonProps<T> {
    asyncExecute(value: T): Promise<T>
    value: T
    defaultState: ButtonState
}

export const AsyncButtonComponent = <T extends {}>(props: IAsyncButtonProps<T>) => {

    const { asyncExecute, value, defaultState } = props

    const [buttonState, setButtonState] = useState<ButtonActionStates>(defaultState)

    const handleOnClick = () => {
        if (buttonState !== 'REQUEST' && buttonState !== 'SUCCESS') {
            setButtonState('REQUEST')

            asyncExecute(value)
                .then(
                    () => setButtonState('SUCCESS'))
                .catch(
                    (e) => {
                        console.log(e)
                        setButtonState('FAILURE')
                    })


        }

    }

    return <div>
        <Button onClick={handleOnClick}>{buttonState.toString()}</Button>
    </div>

}