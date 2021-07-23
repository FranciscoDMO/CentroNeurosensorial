import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React  from 'react';

const PatientList = ({ patients, title}) => {

  return (
    <div className="patient-list-container">
      <Link to="/createPatient"><Button>Novo Paciente</Button></Link>
      {patients.sort((a, b) => a.namePatient.localeCompare(b.namePatient)).map(patient => (
          <div className="patient-preview" key={patient.idPatient} >         
            <h1>{ patient.namePatient }</h1>
            <div className="Butoes">
              <Link to ={`/patient/${patient.idPatient}`}>
                <Button>Detalhes</Button>
              </Link>
            </div> 
          </div>
      ))}
    </div>
  );
}
 
export default PatientList;