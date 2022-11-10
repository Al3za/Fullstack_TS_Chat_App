import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginInput } from "./pages/LoginInput";

describe("testing login button", () => {
  test("testing login props onLogin", () => {
    let clicked = false;
    render(
      <LoginInput
        onLogin={async () => {
          clicked = true;
        }}
      />
    );
    fireEvent.click(screen.getByText("Login"));
    expect(clicked).toBeTruthy();
  });
});
