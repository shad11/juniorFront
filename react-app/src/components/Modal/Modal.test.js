import React from "react";
import Modal from "./index";
import { render, fireEvent } from "@testing-library/react";

const mockCloseFunc = jest.fn();
jest.mock("../Button", () => () => <button data-testid="test-close-btn" onClick={mockCloseFunc}>Close</button>);

const defaultProps = {
    header: 'Modal window',
    text: 'Hello',
};

describe('Testing Modal window', () => {
    test('Scope testing', () => {
        render(<Modal props={{}} />);
    });

    test('Test default props', () => {
        const { getByText } = render(<Modal props={{}} />);

        getByText(defaultProps.header);
        getByText(defaultProps.text);
    });

    test('Test text props', () => {
        const testProps = {
            header: 'Modal test header',
            text: 'Modal test text',
        };
        const { getByText } = render(<Modal {...testProps} />);

        getByText(testProps.header);
        getByText(testProps.text);
    });

    test('Test showing close button and closing', () => {
        const { getByTestId } = render(<Modal closeButton={true} />);
        const closeEl = getByTestId('test-close-btn');

        fireEvent.click(closeEl);

        expect(closeEl).not.toBeUndefined();
        expect(mockCloseFunc).toHaveBeenCalledTimes(1);
    });

    test('Test rendering without close button', () => {
        const { getByTestId } = render(<Modal closeButton={false} />);

        expect(() => getByTestId('test-close-btn')).toThrow();
    });

    test('Test closing when clicking outside modal window', () => {
        render(<Modal props={{}} />);

        fireEvent.click(window);
        expect(mockCloseFunc).toHaveBeenCalledTimes(1);
    });
});