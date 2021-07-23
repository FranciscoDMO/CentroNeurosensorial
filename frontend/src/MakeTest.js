import useFetch from "./useFetch";
import React, {useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {ResultReason} from 'microsoft-cognitiveservices-speech-sdk';
import {getTokenOrRefresh} from './token_util';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

let textRecognized;
let recognizer;
const MakeTest = () => {
    const {data: tests, isPending: pendT, error: errorT} = useFetch('/list_exams');
    const {data: patients, isPending: pendP, error: errorP} = useFetch('/list_patients');


    const [idPatient, setIdPatient] = useState('');
    const [idExam, setIdExam] = useState(null);
    const [begin, setBegin] = useState('');
    const [end, setEnd] = useState(null);
    const [text, setText] = useState('');
    const [showbutt, setbutt] = useState(true);
    const [micOn, setMic] = useState(false);

    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleShow = () => {
        if (idExam !== null && idPatient !== null)
            setShow(true);
        else
            window.alert("Tem de escolher um teste e um paciente");
    }

    const {data: teste, error, isPending} = useFetch('/test/' + idExam);


    const sttFromMic = async () => {
        setMic(true);
        textRecognized = [];
        const tokenObj = await getTokenOrRefresh();

        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'pt-PT';

        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);


        recognizer.recognized = (s, e) => {
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                console.log(`RECOGNIZED: Text=${e.result.text}`);
                textRecognized.push(e.result.text);
            } else if (e.result.reason === ResultReason.NoMatch) {
                console.log("NOMATCH: Speech could not be recognized.");
            }
        };

        recognizer.startContinuousRecognitionAsync();
    }


    const HandleStart = (e) => {
        document.getElementById("button-reset").style.display = "none";
        document.getElementById("maketest-title").style.display = "none";
        document.getElementById("button-evaluate").style.display = "none";
        document.getElementById("button-stop").style.display = "block";
        setShow(false);
        setbutt(false);
        var startT = new Date();
        //var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        setBegin(startT);
        sttFromMic();
    }


    function stopText() {
        setMic(false);
        setText(textRecognized);
        setbutt(true);
        document.getElementById("button-start").style.display = "none";
        document.getElementById("button-stop").style.display = "none";
        document.getElementById("button-reset").style.display = "block";
        document.getElementById("maketest-title").style.display = "block";

        if(idExam !== null && textRecognized.length !== 0){
            document.getElementById("button-evaluate").style.display = "block";
        }else{
            document.getElementById("button-evaluate").style.display = "none"; // none caso não se queira o botão
        }
    }

    const HandleStop = async () => {
        if (recognizer !== undefined & begin !== '' & micOn){
            recognizer.stopContinuousRecognitionAsync();

            var finalT = new Date();
            //var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            var seconds = Math.floor((finalT - (begin))/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var days = Math.floor(hours/24);
            hours = hours-(days*24);
            minutes = minutes-(days*24*60)-(hours*60);
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
            var evalTime =  minutes + 'm' + ':'+ seconds + 's' ;
            setMic(false);
            setEnd(evalTime);
            setTimeout(stopText, 1000);

        }else{
            window.alert("Não carregou em start.");
        }
    }

    const HandleReset = (e) => {
        document.getElementById("button-start").style.display = "block";
        document.getElementById("button-reset").style.display = "none";
        document.getElementById("maketest-title").style.display = "none";
        document.getElementById("button-evaluate").style.display = "none";
        document.getElementById("button-stop").style.display = "none";
        e.preventDefault();
        setText('');
        setBegin(null);
        setEnd(null);
        setbutt(true);
        if (micOn) {
            recognizer.stopContinuousRecognitionAsync();
        }
    }

    const HandleEvaluate = (e) => {
        e.preventDefault();
        const exam = {"idExam" : idExam, "text" : text}

        fetch('http://localhost:5000/evaluation', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(exam),
            url1: JSON.stringify(exam),
        }).then(response =>
            response.json().then(data => {
                history.push(`/evaluation/${idExam}/${idPatient}/${data.ommited}/${data.wrongs}/${data.repeated}/${data.exchange}/${data.other}/${data.longSubSeq}/${end}/${text}`);
            }))
    }




    return (
        <div className="maketest-container">
            {errorP && <div>{errorP}</div>}
            {errorT && <div>{errorT}</div>}
            {pendT && <div>A carregar os testes</div>}
            {pendP && <div>A carregar os testes</div>}

            <div className="maketest-info">
                <h2 id="maketest-title">Realizar Teste</h2>
                <div className="maketest-inline">
                    {showbutt && tests && <div><h5 style={{fontWeight: "bold"}}> Testes: &nbsp; &nbsp;
                        <select onClick={(e) => {
                            setIdExam(e.target.value)
                        }} required>
                            <option value="none" selected > Selecione uma opção</option>
                            {tests.exams.sort((a, b) => a.nameExam.localeCompare(b.nameExam)).map(test => (
                                <option key={test.idExam} value={test.idExam}>{test.nameExam}</option>
                            ))}
                        </select></h5>
                    </div>

                    }


                    {showbutt && patients &&
                    <div><h5 style={{fontWeight: "bold"}}>Pacientes:&nbsp; &nbsp;
                        <select onClick={(e) => {
                            setIdPatient(e.target.value)
                        }} required>
                            <option value="none" selected  > Selecione uma opção</option>
                            {patients.patients.sort((a, b) => a.namePatient.localeCompare(b.namePatient)).map(patient => (
                                <option key={patient.idPatient} value={patient.idPatient}>{patient.namePatient}</option>
                            ))}
                        </select></h5>
                    </div>
                    }
                </div>



                <div className="maketest-imgpreview">
                    {teste && idExam != null && showbutt &&
                    <img src={teste.nameImage} alt="new" width="400" height="auto"/>}
                </div>

                <div className="maketest-test-image">
                    {teste && idExam != null && !showbutt && <img src={teste.nameImage} alt="new"/>}
                </div>




                {showbutt && <div className="maketest-answer">

                    <label><h5 style={{fontWeight: "bold"}}>Tentativa:</h5></label>
                    <div>
                        <textarea type="text" cols="50" defaultValue={text} onChange={(e) => setText(e.target.value)}/>
                    </div>
                </div>}


                <div className="maketest-info-buttons">

                    <Button id="button-start" onClick={handleShow}>Começar</Button>


                    <Modal show={show}>
                        <Modal.Body>Pode falar após carregar em close!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={HandleStart}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Button id="button-stop" onClick={HandleStop} style={{display: "none"}} >Parar</Button>
                    <Button id="button-reset" onClick={HandleReset} style={{display: "none"}}>Redefinir</Button>
                    <Link to="/evaluation">
                        <Button id="button-evaluate" onClick={HandleEvaluate} style={{display: "none"}}>Avaliar</Button>
                    </Link>
                </div>
            </div>
        </div>

    );
}
export default MakeTest;