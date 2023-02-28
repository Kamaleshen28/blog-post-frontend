import { render } from "@testing-library/react";
import React from "react";
import Footer from "../Footer";

describe('Footer', ()=> {
    it('should render correctly', () => {
        const {asFragment} = render(<Footer />)
        expect(asFragment()).toMatchSnapshot();
    })
})