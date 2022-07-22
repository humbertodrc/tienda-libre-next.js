import { render, screen } from "@testing-library/react";
import Discounts, { getServerSideProps } from "./discounts";

// Creamos un mock del hook useRouter
jest.mock("next/router", () => ({
  useRouter: () => "ES_ES",
}));

// Creamos data falsa para mockear la repuesta del fetch
const data = [
  {
    id: 1,
    title: "35% Off en línea hogar",
    image: "/home_electronics.jpg",
    description:
      "Comprando cualquier producto de la línea hogar tenes un 35% de descuento sobre el precio final",
    expiration: "30/06/2022",
  },
];

describe("<Discounts/>", () => {
  // Mockeamos el método fetch
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;

  // Primero testeamos que el método getServerSideProps
  // nos devuelva la data que esperamos
  it("should get the data using getServerSideProps", async () => {
    const response = await getServerSideProps({ locale: "ES_ES" });

    expect(response).toEqual(
      expect.objectContaining({
        props: { data },
      })
    );
  });

  // Luego, testeamos que el componente se renderice correctamente
  // utilizando la data que le pasamos
  it("should render without crashing, having data", async () => {
    render(<Discounts data={data} />);

    expect(screen.getByText("Descuentos")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "35% Off en línea hogar"
    );
    expect(screen.getByText("35% Off en línea hogar")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Comprando cualquier producto de la línea hogar tenes un 35% de descuento sobre el precio final"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("30/06/2022")).toBeInTheDocument();
  });

  // Testemos que no aparezca nada en la pantalla si no hay data
  it("should render nothing if no data is provided", async () => {
    const { container } = render(<Discounts />);

    expect(container.firstChild).toBeNull();
  });
});
