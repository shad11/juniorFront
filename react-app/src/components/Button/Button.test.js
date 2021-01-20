import React from "react";
import Button from "./index";
import { render, fireEvent } from "@testing-library/react";

describe('Testing Button.js', () => {
    test('Scope testing', () => {
        render(<Button text="Test button" onClick={() => {}}/>);
    });

    test('Testing values', () => {
        const testProps = {
            text: 'Button',
        };

        const { getByText } = render(<Button {...testProps}/>);
        getByText(/Button/i);
    });

    test('Testing click', () => {
        const testFn = jest.fn();
        const { getByText } = render(<Button text="Test button" onClick={testFn}/>);
        const buttonEl = getByText(/Test button/i);

        fireEvent.click(buttonEl);
        expect(testFn).toHaveBeenCalled();
        expect(testFn).toHaveBeenCalledTimes(1);
    })
});