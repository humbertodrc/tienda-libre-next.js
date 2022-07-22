# Especialización en Frontend III - Semana 4 - Clase 11

## Base para la ejercitación (Profe)

Para esta ejercitación, continuaremos trabajando sobre el proyecto "Tienda Libre", agregando una nueva funcionalidad que nos permitirá repasar los conocimientos adquiridos durante las clases pasadas. Además, escribiremos los tests del componente que estaremos creando, para repasar los conceptos aprendidos sobre este tema.

La funcionalidad que vamos a implementar consiste en una sección de "Descuentos", en la cual tendremos un listado de los descuentos disponibles en el sitio.

### Paso 1: Creamos el componente

Como primer paso, crearemos un archivo _discounts.tsx_ dentro de la carpeta **pages**, en donde crearemos nuestro componente.

En primer lugar, vamos a crear un componente con data hardcodeada, para lo cual podemos utilizar la siguiente

```javascript
const data = [
  {
    id: 1,
    title: "35% Off en línea hogar",
    image: "/home_electronics.jpg", // Este archivo ya se encuentra en la carpeta public
    description:
      "Comprando cualquier producto de la línea hogar tenes un 35% de descuento sobre el precio final",
    expiration: "30/06/2022",
  },
];
```

Por otro lado, como en el proyecto ya tenemos implementado i18n, vamos a agregar los textos en el archivo _locale/constants_

```javascript
export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    HEADER: {
      TYCS: "Terms and conditions",
      PRODUCTS: "Featured Products",
      DISCOUNTS: "Discounts", // Esto nos servirá para agregar la opción en el navbar
    },
    MAIN: {
      PRODUCTS: "Featured Products",
      TYCS: "Terms and conditions",
    },
    DISCOUNTS: {
      // Agregamos este campo para utilizar en el componente
      TITLE: "Discounts",
      EXPIRATION: "Expires",
    },
  },
  [ES_ES]: {
    HEADER: {
      TYCS: "Términos y condiciones",
      PRODUCTS: "Productos destacados",
      DISCOUNTS: "Descuentos",
    },
    MAIN: {
      PRODUCTS: "Productos destacados",
      TYCS: "Términos y condiciones",
    },
    DISCOUNTS: {
      // Agregamos este campo para utilizar en el componente
      TITLE: "Descuentos",
      EXPIRATION: "Validez",
    },
  },
  [PT_BR]: {
    HEADER: {
      TYCS: "Termos e Condições",
      PRODUCTS: "Produtos em destaque",
      DISCOUNTS: "Descontos",
    },
    MAIN: {
      PRODUCTS: "Produtos em destaque",
      TYCS: "Termos e Condições",
    },
    DISCOUNTS: {
      // Agregamos este campo para utilizar en el componente
      TITLE: "Descontos",
      EXPIRATION: "Expiração",
    },
  },
};
```

Ahira si, creamos el componente

```jsx
import { NextPage } from "next";
import React from "react";
import { Discount, DiscountsAPIResponse } from "../types";
import Head from "next/head";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";
import styles from "../styles/Discounts.module.css";
import Image from "next/image";

// Por el momento usamos la data hardcodeada
const data = [
  {
    id: 1,
    title: "35% Off en línea hogar",
    image: "/home_electronics.jpg", // Este archivo ya se encuentra en la carpeta public
    description:
      "Comprando cualquier producto de la línea hogar tenes un 35% de descuento sobre el precio final",
    expiration: "30/06/2022",
  },
];

// Nos traemos el tipo para este caso
type IProps = {
  data: DiscountsAPIResponse;
};

const Discounts: NextPage<IProps> = () => {
  // Utilizamos locale para traernos el lenguage del navegador
  const { locale } = useRouter();

  // Si no hay data, no renderizamos nada
  if (!data) return null;

  // Utilizando el lenguage, obtenemos los textos que vamos a mostrar en
  // el idioma que corresponde
  const { DISCOUNTS } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  // Creamos una función para renderizar cada item
  const renderDiscount: (discount: Discount) => JSX.Element = ({
    id,
    image,
    description,
    title,
    expiration,
  }) => (
    <div key={id} className={styles.discount}>
      <h3>{title}</h3>
      <Image src={image} alt={title} width={600} height={300} />
      <i>{description}</i>
      <b>
        {DISCOUNTS.EXPIRATION}: <span>{expiration}</span>
      </b>
    </div>
  );

  return (
    <div className={styles.discountsContainer}>
      <Head>
        <title>Tienda Libre - {DISCOUNTS.TITLE}</title>
        <meta name="description" content="descuentos de Tienda Libre" />
      </Head>
      <h2>{DISCOUNTS.TITLE}</h2>
      {data.map(renderDiscount)}
    </div>
  );
};

export default Discounts;
```

El último paso para poder acceder a esta página es agregar la opción correspondiente dentro del componente `<Header>`.

_Header.jsx_

```jsx
// Imports...

const Header = () => {
  // ...

  return (
    <header className={styles.header}>
      // ...
      <div className={styles.navbar}>
        <Link href="./">{`${HEADER.PRODUCTS}`}</Link>
        <Link href="./tycs">{`${HEADER.TYCS}`}</Link>
        {/* Agregamos la opcion correspondiente */}
        <Link href="./discounts">{`${HEADER.DISCOUNTS}`}</Link>
      </div>
      // ...
    </header>
  );
};

export default Header;
```

A esta altura, tenemos un Header con data hardcodeada.

### Paso 2: Obtenemos la data de la API.

En este proyecto ya esta creada la ruta que devuelve la información sobre los descuentos (si el profe lo prefiere puede crearla en vivo, pero para ahorrar tiempo ya esta hecha). El endpoint es, al igual que en los otros casos, dinámico ya que depende del lenguage elegido.

Aqui, se puede dar el debate de que método conviene utilizar para obtener los datos de la API (repasando las opciones que se vieron durante las clases anteriores). En nuestro caso, elegimos el método `getServerSideProps` ya que asumimos que los datos de las promociones pueden ir cambiando de tiempo en tiempo, por lo que deseamos pre-fetchear esa data al momento de que se carga la página en cuestion (no al momento del build).

Vamos a agregar entonces este método dentro del archivo _discounts.tsx_

```javascript
// En este caso nos inclinamos por getServerSideProps
// ya que las promociones se van actualizando de tiempo en tiempo.
// Esto es un buen disparador para un debate entre las distintas alternativas
// que se vieron a lo largo de las clases anteriores.
export async function getServerSideProps({
  locale,
}: {
  locale: string,
}): Promise<{ props: { data: DiscountsAPIResponse } }> {
  const baseUrl = "http://localhost:3000/";

  // Utilizando el valor de "locale" que nos devuelve el contexto
  // obtenemos la data del idioma seleccionado
  const response = await fetch(`${baseUrl}/api/discounts/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}
```

Entonces, ahora estamos en condiciones de eliminar la data mockeada y consumir data de la API.

```jsx

// Agregamos "data" dentro de las props que recibe el componente
const Discounts: NextPage<IProps> = ({ data }) => {
    //...
```

De esta manera, ya tenemos nuestro componente conectado con la API.

### Paso 3: Escribimos los tests.

Ahora que ya tenemos implementado nuestro componente, vamos a escribir los tests. Para ello, vamos a testear el componente por un lado, y el método getServerSideProps por el otro. Recordemos que para esto debemos mockear el método fetch.
De esta manera, nuestros tests quedarían de la siguiente manera:

```jsx
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
```

Con esto completamos la actividad.
