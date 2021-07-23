import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Button from 'react-bootstrap/Button';
import useFetch from "./useFetch";
import {Link, useHistory} from "react-router-dom";



const Evaluation = () => {

    const {idExam} = useParams();
    const {idPatient} = useParams();
    const {ommited} = useParams();
    const {wrongs} = useParams();
    const {repeated} = useParams();
    const {exchange} = useParams();
    const {others} = useParams();
    const {subSeq} = useParams();
    const {end} = useParams();
    const {answer} = useParams();

    const [idomited , setOmited]=useState(ommited);
    const [idwrongs , setWrongs]=useState(wrongs);
    const [idrepeated , setRepeated]=useState(repeated);
    const [idexchange , setExchange]=useState(exchange);
    const [idothers , setOthers]=useState(others);

    const {data: teste, error, isPending} = useFetch('/test/' + idExam);
    const history = useHistory();

    const HandleSubmit = (e) => {
        e.preventDefault();
        let soma = parseInt(idwrongs) + parseInt(idrepeated) + parseInt(idexchange) + parseInt(idothers);
        soma = soma.toString();
        const exam = {idExam, idPatient, answer, idomited, soma, end}

        fetch('http://localhost:5000/examPatient', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(exam),
            url1: JSON.stringify(exam),
        }).then(() => {
            history.push('/pacientes');
        });
    }

    const [subSeqs, setSubSeqs] = useState(null);


    function renderTableData() {
        return subSeqs.map((info, index) => {
            const {key , value} = info
            console.log(info);
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            )
        })
    }

    return(
        <div className="evaluate-container">
            <div className="maketest-info">
                {<div className="maketest-results-container">
                    <h5 style={{fontWeight: "bold"}}>Proposta:</h5>
                    <div className="maketest-results">
                        <div className="maketest-results-duration-container">
                            <p>Duração:</p>
                            <div className="maketest-results-duration">
                                {end}
                            </div>
                        </div>
                        <div className="maketest-results-omerrtropermout-container">
                            <div className="maketest-results-omitted">
                                <p>Omissões:</p>
                                <input type="number" min="0" max="50" required value={idomited}
                                       onChange={(e) => setOmited(e.target.value)}/>

                            </div>

                            <div className="maketest-results-wrongs">
                                <p>Trocas:</p>
                                <input type="number" min="0" max="50" required value={idwrongs}
                                       onChange={(e) => setWrongs(e.target.value)}/>
                            </div>

                            <div className="maketest-results-repeated">
                                <p>Repetições:</p>
                                <input type="number" min="0" max="50" required value={idrepeated}
                                       onChange={(e) => setRepeated(e.target.value)}/>
                            </div>

                            <div className="maketest-results-change">
                                <p>Permuta:</p>
                                <input type="number" min="0" max="50" required value={idexchange}
                                       onChange={(e) => setExchange(e.target.value)}/>
                            </div>

                            <div className="maketest-results-others">
                                <p>Outros:</p>
                                <input type="number" min="0" max="50" required value={idothers}
                                       onChange={(e) => setOthers(e.target.value)}/>
                            </div>
                        </div>

                    </div>
                </div>}
                
                {<div className="maketest-answer">
                    {teste && <div className="maketest-imgpreview">
                        <img src={teste.nameImage} alt="new" width="400" height="auto"/>
                    </div>}

                    <div className="maketest-answer-attempt">
                        <label><h5 style={{fontWeight: "bold"}}>Tentativa:</h5></label>
                        <textarea type="text" cols="50" defaultValue={answer}/>
                    </div>
                    <div className="subseqs-container">
                        {subSeqs && <table className="subseqs-table">
                            <tbody>
                                <tr>
                                    <th>Ordem</th>
                                    <th>Subsequências</th>
                                </tr>
                                {renderTableData()}
                            </tbody>
                        </table>}
                    </div>
                </div>}

                
                <div className="maketest-info-buttons">
                    <Button onClick={() => {
                            let newSubSeq = subSeq.split("!");

                            let res = [];
                            for (let i = 0; i < newSubSeq.length; i++) {
                                if (newSubSeq[i].length > 0) {
                                    let newSub = newSubSeq[i].split(",");
                                    res.push({key: i, value: newSub.join(" ")});
                                }
                            }
                            setSubSeqs(res);
                            console.log(subSeqs);
                        }}>Mostrar tabela</Button>
                    <Button id="button-submit" onClick={HandleSubmit} >Submeter</Button>
                    <Link to="/realizarTeste"><Button>Voltar</Button></Link>
                </div>
            </div>
        </div>
    )
};

export default Evaluation;
