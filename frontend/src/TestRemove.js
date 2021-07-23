import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Link} from "react-router-dom";

const TestRemove = () => {
    const {id} =useParams()
    const{data: test ,error , isPending} = useFetch('/test_remove/'+id );

    return (<div className="test-details">
        {isPending && <div>...Loading...</div>}
        {error && <div>{ error }</div>}
        {test && (
            <article>
                <h2> { test.done }</h2>
                <br></br>
                <Link to="/testes"><button>Voltar</button></Link>
            </article>
        )}
    </div>);
}
 
export default TestRemove;