import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import Poll from "../components/Poll";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middlewares";
import Login from "../components/Login";

const store = createStore(reducer, middleware);

describe("Testing DOM elements", () => {
  it("will create check presence of element", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      </MemoryRouter>
    );
    const column = component.getByTestId("Answered");
    expect(column).toBeInTheDocument();
  });

  it("will create create snapshot", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("Test Navbar", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </MemoryRouter>
    );

    const nav1 = component.getByTestId("leaderboard");
    expect(nav1).toBeInTheDocument();

    const nav2 = component.getByTestId("dashboard");
    expect(nav2).toBeInTheDocument();

    const nav3 = component.getByTestId("createPoll");
    expect(nav3).toBeInTheDocument();
  });

  it("Test Login, login button is not present", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const drop = component.getByTestId("dropdown");
    expect(drop).toBeInTheDocument();

    const login = component.queryAllByTestId("login-buttonn");
    expect(login.length).toEqual(0);
  });

  it("testing fireEvent on Login, login button is present", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const drop = component.getByTestId("dropdown");
    fireEvent.change(drop, { target: { value: "sarahedo" } });
    const login = component.getByTestId("login-button");
    expect(login).toBeInTheDocument();
  });

  it("testing 404 on poll when no qid is present", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Poll />
        </Provider>
      </MemoryRouter>
    );
    const err = component.getByTestId("404");
    expect(err).toBeInTheDocument();
  });
});
