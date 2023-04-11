import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { RouteInterface } from "../routes";
import { getCurrentPath } from "../utils";
import { Link } from "./Link";
import { Route } from "./Route";
import { Router } from "./Router";

vi.mock("../utils.ts", () => ({
  getCurrentPath: vi.fn(),
}));

const routes: RouteInterface[] = [
  {
    path: ["/", "/home"],
    component: () => <h1>Home</h1>,
  },
  {
    path: ["/about"],
    component: () => <h1>About</h1>,
  },
];

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("should work", () => {
    render(<Router routes={[]} />);
  });
  it("should render 404 if no routes match", () => {
    render(
      <Router routes={[]} defaultComponent={() => <h1>__404__</h1>}></Router>
    );
    expect(screen.getByText("__404__"));
  });
  it("should render the component of the first route that matches", () => {
    (getCurrentPath as any).mockReturnValue("/about");
    render(<Router routes={routes}></Router>);
    expect(screen.getByText("About")).toBeTruthy();
  });
  it("should render the same component if in two routes", () => {
    (getCurrentPath as any).mockReturnValue("/");
    render(<Router routes={routes}></Router>);
    expect(screen.getByText("Home")).toBeTruthy();
    cleanup();
    vi.clearAllMocks();
    (getCurrentPath as any).mockReturnValue("/");
    render(<Router routes={routes}></Router>);
    expect(screen.getByText("Home")).toBeTruthy();
  });
  it("should navigate using links", () => {
    (getCurrentPath as any).mockReturnValue("/");
    render(
      <Router routes={[]}>
        <Route
          path={["/"]}
          component={() => (
            <>
              <h1>Home</h1>
              <Link path={"/aboud"} component={() => <h1>About</h1>}>
                __go_to_about__
              </Link>
            </>
          )}
        />
        <Route path={["/about"]} component={() => <h1>About</h1>} />
      </Router>
    );
    screen.getByText("__go_to_about__").click();
    expect(screen.findByText("About")).toBeTruthy();
  });
});
