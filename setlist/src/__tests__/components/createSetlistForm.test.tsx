import React from "react";
import { render, within, waitForElement, fireEvent, act, getByLabelText, queryByAttribute } from "@testing-library/react";

import CreateSetlist, { ICreateSetlistProps } from "../../components/createSetlistForm"
import { CreateSetlistHtmlAttributesConfiguration } from "../../Configuration";
import { IApiBandlist } from "../../models/";

const htmlConfig = CreateSetlistHtmlAttributesConfiguration;

const mockCreateBandAsync = jest.fn().mockResolvedValue({})
const mockAddBandToState = jest.fn()

const props: ICreateSetlistProps = {
    IsBandListNeeded: true,
    CreateBandAsync: (setlist: IApiBandlist): Promise<IApiBandlist> => Promise.resolve({ ...setlist, id: "newId" }),
    AddBandToState: (setlist: IApiBandlist): void => { }
}

const renderCreateSetlistForm = async (defaultprops: ICreateSetlistProps, props: Partial<ICreateSetlistProps> = {}) =>
    render(<CreateSetlist {...defaultprops} {...props} />)

describe("Test create setlist form", () => {

    beforeEach(() => {
        mockCreateBandAsync.mockClear();
        mockAddBandToState.mockClear();
    })

    it("Should show the setlistname input when ismajorLibrary is true", async () => {
        const { asFragment } = await renderCreateSetlistForm(props);
        expect(asFragment()).toMatchSnapshot();
    })

    it("Should call the async create setlist function with expectedParams when ismajorlibrary is true", async () => {

        const newProps: ICreateSetlistProps = {
            ...props,
            CreateBandAsync: mockCreateBandAsync
        }

        const { getByPlaceholderText, getByText } = await renderCreateSetlistForm(newProps);

        //enter name
        const nameInput = getByPlaceholderText(htmlConfig.MajorLibraryNameInput.Placeholder)
        act(() => { fireEvent.change(nameInput, { target: { value: "Major Lazor" } }); })
        await waitForElement(() => getByPlaceholderText(htmlConfig.MajorLibraryNameInput.Placeholder));

        //push create button
        const createMajorLibrary = getByText(htmlConfig.CreateMajorLibraryButton.label)
        act(() => { fireEvent.click(createMajorLibrary); })
        await waitForElement(() => getByText(htmlConfig.CreateMajorLibraryButton.label));

        const expectedParams: IApiBandlist = {
            id: "",
            title: "Major Lazor",
            bandsongs: []
        }

        expect(mockCreateBandAsync).toHaveBeenCalledWith(expectedParams);
    })

    it("Should call the add setlist to state function with expectedParams when ismajorlibrary is true", async () => {

        const newProps: ICreateSetlistProps = {
            ...props,
            AddBandToState: mockAddBandToState
        }

        const { getByPlaceholderText, getByText } = await renderCreateSetlistForm(newProps);

        //enter name
        const nameInput = getByPlaceholderText(htmlConfig.MajorLibraryNameInput.Placeholder)
        act(() => { fireEvent.change(nameInput, { target: { value: "Major Lazor" } }); })
        await waitForElement(() => getByPlaceholderText(htmlConfig.MajorLibraryNameInput.Placeholder));

        //push create button
        const createMajorLibrary = getByText(htmlConfig.CreateMajorLibraryButton.label)
        act(() => { fireEvent.click(createMajorLibrary); })
        await waitForElement(() => getByText(htmlConfig.CreateMajorLibraryButton.label));

        const expectedParams: IApiBandlist = {
            id: "newId",
            title: "Major Lazor",
            bandsongs: []
        }

        expect(mockAddBandToState).toHaveBeenCalledWith(expectedParams);
    })

    it("Should show the setlistname input and the libraray checkbox when ismajorLibrary is false", async () => {
        const newProps: ICreateSetlistProps = {
            ...props,
            IsBandListNeeded: false
        }

        const { asFragment } = await renderCreateSetlistForm(newProps);
        expect(asFragment()).toMatchSnapshot();
    })

    it("Should call the async create setlist function with expectedParams when ismajorlibrary is false", async () => {

        const newProps: ICreateSetlistProps = {
            ...props,
            IsBandListNeeded: false,
            CreateBandAsync: mockCreateBandAsync
        }

        const { getByPlaceholderText, getByText } = await renderCreateSetlistForm(newProps);
        //enter name
        const nameInput = getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder)
        act(() => { fireEvent.change(nameInput, { target: { value: "Rock Classics" } }); })
        await waitForElement(() => getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder));

        //push create button
        const createMajorLibrary = getByText(htmlConfig.CreateSetlistButton.label)
        act(() => { fireEvent.click(createMajorLibrary); })
        await waitForElement(() => getByText(htmlConfig.CreateSetlistButton.label));

        const expectedParams: IApiBandlist = {
            id: "",
            title: "Rock Classics",
            bandsongs: []
        }

        expect(mockCreateBandAsync).toHaveBeenCalledWith(expectedParams);
    })
    it("Should call the async create setlist function as a library with expectedParams when ismajorlibrary is false", async () => {

        const newProps: ICreateSetlistProps = {
            ...props,
            IsBandListNeeded: false,
            CreateBandAsync: mockCreateBandAsync
        }

        const {getByPlaceholderText,getByLabelText,getByText} = await renderCreateSetlistForm(newProps);
        //enter name
        const nameInput = getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder)
        act(() => { fireEvent.change(nameInput, { target: { value: "Rock Classics" } }); })
        await waitForElement(() => getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder));

        //toggle is library to true
        const isLibraryCheckbox = getByLabelText(htmlConfig.IsLibraryCheckbox.label)
        act(() => { fireEvent.click (isLibraryCheckbox); })
        await waitForElement(() => getByLabelText(htmlConfig.IsLibraryCheckbox.label));
       
        //push create button
        const createMajorLibrary = getByText(htmlConfig.CreateSetlistButton.label)
        act(() => { fireEvent.click(createMajorLibrary); })
        await waitForElement(() => getByText(htmlConfig.CreateSetlistButton.label));

        const expectedParams: IApiBandlist = {
            id: "",
            title: "Rock Classics",
            bandsongs: []
        }

        expect(mockCreateBandAsync).toHaveBeenCalledWith(expectedParams);
    })

    it("Should call the add setlist to state function with expectedParams when ismajorlibrary is false", async () => {
        const newProps: ICreateSetlistProps = {
            ...props,
            IsBandListNeeded: false,
            AddBandToState: mockAddBandToState
        }

        const { getByPlaceholderText, getByText } = await renderCreateSetlistForm(newProps);
        //enter name
        const nameInput = getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder)
        act(() => { fireEvent.change(nameInput, { target: { value: "Rock Classics" } }); })
        await waitForElement(() => getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder));

        //push create button
        const createMajorLibrary = getByText(htmlConfig.CreateSetlistButton.label)
        act(() => { fireEvent.click(createMajorLibrary); })
        await waitForElement(() => getByText(htmlConfig.CreateSetlistButton.label));

        const expectedParams: IApiBandlist = {
            id: "newId",
            title: "Rock Classics",
            bandsongs: []
        }

        expect(mockAddBandToState).toHaveBeenCalledWith(expectedParams);
    })

    it("Should call the add setlist to state function as a library with expectedParams when ismajorlibrary is false", async () => {
        const newProps: ICreateSetlistProps = {
            ...props,
            IsBandListNeeded: false,
            AddBandToState: mockAddBandToState
        }

        const { getByPlaceholderText, getByText ,getByLabelText} = await renderCreateSetlistForm(newProps);
        //enter name
        const nameInput = getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder)
        act(() => { fireEvent.change(nameInput, { target: { value: "Rock Classics" } }); })
        await waitForElement(() => getByPlaceholderText(htmlConfig.SetlistNameInput.Placeholder));

         //toggle is library to true
         const isLibraryCheckbox = getByLabelText(htmlConfig.IsLibraryCheckbox.label)
         act(() => { fireEvent.click (isLibraryCheckbox); })
         await waitForElement(() => getByLabelText(htmlConfig.IsLibraryCheckbox.label));

        //push create button
        const createMajorLibrary = getByText(htmlConfig.CreateSetlistButton.label)
        act(() => { fireEvent.click(createMajorLibrary); })
        await waitForElement(() => getByText(htmlConfig.CreateSetlistButton.label));

        const expectedParams: IApiBandlist = {
            id: "newId",
            title: "Rock Classics",
            bandsongs: []
        }

        expect(mockAddBandToState).toHaveBeenCalledWith(expectedParams);
    })

})