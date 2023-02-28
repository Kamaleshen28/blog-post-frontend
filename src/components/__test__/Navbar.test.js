import { render } from "@testing-library/react";
import React from "react";
import Navbar from "../Navbar";

describe('Navbar', () => {
    it('should render correctly', ()=>{
        const {asFragment} = render(<Navbar />)
        expect(asFragment()).toMatchSnapshot();
    })
})