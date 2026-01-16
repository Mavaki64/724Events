import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("Logo component", () => {
    describe("When a Logo is created without size props value given", () => {
        it("should render the logo with a width of 130px", () => {
            render(<Logo />)
            expect(screen.getByTestId("logo").getAttribute("width")).toEqual('130')
        });
        it("should render the logo with a height of 60px", () => {
            render(<Logo />)
            expect(screen.getByTestId("logo").getAttribute("height")).toEqual('60')
        });
    });
    describe("When a Logo is created with size props value given 'large'", () => {
        it("should render the logo with a width of 160px", () => {
            render(<Logo size="large" />)
            expect(screen.getByTestId("logo").getAttribute("width")).toEqual('160')
        });
        it("should render the logo with a height of 60px", () => {
            render(<Logo size="large" />)
            expect(screen.getByTestId("logo").getAttribute("height")).toEqual('60')
        });
    });
    describe("When a Logo is created with size props value given 'other'", () => {
        it("should render the logo with a width of 130px", () => {
            render(<Logo size="other" />)
            expect(screen.getByTestId("logo").getAttribute("width")).toEqual('130')
        });
        it("should render the logo with a height of 60px", () => {
            render(<Logo size="other" />)
            expect(screen.getByTestId("logo").getAttribute("height")).toEqual('60')
        });
    });
})

