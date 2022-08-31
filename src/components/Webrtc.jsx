import { useEffect, createRef,useRef} from 'react';
import React, { FC, useCallback, memo,useMemo, useState } from 'react';
import { Paper,Button,buttonBaseClasses,Grid,IconButton   } from '@mui/material';

import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Preguntas } from './constants';

let bufferVideos={};

const Webrtc = (props) => {
    const [count, setCount] = useState(0);
    let buttonGrabar = useRef('Grabar');
    let mediaRecorder = useRef(null);
    let recordedBlobs = useRef(null)
    const audio = useRef([])
    const recordedVideo  = document.querySelector('video#recorded');
    const recordButton   = document.querySelector('button#record');
    const terminarButton = document.querySelector('button#terminar');
    const sgteButton = document.querySelector('button#sgte');
    const atrasButton = document.querySelector('button#atras');
    const iconoCamara = document.querySelector('#iconoCamara');

    const gumVideo = document.querySelector('video#gum');

    //Esta funcion entra cuando presiono el boton play o refresh o stop para todos los casos
    const _handleRecord = () => {
        if (recordButton.className === 'fa fa-play') {
            startRecording();
            iconoCamara.style.visibility="visible";
          } 
          else if(recordButton.className === 'fa fa-stop-circle'){
            stopRecording();
            iconoCamara.style.visibility="hidden";
            recordButton.className = 'fa fa-refresh';
            if(Object.keys(bufferVideos).length === props.numeroPreguntas-1){
                terminarButton.textContent = "Terminar";
                atrasButton.textContent =''                
                sgteButton.textContent='';
            }
          }
          else {
            startRecording();
            iconoCamara.style.visibility="hidden";
            recordButton.className = 'fa fa-stop-circle';
            //Si mi buffer de videos esta lleno
        }
        gumVideo.style.display = 'block'
    }

    function _handlePlay() {
        const superBuffer = new Blob(recordedBlobs);
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.controls = true;  
        recordedVideo.play();
        gumVideo.style.display = 'none'
        recordedVideo.style.display = 'block'
    }

    function _handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) recordedBlobs.push(event.data);
    }

    function startRecording() {
        recordedBlobs = [];
        try {
            mediaRecorder = new MediaRecorder(window.stream);
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }

        console.log('Created MediaRecorder', mediaRecorder, 'with options');
        recordButton.className = 'fa fa-stop-circle';
        //props.cambiarEstado('Grabando');
        mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            console.log('Recorded Blobs: ', recordedBlobs);
            localStorage.setItem('user', JSON.stringify(recordedBlobs))
            if(recordedBlobs){
                bufferVideos[props.keys]=recordedBlobs;
                //console.log(Object.keys(bufferVideos).length);
                console.log(bufferVideos);
            }
        };
        mediaRecorder.ondataavailable = _handleDataAvailable;
        mediaRecorder.start();
        console.log('MediaRecorder started', mediaRecorder);
    }

    function stopRecording() {
        mediaRecorder.stop();
    }

    async function _handleSuccess(stream) {
        console.log('getUserMedia() got stream:', stream);
        window.stream = stream;
        gumVideo.srcObject = stream;
        
    }
    async function init() {
        if(props.keys ===0){
            atrasButton.textContent ='' 
        }
        else if(props.keys === Preguntas.length-1){
            sgteButton.textContent ='' 
        }
        else{
            sgteButton.textContent ='Siguiente' 
            atrasButton.textContent ='Atras' 
        }

        try {
            const constraints = {
                audio: {
                    sound: { exact: audio }
                },
                video: {
                    width: 550, height: 250
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            await _handleSuccess(stream);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(()=>{
        init();
    },[init])

   
    return (
        <div className='detail__container' id="container">
            { bufferVideos[props.keys] ? (
                <Paper>Ya Respondiste esta Pregunta</Paper>
            ) : (
                <Paper></Paper>                
            )}

            <i id="iconoCamara" class="fa fa-video-camera" style={{visibility:'hidden',color:'red',fontSize:'25px',position:'relative',zIndex:'0'}}></i>
            <video ref={mediaRecorder} id="gum" autoPlay muted playsInline style={{zIndex:'0',position:'relative'}}>
            </video>
            <video ref={recordedVideo} id="recorded" autoPlay playsInline loop >
            </video>
            <div>
            <Button  id="recosssrd"   onClick={() => setCount(prevCount => prevCount + 1)}>Camara</Button>
            <button style={{fontSize:'25px'}}class="fa fa-play" id="record" onClick={_handleRecord}></button>                
            <Button   id="play" onClick={_handlePlay}>Ver Grabación</Button>
            </div>
        </div>
    )
}
export default Webrtc;