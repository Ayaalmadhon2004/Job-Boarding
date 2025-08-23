import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../../app/job/Bookmark/page";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(); // i am using prototype to inherit all properties in storage
  Storage.prototype.setItem = jest.fn();
});

test("shows empty cart message when no items", () => {
  Storage.prototype.getItem.mockReturnValueOnce(null); 
  render(<CartPage />);
  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
});

test("renders cart items from localStorage", () => {
  const mockCart = [
    { id: 1, title: "Job 1", type: "Full-time", createdAt: "2025-08-20T00:00:00Z" },
    { id: 2, title: "Job 2", type: "Part-time", createdAt: "2025-08-21T00:00:00Z" }
  ];
  Storage.prototype.getItem.mockReturnValueOnce(JSON.stringify(mockCart));
  
  render(<CartPage />);
  
  expect(screen.getByText("Job 1")).toBeInTheDocument();
  expect(screen.getByText("Job 2")).toBeInTheDocument();
});

test("removes an item from the cart", () => {
  const mockCart = [
    { id: 1, title: "Job 1", type: "Full-time", createdAt: "2025-08-20T00:00:00Z" }
  ];
  Storage.prototype.getItem.mockReturnValueOnce(JSON.stringify(mockCart));
  
  render(<CartPage />);
  
  fireEvent.click(screen.getByText(/remove/i));
  
  expect(Storage.prototype.setItem).toHaveBeenCalledWith("cart", JSON.stringify([]));
  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
});

