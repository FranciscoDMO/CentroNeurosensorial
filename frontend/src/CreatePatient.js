import { useState } from "react";
import {useHistory , Link} from "react-router-dom"
//import ProgressBar from './ProgressBar'


const CreatePatient = () => {
    const [namePatient , setPatient]=useState('');  
    const [gender , setGender]=useState(''); 
    const [dateOfBirth , setDateOfBirth]=useState(''); 
    const [observations , setObservations] = useState('');

    const history = useHistory();
 

    const handleSubmit = (e) =>{
        e.preventDefault();
        const patient = {namePatient, gender, dateOfBirth, observations}

        fetch('http://localhost:5000/createPatient', {
            method : 'POST',
            headers : {"Content-Type": "application/json"},
            body :JSON.stringify(patient),
            url1: JSON.stringify(patient),
        }).then(()=>{
            console.log('patient add');
            history.push('/pacientes');
        })
    }
    return ( 
        <div className="createPatient">
            <div className="create">
                <h2>Adicionar Novo Paciente</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome do Paciente:</label>
                    <input type="text" required value={namePatient} onChange={(e)=> setPatient(e.target.value)}/>
                    
                    <label>Data de Nascimento:</label>
                    <input type="date" required value={dateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)}/>
                    
                    <label >Genero:</label>
                    <div onChange={(e) => setGender(e.target.value)}>
                        <fieldset>
                            <input type="radio" value="M" name="gender" /> Masculino
                            <input type="radio" value="F" name="gender" /> Feminino
                            <input type="radio" value="O" name="gender" /> Outro
                        </fieldset>

                    </div>

                    <label>Observações:</label>
                    <textarea requiered value={observations}
                    onChange={(e)=> setObservations(e.target.value)}></textarea>

                    <button>Adicionar Paciente</button>
                    <Link to="/pacientes"><button>Voltar</button></Link>
                </form>
            </div>            
        </div>
     );
}
 
export default CreatePatient;