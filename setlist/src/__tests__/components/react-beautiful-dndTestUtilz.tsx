import "@testing-library/jest-dom/extend-expect";
import { fireEvent, waitForElement, RenderResult, GetByText, Matcher, SelectorMatcherOptions } from "@testing-library/react";

const noSpacing = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

const getComputedSpacing = ({ margin = noSpacing, padding = noSpacing, border = noSpacing, display = "block" }) => ({
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
    marginTop: `${margin.top}px`,
    marginRight: `${margin.right}px`,
    marginBottom: `${margin.bottom}px`,
    marginLeft: `${margin.left}px`,
    borderTopWidth: `${border.top}px`,
    borderRightWidth: `${border.right}px`,
    borderBottomWidth: `${border.bottom}px`,
    borderLeftWidth: `${border.left}px`,
    display
});

export const mockGetComputedSpacing = () =>
    jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({
        ...({} as CSSStyleDeclaration),
        ...getComputedSpacing({})
    }));

const mockGetBoundingClientRect = (el: Element) =>
    jest.spyOn(el, "getBoundingClientRect").mockImplementation(() => ({
        ...({} as DOMRect),
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        center: { x: 0, y: 0 }
    }));

/*
  promise util
*/
const executeAsyncFnsSerially = (fns: (() => Promise<void>)[]) =>
    fns.reduce(
        (promise, fn) =>
            promise.then(result => {
                fn().then(Array.prototype.concat.bind(result));
            }),
        new Promise<void>((resolve, reject) => resolve())
    );

/*
  react-beautiful-dnd utils
*/
// used for lookups
const DND_DROPPABLE_DATA_ATTR = "[data-rbd-droppable-id]";
export const DND_DRAGGABLE_DATA_ATTR = "[data-rbd-draggable-id]";

export const mockDndElSpacing = (rtlUtils: RenderResult) => {
    const droppables = rtlUtils.container.querySelectorAll(DND_DROPPABLE_DATA_ATTR);
    droppables.forEach(dropEl => {
        mockGetBoundingClientRect(dropEl);
        const draggables = dropEl.querySelectorAll(DND_DRAGGABLE_DATA_ATTR);
        draggables.forEach(dragEl => {
            mockGetBoundingClientRect(dragEl);
        });
    });
};

export const DND_DIRECTION_LEFT = "DND_DIRECTION_LEFT";
export const DND_DIRECTION_UP = "DND_DIRECTION_UP";
export const DND_DIRECTION_RIGHT = "DND_DIRECTION_RIGHT";
export const DND_DIRECTION_DOWN = "DND_DIRECTION_DOWN";

export interface makeDndProps {
    getByText: (text: Matcher, options?: SelectorMatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement;
    getDragEl: () => HTMLElement | null;
    direction: string;
    positions: number;
}

export const makeDnd = async (props: makeDndProps) => {
    const spaceKey = { keyCode: 32 };
    const tab = {keyCode: 9 }
    const arrowLeftKey = { keyCode: 37 };
    const arrowUpKey = { keyCode: 38 };
    const arrowRightKey = { keyCode: 39 };
    const arrowDownKey = { keyCode: 40 };
    const getKeyForDirection = () => {
        switch (props.direction) {
            case DND_DIRECTION_LEFT:
                return arrowLeftKey;
            case DND_DIRECTION_UP:
                return arrowUpKey;
            case DND_DIRECTION_RIGHT:
                return arrowRightKey;
            case DND_DIRECTION_DOWN:
                return arrowDownKey;
            default:
                throw new Error("Unhandled `direction`!");
        }
    };
    const handleMovementInDirection = async () => {
        console.log("run promise")
        fireEvent.keyDown(props.getDragEl()!,tab);
        // enable keyboard dragging
        fireEvent.keyDown(props.getDragEl()!, spaceKey);
        await waitForElement(() => props.getByText(/You have lifted an item/i));
        // move drag element based on direction
        fireEvent.keyDown(props.getDragEl()!, getKeyForDirection());
        await waitForElement(() => props.getByText(/You have moved the item/i));
        // disable keyboard dragging
        fireEvent.keyDown(props.getDragEl()!, spaceKey);
        await waitForElement(() => props.getByText(/You have dropped the item/i));
    };

    const movements: Array<() => Promise<void>> = [];
    if (props.getDragEl()) {
        // focus drag element
        (props.getDragEl()as HTMLElement).focus();
        expect(props.getDragEl()).toHaveFocus();

        // move drag element based on direction and positions

        for (let i = 0; i < props.positions; i += 1) {
            movements.push(handleMovementInDirection);
        }
    }
    await executeAsyncFnsSerially(movements);
};
