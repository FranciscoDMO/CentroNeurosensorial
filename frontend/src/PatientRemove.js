import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Link} from "react-router-dom";

const PatientRemove = () => {
    const {id} =useParams()
    const{data: patient ,error , isPending} = useFetch('/patient_remove/'+id );

    return (<div className="patient-remove">
        {isPending && <div>...Loading...</div>}
        {error && <div>{ error }</div>}
        {patient && (
            <article>
                <h2> { patient.done }</h2>
                <br></br>
                <Link to="/pacientes">
                    <button>Voltar</button>
                </Link>
            </article>
        )}
    </div>);
}
 
export default PatientRemove;