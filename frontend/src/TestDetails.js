import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React  from 'react';
import {useHistory} from "react-router-dom";

const TestDetails = () => {
    const {id} =useParams()
    const{data: test ,error , isPending} = useFetch('/test/'+ id );

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();

    return (<div className="test-details-container">
        {isPending && <div>...Loading...</div>}
        {error && <div>{ error }</div>}
        {test && (
            <div className="test-details">
                <h2 className="test-details-name"> Detalhes do Teste</h2>
                <h4> Nome: <div className="test-info-container"></div><div className="test-info">{ test.nameExam }</div></h4>
                <h4>Imagem do teste: <div className="test-details-image" ><img src={test.nameImage} alt="new"/></div></h4>
                <h4>Dificuldade: <div className="test-info-container"></div><div className="test-info">{ test.dificulty }</div></h4>
                <h4>Observações: <div className="test-info-container"></div><div className="test-info">{ test.observations }</div></h4>
                <h4>Solução: </h4>
                <div className="test-info-exams">
                    <h5>{ test.solution }</h5>
                </div>
                <div className="test-details-buttons">
                    <Link to="/testes"><Button>Voltar</Button></Link>
                    <Link onClick={handleShow}><Button > Remover </Button></Link>
                </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header  closeButton>
                            <Modal.Title>Remover Teste </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{'Quer apagar o teste ' + test.nameExam + ' ? '}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={() => history.push(`/test_remove/${id}`)}>
                                Remover
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )}
    </div>  );
}
 
export default TestDetails;