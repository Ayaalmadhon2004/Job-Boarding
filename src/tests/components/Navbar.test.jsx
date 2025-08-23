import Navbar from '@/app/UI/Navbar/Navbar';
import { render , screen } from '@testing-library/react';
import "@testing-library/jest-dom"; //to add matchers to add additional functions 
jest.mock("next/navigation"); // mock next/navigation to mock useRouter 


describe('Navbar Component',()=>{
    it('renders navigation Links',()=>{
        render(<Navbar/>); //render from testing library to show react component
        expect(screen.getByText(/Home/i)).toBeInTheDocument(); // screen to search on react components
        expect(screen.getByText(/About/i)).toBeInTheDocument(); //i case insensitive 
        expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    })
})