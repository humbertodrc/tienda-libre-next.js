import {NextPage} from "next";
import {countries} from "countries-list";
import {useState} from "react";
import {useRouter} from "next/router";
import {TEXTS_BY_LANGUAGE, defaultLocale} from "../locale/constants";
import {
	Box,
	Container,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	SelectChangeEvent,
	TextField,
	TextareaAutosize,
	Typography,
	Checkbox,
	Button,
} from "@mui/material";
import { useForm, Controller} from "react-hook-form";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const ContactPage: NextPage = () => {
	// ** Manejar los datos de los países para el select
	const countriesList = Object.values(countries);
	const countriesNames = countriesList.map((country) => country.name);

	// ** Manejar las traduciones
	const {locale} = useRouter();

	const {CONTACT} =
		TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];
  
  // Creamos el esquema para realizar nuestras validaciones.
  // Para el caso de validacione inválidas, asignamos un mensaje de error
  // customizado que traemos en base al idioma seleccionado.
  const schema = yup
    .object({
      name: yup.string().required(CONTACT.ERRORS.NAME),
      email: yup.string().required(CONTACT.ERRORS.EMAIL),
      country: yup
        .string()
        .oneOf(countriesNames)
        .required(CONTACT.ERRORS.COUNTRY),
      gender: yup
        .string()
        .oneOf(["male", "female", "other"])
        .required(CONTACT.ERRORS.GENDER),
      question: yup.string().min(10).required(CONTACT.ERRORS.QUESTION),
      tycs: yup
        .boolean()
        .test("OK", CONTACT.ERRORS.TYCS, (value) => value === true),
    })
    .required();

	// ** Manejar el formulario con react-hook-form

  type FormData = yup.InferType<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);



	return (
		<Container maxWidth="sm">
			<Box sx={{maxWidth: 500, marginTop: 3}}>
				<Paper
					elevation={4}
					sx={{p: "32px", display: "flex", flexDirection: "column", gap: 3}}
				>
					<Typography sx={{fontWeight: 500, fontSizeAdjust: 24}}>
						{CONTACT.TITLE}
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Nombre */}
						<Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                      <TextField
                      id="outlined-basic"
                      label={CONTACT.FIELDS.NAME}
                      variant="outlined"
                      sx={{ width: "100%" }}
                      error={!!errors.name}
                      {...field}
                    />
                    {errors.name && <small>{errors.name.message}</small>}
                  </>
                )}
              />
              
						</Grid>

						{/* Email */}
						<Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <TextField
                      type="email"
                      id="outlined-basic"
                      label={CONTACT.FIELDS.EMAIL}
                      variant="outlined"
                      sx={{ width: "100%" }}
                      {...field}
                    />
                    {errors.email && <small>{errors.email.message}</small>}
                  </>
                  )}
              />
						</Grid>

						{/* Select Paises */}
						<FormControl>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      {CONTACT.FIELDS.COUNTRY}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue=""
                      // value={selectedCountry}
                      label={CONTACT.FIELDS.COUNTRY}
                      // onChange={handleChange}
                      {...field}
                    >
                      {countriesNames.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.country && <small>{errors.country.message}</small>}
                  </>
                  )}
              />
						</FormControl>

						{/* Genero */}
						<FormControl>
							<FormLabel id="demo-radio-buttons-group-label">
								{CONTACT.FIELDS.GENDER}
							</FormLabel>

              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    // name="radio-buttons-group"
                    {...field}
                  >
                    <FormControlLabel
                      value="female"
                      label={CONTACT.FIELDS.FEMALE}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="male"
                      label={CONTACT.FIELDS.MALE}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="other"
                      label={CONTACT.FIELDS.OTHER}
                      control={<Radio />}
                    />
                    {errors.gender && <small>{errors.gender.message}</small>}
                  </RadioGroup>
                  )}
              />
						</FormControl>

						{/* Mensaje */}
						<FormGroup>
							<InputLabel id="question">{CONTACT.FIELDS.QUESTION}</InputLabel>
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <>
                    <TextareaAutosize aria-label="minimun height" minRows={10} {...field} />
                    {errors.question && <small>{errors.question.message}</small>}
                  </>
                )}
              />
						</FormGroup>

						{/* Terminos y COndiciones */}
						<FormGroup>
              <Controller
                name="tycs"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={CONTACT.FIELDS.TYCS}
                      {...field}
                    />
                    {errors.tycs && <small>{errors.tycs.message}</small>}
                  </>
                )}
              />
						</FormGroup>

						<Button variant="contained" type="submit">
							{CONTACT.SEND_BUTTON}
						</Button>
					</form>
				</Paper>
			</Box>
		</Container>
	);
};

export default ContactPage;
