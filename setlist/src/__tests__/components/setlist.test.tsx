import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { render, within, RenderResult } from "@testing-library/react";

import Setlist, { ISetlistProps } from "../../components/setlist";

import { dndList } from "../../models/DndListModels";

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
        const renderSetlist = (props: Partial<ISetlistProps> = {}) => {
            const defaultProps: ISetlistProps = {
                ...dummyInitialData
            };

            return render(<Setlist {...defaultProps} {...props} />);
        };

        const { getByTestId } = renderSetlist();

        // get column by testId
        const { getAllByTestId: getAllByTestIdWithinColumn } = within(getByTestId("column-1"));

        // define expected order
        const expectedOrder = ["Take out the garbage", "Watch my favorite show", "charge my phone", "Cook dinner", "Eaten", "Sleeping"];

        const testTextOrderByTestId = createTestTextOrderByTestIdHelper(getAllByTestIdWithinColumn);
        testTextOrderByTestId("task-content", expectedOrder);

        const dndContext = getByTestId("DragDropContext");
        expect(dndContext.childElementCount).toBe(3)
    });

    it("div with data-testid should have no children", async () => {
        const renderSetlist = (props: Partial<ISetlistProps> = {}) => {
            const defaultProps: ISetlistProps = {
                ...dummyInitialData,
                columnOrder: []
            };
            return render(<Setlist {...defaultProps} {...props} />);
        };

        const { getByTestId } = renderSetlist();

        const dndContext = getByTestId("DragDropContext");
        expect(dndContext.childElementCount).toBe(0)
    });

    it("should change the columnOrder when items have been moved", async () => {
        // create dummy
        const renderSetlist = (props: Partial<ISetlistProps> = {}) => {
            const defaultProps: ISetlistProps = {
                ...dummyInitialData
            };

            return render(<Setlist {...defaultProps} {...props} />);
        };
    });
});
