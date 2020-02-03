import React from "react";
import { render, within, act, waitForElement, fireEvent } from "@testing-library/react";

import App, { IAppProps } from "../App";

import { dndList } from "../models/DndListModels";
import { mockDndElSpacing, DND_DRAGGABLE_DATA_ATTR, makeDnd, DND_DIRECTION_DOWN } from "../testHelper/react-beautiful-dndTestUtilz";

const dummyInitialData: dndList = {
    songs: {
        "task-1": { id: "task-1", title: "Take out the garbage", artist: "ArtistName", mode: "C" },
        "task-2": { id: "task-2", title: "Watch my favorite show", artist: "ArtistName", mode: "C" },
        "task-3": { id: "task-3", title: "charge my phone", artist: "ArtistName", mode: "C" },
        "task-4": { id: "task-4", title: "Cook dinner", artist: "ArtistName", mode: "C" },
        "task-5": { id: "task-5", title: "Eaten", artist: "ArtistName", mode: "C" },
        "task-6": { id: "task-6", title: "Sleeping", artist: "ArtistName", mode: "C" }
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

const defaultProps: IAppProps = {
    InitialStateRequest: async () => Promise.resolve().then(result => dummyInitialData)
};
const defaultEmptyProps: IAppProps = {
    InitialStateRequest: async () =>
        Promise.resolve().then(result => {
            return { ...dummyInitialData, columnOrder: [] };
        })
};

const renderSetlist = async (defaultProps: IAppProps, props: Partial<IAppProps> = {}) => {
    const app = render(<App {...defaultProps} {...props} />);
    const waitForUseEffect = await waitForElement(() => app.getByTestId("DragDropContext"));
    return app;
};

const renderSetlistForMoving = async () => {
    const renderResult = await renderSetlist(defaultProps);

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
    it("should render 6 tasks in the expected order", async () => {
        const { getByTestId } = await renderSetlist(defaultProps);

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
        const { getByTestId } = await renderSetlist(defaultEmptyProps);

        const dndContext = getByTestId("DragDropContext");
        expect(dndContext.childElementCount).toBe(0);
    });

    it("should change the columnOrder when items have been moved", async () => {
        const taskTextContent = "Take out the garbage";
        const columnTextContent = "column-1";

        const { getByText, getByTestId, makeGetDragEl } = await renderSetlistForMoving();

        await makeDnd({
            getByText,
            getDragEl: makeGetDragEl(taskTextContent),
            direction: DND_DIRECTION_DOWN,
            positions: 2
        });

        const expectedOrder = ["Watch my favorite show", "charge my phone", "Take out the garbage", "Cook dinner", "Eaten", "Sleeping"];

        const { getAllByTestId: getAllByTestIdWithinColumn } = within(getByTestId(columnTextContent));
        const testTextOrderByTestId = createTestTextOrderByTestIdHelper(getAllByTestIdWithinColumn);
        testTextOrderByTestId("task-content", expectedOrder);
    });

    it("should add new song when button for song creating is clicked", async () => {
        const { getByTestId, getByText } = await renderSetlist(defaultProps);

        const firstColumn = getByTestId("column-1");

        const btn_AddNewSong = within(firstColumn).getByText("Add Song");
        fireEvent.click(btn_AddNewSong, { button: 0 });
        await waitForElement(() => getByText("Ehrenlos"));

        // get function for querying all tasks from with column
        const { getAllByTestId: getAllByTestIdWithinColumn } = within(firstColumn);

        // define expected order
        const expectedOrder = [
            "Take out the garbage",
            "Watch my favorite show",
            "charge my phone",
            "Cook dinner",
            "Eaten",
            "Sleeping",
            "Ehrenlos"
        ];

        const testTextOrderByTestId = createTestTextOrderByTestIdHelper(getAllByTestIdWithinColumn);
        testTextOrderByTestId("task-content", expectedOrder);

        const dndContext = getByTestId("DragDropContext");
        expect(dndContext.childElementCount).toBe(3);
    });
});
