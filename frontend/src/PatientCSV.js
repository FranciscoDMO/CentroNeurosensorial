import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Link} from "react-router-dom";
import {CSVLink} from 'react-csv';


const PatientCSV = () => {
    const {id} =useParams()
    const{data: patient ,error , isPending} = useFetch('/patientCSV/'+ id );

    return (<div className="patient-csv">
        {isPending && <div>...Loading...</div>}
        {error && <div>{ error }</div>}
        {patient && (
            <article>
                <h4 className="patient-details-name"> { patient.done }</h4>
                <br></br>
                <CSVLink data={patient.data} filename= {id +"_" + patient.name + "_data.csv"} > <span 
                            className="icon-download download-csv-1" /><button>Download</button></CSVLink>
                <Link to="/pacientes" ><button>Voltar</button></Link>
            </article>
        )}
    </div>);
}
 
export default PatientCSV;