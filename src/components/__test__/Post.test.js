import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Post from "../Post";

const mockData = {
    "date": "2nd Januray, 2018",
    "readingTime": "2 mins",
    "title": "The future of abstract art and the culture ...",
    "description": "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your...",
    "claps": 10,
    "liked": false,  
    "image": "./abstract.png"
}
const handleClickClap = jest.fn();
const handleClickHeart = jest.fn();
// Just check whether the function is called once or not

describe('Post', () => {

    it('should render the post correctly', async() => {
        const {asFragment} = render(<Post data={mockData} handleClickClap={handleClickClap} handleClickHeart={handleClickHeart}/>)
        expect(screen.getByText('2nd Januray, 2018')).toBeTruthy();
        expect(asFragment()).toMatchSnapshot();
    })
    it('should call handleClickHeart when heart is clicked', ()=>{
        render(<Post data={mockData} handleClickClap={handleClickClap} handleClickHeart={handleClickHeart} />);
        const likeButton = screen.queryByTestId('heart-toggle');
        fireEvent.click(likeButton);
        expect(handleClickHeart).toHaveBeenCalled()
    })
    it('should call handleClickClap when the clap icon is clicked', ()=>{
        render(<Post data={mockData} handleClickClap={handleClickClap} handleClickHeart={handleClickHeart} />);
        const likeButton = screen.queryByTestId('clap-btn');
        fireEvent.click(likeButton);
        expect(handleClickClap).toHaveBeenCalled()
    })
})