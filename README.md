# Especialización en Frontend III - Semana 8 - Clase 22

## Capsula Modulo 4 - Material UI

Para esta ejercitación, continuaremos trabajando sobre el proyecto "Tienda Libre", agregando una nueva sección de "Contacto" para que las personas puedan enviar sus inquietudes. Para ello, construiremos un formulario utilizando Material UI. Utilizando el código base, crearemos un archivo _contact.tsx_ dentro de la carpeta _pages_.

Allí, comenzaremos a construir el formulario, el cual contendrá los siguientes campos:

- Nombre, el cual será in input de tipo texto
- Email, que también será un input pero de este tipo
- País, el cual será un componente de tipo Select que contendrá un listado de todos los paises. Para obtener dicho listado nos apoyaremos en la librería **countries_list**.
- Género, el cual sera un input de tipo radio que permitirá elegir una de las opciones disponibles.
- La sección donde la persona podrá escribir la consulta, que será un textarea
- Y finalmente, in input de tipo checkbox para aceptar los términos y condiciones.

Para finalizar el formulario, tendremos un botón que nos permitirá enviar la consulta (en esta cápsula no es necesario implementar esta funcionalidad).

También aprovecharemos la funcionalidad de i18n que ya se encuentra implementada para hacer que los textos de esta página sean dinámicos en base al idioma seleccionado.

Para comenzar, vamos a importar las dependencias y demás utilidades que emplearemos en este componente:

```jsx
import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { countries } from "countries-list";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
```

Antes de comenzar a trabajar con el componente, vamos a obtener el listado de paises que emplearemos más adelante:

```javascript
// Obtenemos el listado de paises y dentro del mismo su nombre
// para mostrar dentro del Select
const countriesValues = Object.values(countries);
const countriesNames = countriesValues.map((country) => country.name);
```

Ahora, creamos nuestro componente y aprovechamos para obtener el idioma y los textos utilizando _useRouter_ y las constantes almacenadas en el proyecto:

```jsx
const Contacto: NextPage = () => {
  // Obtenemos el lenguage utilizando useRoute
  const { locale } = useRouter();

  // Obtenemos los textos utilizando el lenguage seleccionado
  const { CONTACT } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  //.....
```

Por su parte, para almacenar el país seleccionado desde el dropdown, vamos utilizar _useState_. Creamos entonces el estado y una función para actualizar el valor cuando la persona seleccione un nuevo país:

```jsx
// Por ahora guardamos el valor elegido dentro de un estado
const [selectedCountry, setCountry] = React.useState("");

// Creamos una función para actualizar el país seleccionado
const handleChange = (event: SelectChangeEvent<string>) => {
  setCountry(event.target.value);
};
```

Ahora si, construimos nuestro formulario utilizando Material UI:

```jsx
// Creamos nuestro formulario de contacto utilizando Material UI
return (
  // Utilizamos Container para centrar el formulario dentro de la página
  <Container maxWidth="sm">
    {/* Utilizando Box creamos el contenedor para el formulario */}
    <Box sx={{ maxWidth: 500, marginTop: 3 }}>
      {/* Utilizamos Paper para crear el efecto relieve */}
      <Paper
        elevation={4}
        sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
          {CONTACT.TITLE}
        </Typography>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label={CONTACT.FIELDS.NAME}
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="email"
            id="outlined-basic"
            label={CONTACT.FIELDS.EMAIL}
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {CONTACT.FIELDS.COUNTRY}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry}
            label={CONTACT.FIELDS.COUNTRY}
            onChange={handleChange}
          >
            {/* Por cada pais de nuestra lista creamos un item dentro del 
                  dropdown */}
            {countriesNames.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {CONTACT.FIELDS.GENDER}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label={CONTACT.FIELDS.FEMALE}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label={CONTACT.FIELDS.MALE}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={CONTACT.FIELDS.OTHER}
            />
          </RadioGroup>
        </FormControl>

        <FormGroup>
          <InputLabel id="demo-simple-select-label">
            {CONTACT.FIELDS.QUESTION}
          </InputLabel>
          <TextareaAutosize aria-label="minimum height" minRows={10} />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={CONTACT.FIELDS.TYCS}
          />
        </FormGroup>

        <Button variant="contained" sx={{ width: 1 }}>
          {CONTACT.SEND_BUTTON}
        </Button>
      </Paper>
    </Box>
  </Container>
);
```

De esta manera, si ingresamos a la sección correspondiente veremos nuestro formulario terminado
