import { NextPage } from "next";
import React from "react";
import { Discount, DiscountsAPIResponse } from "../types";
import Head from "next/head";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
import { useRouter } from "next/router";
import styles from "../styles/Discounts.module.css";
import Image from "next/image";

// Nos traemos el tipo para este caso
type IProps = {
  data: DiscountsAPIResponse;
};

const Discounts: NextPage<IProps> = ({ data }) => {
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

// En este caso nos inclinamos por getServerSideProps
// ya que las promociones se van actualizando de tiempo en tiempo.
// Esto es un buen disparador para un debate entre las distintas alternativas
// que se vieron a lo largo de las clases anteriores.
export async function getServerSideProps({
  locale,
}: {
  locale: string;
}): Promise<{ props: { data: DiscountsAPIResponse } }> {
  const baseUrl = "http://localhost:3000/";

  const response = await fetch(`${baseUrl}/api/discounts/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}

export default Discounts;
