import { render, screen, waitFor } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

const originalLoadData = api.loadData;

describe("When a data context is created", () => {
  beforeEach(() => {
    api.loadData = originalLoadData;
    jest.clearAllMocks();
  });
  it("a call is executed on the events.json file", async () => {
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });
  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );
      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
  it("api.loadData", async () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ rates: { CAD: 1.42 } }),
    });
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
