import { useState } from "react";
import {useHistory , Link} from "react-router-dom";
import ProgressBar from './ProgressBar';


const Create = () => {
    const [nameExam , setExam]=useState('');
    const [nameImage , setImage]=useState('');
    const [dificulty , setDificulty]=useState('');
    const [observations , setObservations] = useState('');
    const [solution, setSolution] = useState('');

    const history =useHistory();
    const [file, setFile] = useState(null);

    const types =['image/png','image/jpeg'];
    const[error, setError] = useState(null);

    const fileChangedHandler = event => {
        let selected = event.target.files[0];

        if (selected && types.includes(selected.type)){
            setFile(selected);
            

        } else {
            setFile(null);
            setError('Tipo de ficheiro errado')

        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const test = {nameExam, nameImage, solution, dificulty, observations}

        fetch('http://localhost:5000/createExam', {
            method : 'POST',
            headers : {"Content-Type": "application/json"},
            body :JSON.stringify(test),
            url1: JSON.stringify(test),
        }).then(()=>{
            console.log('test add');
            history.push('/testes');
        })
    }
    return ( 
        <div className="createTest">
            <div className="create">
                <h2>Adicionar Novo Teste</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome do Teste:</label>
                    <input type="text" required value={nameExam} onChange={(e)=> setExam(e.target.value)}/>

                    <label>Dificuldade:</label>
                    <input type="number" min="1" max="3" required value={dificulty} onChange={(e)=> setDificulty(e.target.value)}/>

                    <label>Descrição do Teste:</label>
                    <textarea requiered value={observations}
                    onChange={(e)=> setObservations(e.target.value)}></textarea>
                    
                    <label>Imagem:</label>
                    <input type ="file" required onChange ={fileChangedHandler}/>
                    <div className ="output">
                        {error && <div className= "error"> {error}</div>}
                        {file && <div > {file.name}</div>}
                        {file && <ProgressBar file={file} setFile={setFile} url1={nameImage} setURL={setImage} /> }    
                    </div>

                    <label>Solução do Teste:</label>
                    <textarea required value={solution}
                    onChange={(e)=> setSolution(e.target.value)}></textarea>
                    
                    <button>Adicionar Teste</button> 
                    <Link to="/testes">
                        <button>Voltar</button>
                        </Link>
                </form>
            </div>
        </div>
     );
}
 
export default Create;