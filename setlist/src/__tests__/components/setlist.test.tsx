import React from "react";
import { render, within } from "@testing-library/react";

import Setlist, { ISetlistProps } from "../../components/setlist";

import { dndList } from "../../models/DndListModels";
import { mockDndElSpacing, DND_DRAGGABLE_DATA_ATTR, makeDnd, DND_DIRECTION_DOWN, DND_DIRECTION_UP } from "./react-beautiful-dndTestUtilz";

const dummyInitialData: dndList = {
    tasks: {
        "task-1": { id: "task-1", content: "Take out the garbage" },
        "task-2": { id: "task-2", content: "Watch my favorite show" },
        "task-3": { id: "task-3", content: "charge my phone" },
        "task-4": { id: "task-4", content: "Cook dinner" },
        "task-5": { id: "task-5", content: "Eaten" },
        "task-6": { id: "task-6", content: "Sleeping" }
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do first",
            taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6"]
        },
        "column-2": {
            id: "column-2",
            title: "To do second",
            taskIds: []
        },
        "column-3": {
            id: "column-3",
            title: "To do last",
            taskIds: []
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
};

const defaultProps: ISetlistProps = {
    ...dummyInitialData
};

const renderSetlist = (defaultProps: ISetlistProps, props: Partial<ISetlistProps> = {}) => {
    return render(<Setlist {...defaultProps} {...props} />);
};

const renderSetlistForMoving = () => {
    const renderResult = renderSetlist(defaultProps);

    mockDndElSpacing(renderResult);

    const makeGetDragEl = (text: string) => () => renderResult.getByText(text).closest(DND_DRAGGABLE_DATA_ATTR) as HTMLElement;
    

    
    return { makeGetDragEl, ...renderResult };
};

//fetch all elements with the given testIds, get the textContent as a string[] from html and compare them with the expectedTexts
const createTestTextOrderByTestIdHelper = (
    getAllByTestId: (
        text: any,
        options?: any,
        waitForElementOptions?: any
    ) => HTMLElement | HTMLElement[] | Promise<HTMLElement> | Promise<HTMLElement[]> | Error | null
) => (testId: string, expectedTexts: string[]) => {
    const texts = (getAllByTestId(testId)! as HTMLElement[]).map(element => element.textContent);
    expect(texts).toEqual(expectedTexts);
};

describe("Setlist Function Test", () => {
    /* it("should render 6 tasks in the expected order", async () => {
        const { getByTestId } = renderSetlist(defaultProps);

        // get function for querying all tasks from with column
        const { getAllByTestId: getAllByTestIdWithinColumn } = within(getByTestId("column-1"));

        // define expected order
        const expectedOrder = ["Take out the garbage", "Watch my favorite show", "charge my phone", "Cook dinner", "Eaten", "Sleeping"];

        const testTextOrderByTestId = createTestTextOrderByTestIdHelper(getAllByTestIdWithinColumn);
        testTextOrderByTestId("task-content", expectedOrder);

        const dndContext = getByTestId("DragDropContext");
        expect(dndContext.childElementCount).toBe(3);
    });

    it("div with data-testid should have no children", async () => {
        const { getByTestId } = renderSetlist({ ...{ ...defaultProps, columnOrder: [] } });

        const dndContext = getByTestId("DragDropContext");
        expect(dndContext.childElementCount).toBe(0);
    }); */

    it("should change the columnOrder when items have been moved", async () => {
        //trigger function

        const taskTextContent = "Take out the garbage";
        const columnTextContent = "column-1";

        const { getByText, getByTestId, makeGetDragEl } = renderSetlistForMoving();

        await makeDnd({
            getByText,
            getDragEl: makeGetDragEl(taskTextContent),
            direction: DND_DIRECTION_UP,
            positions: 3
        });

        const expectedOrder = ["Watch my favorite show", "charge my phone", "Take out the garbage", "Cook dinner", "Eaten", "Sleeping"];

        const { getAllByTestId: getAllByTestIdWithinColumn } = within(getByTestId(columnTextContent));
        const testTextOrderByTestId = createTestTextOrderByTestIdHelper(getAllByTestIdWithinColumn);
        testTextOrderByTestId("task-content", expectedOrder);
    });
});
