import React from "react";

import { render, fireEvent, waitForElement } from "@testing-library/react";

import Setlist, { ISetlistProps } from "../../components/setlist";

// import {} from "../../../build/js/2.55af7ef1.chunk.js"

describe("Setlist Tests", () => {
    const path = "../../../build/js/2.55af7ef1.chunk.js";
    console.log(path);

    const rw = rewire("../../../build/js/2.55af7ef1.chunk.js");
    const ShouldBePeter = rw.__get__("ShouldBePeter");

    const result = ShouldBePeter("pEter");

    it("should just work", () => {
        return expect(result).toBe(true);
    });
});

// const renderSetlist = (props: Partial<ISetlistProps> = {}) => {
//     const defaultProps: ISetlistProps = {
//         tasks: {
//             "task-1": { id: "task-1", content: "Take out the garbage" },
//             "task-2": { id: "task-2", content: "Watch my favorite show" },
//             "task-3": { id: "task-3", content: "charge my phone" },
//             "task-4": { id: "task-4", content: "Cook dinner" }
//         },
//         columns: {
//             "column-1": {
//                 id: "column-1",
//                 title: "To do",
//                 taskIds: ["task-1", "task-2", "task-3", "task-4"]
//             }
//         },
//         columnOrder: ["column-1"]
//     };

//     return render(<Setlist {...defaultProps} {...props} />);
// };

// describe("<Setlist />", () => {
//     test("should find data-testid 'setlist-div'", async () => {
//         const { findByTestId } = renderSetlist();
//         const stuff = findByTestId("setlist-DragDropContext");
//     });
// });
