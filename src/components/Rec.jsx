import React, { FC, useCallback, useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button,Dialog, DialogContentText,DialogContent, DialogTitle,DialogActions, CardActionArea, CardActions } from '@mui/material';

import Webrtc from './Webrtc';
import {
  Preguntas
} from './constants';
import { useEffect } from 'react';



export default function Rec(props) {
  //Manejamos un estado para poder abrir un Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const _handleOpen = () => {
    setOpenDialog(true);
  };
  const _handleClose = () => {
    setOpenDialog(false);
  };
  
  // EN info tengo el key_id la primera vez, hago match
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);



  const _handleClickNext = () => {
    const newCurrentSectionIndex = currentSectionIndex + 1;
    //Valido para no pasarm
    let size= Preguntas.length - 1;
    console.log('json size',size)
    console.log('json size',Preguntas[currentSectionIndex].description)
    console.log('index',currentSectionIndex)
    //if (newCurrentSectionIndex <= size)
      setCurrentSectionIndex(currentSectionIndex+1);
  };

  const _handleClickPrev = () => {
    const newCurrentSectionIndex = currentSectionIndex - 1;
    //Valido para no llegar a negativos
    if (newCurrentSectionIndex >= 0) setCurrentSectionIndex(newCurrentSectionIndex);

  };
  useEffect(() => {
    //Apenas cargo debo hacer el match de quien lanza el modal por props para igualar el Key_id
    setCurrentSectionIndex(props.info.key_id);
    console.log('use efect rec')
  },[])  //Aqui el segundo parametro me dice que disparara un efecto condicional a que cambie [] en este caso nada


  //Guardar lo rastreado, es decir un json con los videos listos para mandar a backend
  return (
        <Dialog open={props.opens} onClose={_handleClose}>
         <DialogTitle id="alert-dialog-title">
          {Preguntas[currentSectionIndex].description}
        </DialogTitle>
        <DialogContent>
        <Webrtc key={currentSectionIndex} buttonActive={true}/> 
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
        {currentSectionIndex === 0 ? (
          <Button onClick={_handleClickNext}>Siguiente</Button>
        ) : (
          <Button onClick={_handleClickPrev}>Atrás</Button>
        )}
        {currentSectionIndex === props.info.length - 1 ? (
          <Button >Terminar</Button>
        ) : (
          <Button onClick={_handleClickNext}>Siguiente</Button>
        )}
        <Button >Prueba</Button>
      </DialogActions>

        </Dialog>
  );
}
