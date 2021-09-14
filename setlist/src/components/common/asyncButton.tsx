import React, { useState } from "react"
import { Button } from "react-bootstrap"

export type ButtonState = 'INITIAL' | 'SUCCESS' | 'Already Existing'
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
        if (buttonState !== 'REQUEST' && buttonState !== 'SUCCESS' && buttonState !== 'Already Existing') {
            setButtonState('REQUEST')

            asyncExecute(value)
                .then(
                    (result) => {
                        setButtonState('SUCCESS')
                    }
                )
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

export default AsyncButtonComponent