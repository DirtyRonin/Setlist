
import {fizzBuzz, greetings} from "../../components/example"
import {mocked} from 'ts-jest/utils'
import { greetingsWrapper } from "../../components/differentExample";

describe("mock greetings Function Test", () => {

beforeEach( () => {
    jest.mock("../../components/example")
})

    it("should just work", () => {
        mocked(greetings).mockImplementation((name:string)=> 'peter');

        const result = greetingsWrapper('peter');
        expect(greetings).toBeCalled();
    });
});


describe("fizzBuzz Function Test", () => {

    
    const result = fizzBuzz(2);

    it("should just work", () => {
        return expect(result).toBe('1 2 ');
    });
});

describe("greetings Function Test", () => {

    const result = greetings('peter');

    it("should just work", () => { 
        return expect(result).toBe('Hi peter');
    });
});

describe("greetingsWrapper Function Test", () => {

    const result = greetingsWrapper('peter');

    it("should just work", () => {
        return expect(result).toBe('Hi peter');
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
