import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      render(<Form onSuccess={onSuccess} onError={onError} />);

      const inputs = await screen.findAllByTestId("field-testid");
      fireEvent.change(inputs[0], { target: { value: "John" } });
      fireEvent.change(inputs[1], { target: { value: "Doe" } });
      fireEvent.change(inputs[2], { target: { value: "john.doe@724events.com" } });
      fireEvent.change(inputs[3], { target: { value: "Coucou j'ai ecris ce test" } });

      const hiddenTypeInput = document.querySelector('input[type="hidden"][name="type"]');
      fireEvent.change(hiddenTypeInput, { target: { value: "Personel" } });

      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onError).not.toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });

    it("the error action is called", async () => {
      const onError = jest.fn();
      const onSuccess = jest.fn();

      render(<Form onError={onError} onSuccess={onSuccess} />);

      fireEvent.click(await screen.findByTestId("button-test-id"));

      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();

      expect(onError.mock.calls[0][0].message).toBe("Tous les champs sont requis");
    })
  });
  
});
