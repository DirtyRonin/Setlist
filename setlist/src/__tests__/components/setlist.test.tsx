import React from "react";
import { render } from "@testing-library/react";

import Setlist, { ISetlistProps } from "../../components/setlist";
import SetlistColumn, { ISetlistColumnProps } from "../../components/setlistColumn";

import { dndList } from "../../models/DndListModels";

jest.mock("../../components/setlistColumn");

const dummyInitialData: dndList = {
    tasks: {
        "task-1": { id: "task-1", content: "Take out the garbage" },
        "task-2": { id: "task-2", content: "Watch my favorite show" },
        "task-3": { id: "task-3", content: "charge my phone" },
        "task-4": { id: "task-4", content: "Cook dinner" }
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do",
            taskIds: ["task-1", "task-2"]
        },
        "column-2": {
            id: "column-2",
            title: "To do",
            taskIds: ["task-3", "task-4"]
        },
        "column-3": {
            id: "column-3",
            title: "To do",
            taskIds: ["task-3", "task-4"]
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
};

const mockSetlistColumn = SetlistColumn as jest.MockedFunction<typeof SetlistColumn>;

beforeEach(() => {
    mockSetlistColumn.mockImplementation(
        (setlistColumnProps): JSX.Element => {
            return <div></div>;
        }
    );
});

afterEach(() => {
    mockSetlistColumn.mockReset();
});

describe("Setlist Function Test", () => {
    it("should call useState three times, once for each columnId in columnOrder", async () => {
        const mockSetlistColumn = SetlistColumn as jest.MockedFunction<typeof SetlistColumn>;
        mockSetlistColumn.mockImplementation(
            (setlistColumnProps: ISetlistColumnProps): JSX.Element => {
                return <div data-testid={setlistColumnProps.column.id}></div>;
            }
        );

        const renderSetlist = (props: Partial<ISetlistProps> = {}) => {
            const defaultProps: ISetlistProps = {
                ...dummyInitialData
            };

            return render(<Setlist {...defaultProps} {...props} />);
        };

        renderSetlist();

        const lastCalledArgs: ISetlistColumnProps = {
            column: {
                id: "column-3",
                title: "To do",
                taskIds: ["task-3", "task-4"]
            },
            tasks: [
                { id: "task-3", content: "charge my phone" },
                { id: "task-4", content: "Cook dinner" }
            ]
        };

        expect(mockSetlistColumn).lastCalledWith(lastCalledArgs,{});
        expect(mockSetlistColumn).toHaveBeenCalledTimes(3);
    });

    it("should never call useState, because columnOrder is empty", async () => {
        const renderSetlist = (props: Partial<ISetlistProps> = {}) => {
            const defaultProps: ISetlistProps = {
                ...dummyInitialData,
                columnOrder: []
            };
            console.log(defaultProps.columnOrder);
            return render(<Setlist {...defaultProps} {...props} />);
        };

        renderSetlist();
        expect(mockSetlistColumn).toHaveBeenCalledTimes(0);
    });
});
