import React, { FC, useCallback, useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Grid, Paper,Button,Dialog, CardActionArea, CardActions } from '@mui/material';

//Imports by Me
import Rec from './Rec';
import Cardpregunta from './Cardpregunta';
import {
  Preguntas
} from './constants';


export default function MultiActionAreaCard() {
  //Manejamos un estado para poder abrir un Dialog
 

  return (
      <Grid container direction="row"
      justifyContent="center"
      alignItems="center">     
        <Grid container item 
      justifyContent="center"
      alignItems="center">
          <h1>Video Cuestionario</h1>
        </Grid> 
          {Preguntas.map((key) => (
            <Grid  key={key.key_id} item xs={2.5}>
              <Cardpregunta info={key}/>
            </Grid>  
          ))} 
      </Grid>  
  );
}
