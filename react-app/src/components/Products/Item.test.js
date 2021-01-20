import React from "react";
import Item from "./Item";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { decreaseCartCount, increaseCartCount } from "../../store/products/operations";

jest.mock("../../store/products/operations");
decreaseCartCount.mockReturnValue({
    type: 'DECREASE_CART_COUNT_TEST'
});
increaseCartCount.mockReturnValue({
    type: 'INCREASE_CART_COUNT_TEST'
});

jest.mock("../Icon", () => () => <div data-testid='icon'>Icon remove</div>);

const mockState = configureMockStore([]);
let testStore;
const testInitialProps = {
    id: 111,
    name: '111',
    price: 0
};

beforeEach(() => {
    testStore = mockState(null);
});

describe('Testing Item.js', () => {
    test('Scope test', () => {
        render(<Provider store={testStore}><Item {...testInitialProps} /></Provider>);
    });

    test('Required props', () => {
        const { getByText } = render(<Provider store={testStore}><Item {...testInitialProps} /></Provider>);

        getByText(testInitialProps.name);
    });

    test('Test only with icon star', () => {
        const props = {...testInitialProps, isCart: false};
        const { getAllByTestId } = render(<Provider store={testStore}><Item {...props} /></Provider>);

        expect(getAllByTestId('icon').length).toBe(1);
    });

    test('Test with icon star and remove', () => {
        const props = {...testInitialProps, isCart: true};
        const { getAllByTestId } = render(<Provider store={testStore}><Item {...props} /></Provider>);

        expect(getAllByTestId('icon').length).toBe(2);
    });

    test('Product to cart', () => {
        const showModalToCartTest = jest.fn();
        const props = {...testInitialProps, isCart: false, showModalToCart: showModalToCartTest};
        const { getByTestId } = render(<Provider store={testStore}><Item {...props} /></Provider>);

        fireEvent.click(getByTestId('modal-to-cart'));
        expect(showModalToCartTest).toHaveBeenCalledTimes(1);
    });

    test('Test increasing cart count', () => {
        const props = {...testInitialProps, isCart: true};
        const { getByTestId } = render(<Provider store={testStore}><Item {...props} /></Provider>);
        const increaseBtn = getByTestId('cart-increase');

        fireEvent.click(increaseBtn);
        expect(testStore.getActions().length).toBe(1);
    });

    test('Test decreasing cart count', () => {
        const props = {...testInitialProps, isCart: true};
        const { getByTestId } = render(<Provider store={testStore}><Item {...props} /></Provider>);
        const decreaseBtn = getByTestId('cart-decrease');

        fireEvent.click(decreaseBtn);
        expect(testStore.getActions().length).toBe(1);
    });
});