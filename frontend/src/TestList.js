import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import React  from 'react';


const TestList = ({ tests, title}) => {
  return (
      <div className="test-list-container">
        <Link to="/create" ><Button>Novo Teste</Button></Link>
        {tests.map(test => (
            <div className="test-preview" key={test.idExam}>
                <h1>{test.nameExam}</h1>
                <img src={test.nameImage} alt="new" />
                <div >
                    <Link to ={`/test/${test.idExam}`}>
                    <Button >Detalhes</Button>
                    </Link>
                </div>
            </div>
        ))}
      </div>
  );
}
 
export default TestList;