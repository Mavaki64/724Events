import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

const mockData = {
  events: [
    {
      id: 1,
      type: "conférence",
      date: "2022-08-29T20:28:45.744Z",
      title: "Event A",
      cover: "/images/a.png",
      description: "desc",
      nb_guesses: 1,
      periode: "x",
      prestations: [],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-01-01T00:00:00.000Z",
      title: "Event B",
      cover: "/images/b.png",
      description: "desc",
      nb_guesses: 1,
      periode: "x",
      prestations: [],
    },
  ],
  focus: [],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      const fields = await screen.findAllByTestId("field-testid");
      fireEvent.change(fields[0], { target: { value: "Doe" } }); // nom
      fireEvent.change(fields[1], { target: { value: "John" } });   // prenom
      fireEvent.change(fields[2], { target: { value: "john.doe@724events.com" } }); // email
      fireEvent.change(fields[3], { target: { value: "Coucou j'ai ecris ce test" } }); // message
      const hiddenTypeInput = document.querySelector('input[type="hidden"][name="type"]');
      fireEvent.change(hiddenTypeInput, { target: { value: "Personel" } });
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByTestId("events-list");
  })
  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findByTestId("people-list");
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    await screen.findByTestId("footer");
  })
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByTestId("last-prestation");
  })
});
