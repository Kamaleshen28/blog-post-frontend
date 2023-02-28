
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import React from "react";
import Main from "../Main";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useNavigate } from "react-router-dom";

const mockData1 = [{
    "id":1,
    "date": "2nd Januray, 2018",
    "readingTime": "2 mins",
    "title": "The future of abstract art and the culture ...",
    "description": "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your...",
    "claps": 10,
    "liked": false,
    "image": "./abstract.png"
}]
const mockData = [{
    "id":1,
    "date": "2nd Januray, 2018",
    "readingTime": "2 mins",
    "title": "The future of abstract art and the culture ...",
    "description": "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your...",
    "claps": 10,
    "liked": false,
    "image": "./abstract.png"
},
{
    "id":2,
    "date": "2nd Januray, 2018",
    "readingTime": "2 mins",
    "title": "The future of abstract art and the culture ...",
    "description": "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your...",
    "claps": 10,
    "liked": false,
    "image": "./abstract.png"
}]

jest.mock('react-router-dom');

describe('Main', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should navigate to error page with error code when API call returns error code', async () => {
        const mock = new MockAdapter(axios);
        const navigateFn = jest.fn();
        useNavigate.mockReturnValue(navigateFn);
        
        jest.spyOn(axios, 'get').mockRejectedValue({message: 'lol'})
        render( <Main />)

        await waitFor(() => {
            expect(navigateFn).toBeCalledWith('/error/lol');
        })
    })

    it('should navigate to error page without error code when API call does not return error code', async () => {
        const mock = new MockAdapter(axios);
        const navigateFn = jest.fn();
        useNavigate.mockReturnValue(navigateFn);
        
        jest.spyOn(axios, 'get').mockRejectedValue({})
        render( <Main />)

        await waitFor(() => {
            expect(navigateFn).toBeCalledWith('/error');
        })
    })

    it('should render correctly when data is fetched', async () => {

        const mock = new MockAdapter(axios);
        jest.spyOn(axios, 'get').mockResolvedValue({data:mockData})
        // mock.onGet('http://localhost:8080/blog-posts').reply(200, mockData);
        const {asFragment} = render( <Main />)

        await waitFor(()=>{
            expect(screen.getAllByTestId('clap-btn')).toBeTruthy()
        })
        expect(screen.getByText('The Artifact')).toBeTruthy();
        expect(asFragment()).toMatchSnapshot();
    })

    it('should render the post correctly when data is fetched', async () => {
        const mock = new MockAdapter(axios);
        jest.spyOn(axios, 'get').mockResolvedValue({data:mockData})
        // mock.onGet('http://localhost:8080/blog-posts').reply(200, mockData);
        render( <Main />)

        await waitFor(()=>{
            expect(screen.getAllByTestId('heart-toggle')).toBeTruthy()
        })
        const likeButton = screen.getAllByTestId('heart-toggle');
        expect(likeButton).toHaveLength(2);
    })

    it('should flip heart when heart is clicked', async () => {
        const mock = new MockAdapter(axios);
        jest.spyOn(axios, 'get').mockResolvedValue({data:mockData1})
        // mock.onGet('http://localhost:8080/blog-posts').reply(200, mockData1);
        mock.onPut(`http://localhost:8080/blog-posts/${mockData1[0].id}`).reply(204);

        render( <Main />)

        await waitFor(()=>{
            expect(screen.getByTestId('heart-toggle')).toBeTruthy()
        })
        const likeButton = screen.getByTestId('heart-toggle');
        fireEvent.click(likeButton)
        expect(likeButton).toHaveAttribute('src', "./heart-red.svg");
    })
    it('should increase the count by 1 when clap icon is clicked', async () => {
        const mock = new MockAdapter(axios);
        jest.spyOn(axios, 'get').mockResolvedValue({data:mockData1})
        // mock.onGet('http://localhost:8080/blog-posts').reply(200, mockData1);
        mock.onPut(`http://localhost:8080/blog-posts/${mockData1[0].id}`).reply(204);

        render( <Main />)
        await waitFor(()=>{
            expect(screen.getByTestId('clap-btn')).toBeTruthy()
        })
        await waitFor(()=>{
            expect(screen.getByTestId('clap-count')).toBeTruthy()
        })
        const clapIcon = screen.getByTestId('clap-btn');
        const clapCountElement = screen.getByTestId('clap-count');
        const prevCount = Number(clapCountElement.textContent);
        fireEvent.click(clapIcon)
        const currCount = Number(clapCountElement.textContent);

        expect(currCount).toEqual(prevCount+1);
    })
   
})