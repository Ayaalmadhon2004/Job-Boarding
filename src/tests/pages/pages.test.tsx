import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import UserPage from '@/app/UserPage/page';
import EditPage from '@/app/UserPage/EditPage/page';
import Dashboard from '@/app/dashboard/page';
import About from '@/app/UI/About/page';
import Contact from '@/app/UI/Contact/page';
import "../../../jest.setup"

describe('Page Tests', () => {

  it('Home Page renders welcome text', () => {
    render(<Home />);
    expect(screen.getByText(/Dream job/i)).toBeInTheDocument();
  });

  it('User Page renders user details section', () => {
    render(<UserPage />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });

  it('Edit User Page renders form for editing', () => {
    render(<EditPage />);
    expect(screen.getByRole('form', { name: /Edit Profile Form/i })).toBeInTheDocument();
  });

  it('About Page renders about text', () => {
    render(<About />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('Contact Page renders contact form', () => {
    render(<Contact />);
    expect(screen.getByText(/^Contact Us$/i)).toBeInTheDocument();
  });

});
