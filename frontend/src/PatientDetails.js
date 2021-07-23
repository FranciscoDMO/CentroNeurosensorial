import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React  from 'react';


const PatientDetails = () => {
    const {id} = useParams()
    const{data: patient ,error , isPending} = useFetch('/patient/'+ id );

    const history = useHistory();

    const [show, setShow] = React.useState(false);
    const [showcsv, setcsv] = React.useState(false);
    const [showflag, setflag] = React.useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(patient && showflag ){
        setflag(false)
        if(patient.exams){
           if(patient.exams.length > 0){
                setcsv(true);
            }
        }
    }

    return (<div className="patient-details-container">
        {isPending && <div>...Loading...</div>}
        {error && <div>{ error }</div>}
        {patient && (
            <div className="patient-details">
                <h2 className="patient-details-name"> Ficha do Paciente</h2>
                <h4> Nome:<div className="patient-info-container"></div><div className="patient-info"> {patient.patient.name}</div> </h4>
                <h4> Data de Nascimento: <div className="patient-info-container"></div><div className="patient-info">{ patient.patient.dateOfBirth}</div></h4>
                <h4> Género: <div className="patient-info-container"></div><div className="patient-info"> { patient.patient.gender } </div></h4>
                <h4> Observações: <div className="patient-info-container"></div><div className="patient-info"> { patient.patient.observations }</div></h4>
                <h4>Últimos 3 Testes:</h4>
                {patient.exams.map(exam => (
                    <div key={patient.exams.id}>
                        <div className="patient-info-exams">
                        <h5>{ exam.nameExam }</h5>
                            <h5>Data de realização: { exam.dateRealization }</h5>
                        <h5>Duração: { exam.duration }</h5>
                        <h5>Erradas: { exam.wrongs }</h5>
                        <h5>Omitidas: { exam.ommited }</h5>
                        </div>
                    </div>
                ))}
                <div className="patient-details-buttons">
                    <Link to="/pacientes"><Button>Voltar</Button></Link>
                    {showcsv &&
                    <Link to={`/patientCSV/${id}`}><Button>Transferir CSV</Button></Link>
                    }
                    <Link onClick={handleShow} ><Button > Remover </Button></Link>
                </div>

          
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header  closeButton>
                        <Modal.Title>Remover Paciente </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{'Deseja remover o paciente ' + patient.patient.name + ' ? '}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="primary" onClick={() => history.push(`/patient_remove/${id}`)}>
                        Remover
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )}
    </div>);
    
}
 
export default PatientDetails;