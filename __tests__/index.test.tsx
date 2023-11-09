import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../components/card/addButton";
import React from "react";

describe("SearchBar", () => {
  it("Renders correctly initial document", () => {
    /* first we visit /login and test if the string in the element with class "login-label"  has"Please Log In" is there */
    render(<Button />);

    const header = screen.getByRole("button");

    expect(header).toHaveTextContent("addButton");
  });
});
