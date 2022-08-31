import React, { FC, useCallback, useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button,Dialog, DialogContentText,DialogContent, DialogTitle, CardActionArea, CardActions } from '@mui/material';

import Rec from './Rec';
import { useEffect } from 'react';


export default function Cardpregunta(props) {
    const [openDialog, setOpenDialog] = useState(false);
    const _handleOpen = () => {
      setOpenDialog(true);
    };
    const _handleClose = () => {
      setOpenDialog(false);
    }; 
  //Guardar lo rastreado, es decir un json con los videos listos para mandar a backend
  return (
    <Card  onClick={_handleOpen}>      
        <CardActionArea >
        <CardMedia
            component="img"
            height="140"
            image="src/images/responder.jpg"
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Pregunta {props.info.key_id+1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.info.description}

            </Typography>
        </CardContent>
        </CardActionArea>
        {openDialog === true? (
        <Rec opens={openDialog} info={props.info}/>
        ) : (

            <CardActions>
            <Button size="small" color="primary">
             Abrir
            </Button>
        </CardActions>

        )}
        </Card>
  );
}
