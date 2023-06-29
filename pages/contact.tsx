import { NextPage } from 'next'
import {countries} from 'countries-list'
import { useState } from 'react'
import { useRouter } from 'next/router';
import { TEXTS_BY_LANGUAGE, defaultLocale } from '../locale/constants';
import { Box, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, TextField, TextareaAutosize, Typography, Checkbox, Button } from '@mui/material';


const ContactPage: NextPage = () => {
  // ** Manejar los datos de los países para el select
  const [selectedCountry, setSelectedCountry] = useState('');

  const countriesList = Object.values(countries)
  const countriesNames = countriesList.map((country) => country.name)

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value)
  }

  // ** Manejar las traduciones
  const { locale } = useRouter()
  
  const {CONTACT} = TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ?? TEXTS_BY_LANGUAGE[defaultLocale]


  return (
    <Container maxWidth='sm'>
      <Box sx={{maxWidth: 500, marginTop: 3}}>
        <Paper elevation={4} sx={{ p: '32px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <Typography sx={{ fontWeight: 500, fontSizeAdjust: 24 }}>{CONTACT.TITLE}</Typography>
          
          {/* Nombre */}
          <Grid item xs={12}>
            <TextField
              id='outlined-basic'
              label={CONTACT.FIELDS.NAME}
              variant='outlined'
              sx={{ width: '100%' }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              type='email'
              id='outlined-basic'
              label={CONTACT.FIELDS.EMAIL}
              variant='outlined'
              sx={{ width: '100%' }}
            />
          </Grid>

          {/* Select Paises */}
          <FormControl>
            <InputLabel id="demo-simple-select-label">{CONTACT.FIELDS.COUNTRY}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCountry}
              label={CONTACT.FIELDS.COUNTRY}
              onChange={handleChange}
            >
              {countriesNames.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Genero */}
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{CONTACT.FIELDS.GENDER}</FormLabel>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value='female' label={CONTACT.FIELDS.FEMALE} control={<Radio />} />
              <FormControlLabel value='male' label={CONTACT.FIELDS.MALE} control={<Radio />} />
              <FormControlLabel value='other' label={CONTACT.FIELDS.OTHER} control={<Radio />} />

            </RadioGroup>
          </FormControl>

          {/* Mensaje */}
          <FormGroup>
            <InputLabel id='question'>{CONTACT.FIELDS.QUESTION}</InputLabel>
            <TextareaAutosize  aria-label='minimun height' minRows={10}  />
          </FormGroup>

          {/* Terminos y COndiciones */}
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />}  label={CONTACT.FIELDS.TYCS} />
          </FormGroup>

          <Button variant='contained'>
            {CONTACT.SEND_BUTTON}
          </Button>

        </Paper>
      </Box>
    </Container>
  )
}

export default ContactPage