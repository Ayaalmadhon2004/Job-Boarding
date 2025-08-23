import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplyButton from '@/app/UI/ApplyButton/ApplyButton';
jest.mock("next/navigation");


describe('ApplyButton Component', () => {
  it('renders button', () => {
    render(<ApplyButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('fires click event', async () => {
    const user = userEvent.setup(); //setup using instead of click (better in async) to prepare user not do anything 
    const mockClick = jest.fn();
    render(<button onClick={mockClick}>Apply</button>);
    await user.click(screen.getByText(/Apply/i)); 
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
