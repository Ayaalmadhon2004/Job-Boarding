import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobsPage from "../../app/job/page"; 
import "../__mocks__/next/navigation"

beforeEach(() => {
    // instead of window.fetch we put global.fetch to have it in all the tests
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, title: "Web Developer", description: "React", type: "web-development", createdAt: "2025-08-20" },
          { id: 2, title: "UI Designer", description: "Interface Design", type: "ui-ux", createdAt: "2025-08-19" },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing the search and category section in JobsPage", () => {
  test("Displays all jobs on initial load", async () => {
    render(<JobsPage />);
    await waitFor(() => {
      expect(screen.getByText("Web Developer")).toBeInTheDocument();
      expect(screen.getByText("UI Designer")).toBeInTheDocument();
    });
  });

  test("Search for jobs by title", async () => {
    render(<JobsPage />);
    const searchInput = screen.getByPlaceholderText("Search for jobs...");
    fireEvent.change(searchInput, { target: { value: "Developer" } });

    await waitFor(() => {
      expect(screen.getByText("Web Developer")).toBeInTheDocument();
      expect(screen.queryByText("UI Designer")).not.toBeInTheDocument();
    });
  });

  test("Filter jobs by category", async () => {
    render(<JobsPage />);
    const select = screen.getByRole("combobox"); // select element
    fireEvent.change(select, { target: { value: "ui-ux" } });

    await waitFor(() => {
      expect(screen.getByText("UI Designer")).toBeInTheDocument();
      expect(screen.queryByText("Web Developer")).not.toBeInTheDocument();
    });
  });
});
