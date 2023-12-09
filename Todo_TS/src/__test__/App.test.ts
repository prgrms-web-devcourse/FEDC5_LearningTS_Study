import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { StateType } from "../components/Utils/TypeDeclare";
import { App } from "../app";

describe("App component", () => {
  test("renders with initial state", () => {
    const initialState: StateType = [];

    App({ $target: document.body, initialState });

    expect(screen.getByText("Simple Todo List")).toBeInTheDocument();
  });

  test("handles form submission", () => {
    const initialState: StateType = [];

    App({ $target: document.body, initialState });

    const inputElement = screen.getAllByRole("textbox");
    const addButton = screen.getAllByText(/add/i);

    fireEvent.change(inputElement[0], { target: { value: "New Todo Item" } });
    fireEvent.click(addButton[0]);

    screen.getByText("New Todo Item");

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });
});
