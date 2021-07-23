import {Link} from 'react-router-dom';
import React from 'react';


const NavBar = () => {
    return (
        <nav className="navbar">  
            <Link to="/">
                <img src={require("./Daniel.svg").default} alt="logo"></img>
            </Link>
            <ul className="links" >
                <li><Link to="/pacientes">Pacientes</Link></li>
                <li><Link to="/testes">Testes</Link></li>
                <li><Link to="/realizarTeste">Realizar Teste</Link></li>
            </ul> 
        </nav>
      );
}
export default NavBar;