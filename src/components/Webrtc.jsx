import { useEffect, useRef} from 'react';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button,buttonBaseClasses,IconButton   } from '@mui/material';

import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Webrtc = (props) => {
    const [count, setCount] = useState(0);
    let buttonGrabar = useRef('Grabar');
    let mediaRecorder = useRef(null)
    let recordedBlobs = useRef(null)
    const audio = useRef([])
    const recordedVideo = document.querySelector('video#recorded');
    const recordButton = document.querySelector('button#record');
    const gumVideo = document.querySelector('video#gum');

    const _handleRecord = () => {
        gumVideo.style.display = 'block'
        if (recordButton.textContent === 'Start Recording') {
            startRecording();
            setCount(count+1)
        } else {
            stopRecording();
            recordButton.textContent = 'Start Recording';
        }
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
        recordButton.textContent = 'Stop Recording';
        mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            console.log('Recorded Blobs: ', recordedBlobs);
            buttonGrabar.current='Grabar'
            localStorage.setItem('user', JSON.stringify(recordedBlobs))
        };
        mediaRecorder.ondataavailable = _handleDataAvailable;
        mediaRecorder.start();
        console.log('MediaRecorder started', mediaRecorder);
    }

    function stopRecording() {
        mediaRecorder.stop();
        buttonGrabar.current='Grabar'
    }
    async function _handleSuccess(stream) {
        console.log('getUserMedia() got stream:', stream);
        window.stream = stream;
        gumVideo.srcObject = stream;
    }
    async function init() {
        try {
            const constraints = {
                audio: {
                    sound: { exact: audio }
                },
                video: {
                    width: 550, height: 320
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            await _handleSuccess(stream);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        console.log('renderizo',count)
        init();
    }, [count])

    return (
        <div className='detail__container' id="container">
            
            <video ref={mediaRecorder} id="gum" autoPlay muted playsInline></video>
            <video ref={recordedVideo} id="recorded" autoPlay playsInline loop></video>
            <div>
            <button id="recosssrd" onClick={() =>setCount((count) => count + 1)}>inicializar</button>
                <button id="record" onClick={_handleRecord}>Start Recording</button>
                {count === 0 || count === 1  ? (
                    <IconButton id="record" onClick={_handleRecord} aria-label="delete" size="large">
                        <PlayCircleIcon />
                    </IconButton>
                ) 
                :count === 2? (
                    <IconButton id="record" onClick={_handleRecord} aria-label="delete" size="large">
                        <StopCircleIcon />
                    </IconButton>
                )
                :(
                    <Button >Atrás</Button>
                )}

                <button id="play" onClick={_handlePlay}>Play</button>
            </div>
        </div>
    )
}
export default Webrtc;