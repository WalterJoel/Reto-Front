import React, { FC, useCallback, useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button,Dialog, CardActionArea, CardActions } from '@mui/material';

//Imports by Me
import Rec from './Rec';
import Cardpregunta from './Cardpregunta';
import {
  Preguntas
} from './constants';


export default function MultiActionAreaCard() {
  //Manejamos un estado para poder abrir un Dialog
 

  return (
    <div>
    {Preguntas.map((key) => (
        <Cardpregunta key={key.key_id} info={key}/>
    ))}
    </div>
  );
}
