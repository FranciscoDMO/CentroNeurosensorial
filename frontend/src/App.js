import NavBar from './NavBar';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Create from './Create';
import TestDetails from './TestDetails';
import Testes from './Testes';
import TestRemove from './TestRemove';
import CreatePatient from './CreatePatient';
import PatientDetails from './PatientDetails';
import Pacientes from './Pacientes';
import PatientRemove from './PatientRemove';
import PatientCSV from './PatientCSV';
import React from 'react';
import MakeTest from './MakeTest';
import Evaluation from "./Evaluation";


function App() {
  return (
    <div className="background-app">
      <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Switch>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/test/:id">
              <TestDetails/>
            </Route>
            <Route path="/testes">
              <Testes/>
            </Route>
            <Route path="/test_remove/:id">
              <TestRemove/>
            </Route>
            <Route path="/createPatient">
              <CreatePatient />
            </Route>
            <Route path="/patient/:id">
              <PatientDetails/>
            </Route>
            <Route path="/pacientes">
              <Pacientes/>
            </Route>
            <Route path="/patientCSV/:id">
              <PatientCSV/>
            </Route>
            <Route path="/patient_remove/:id">
              <PatientRemove/>
            </Route>
            <Route path="/realizarTeste">
              <MakeTest />
            </Route>
            <Route path="/evaluation/:idExam/:idPatient/:ommited/:wrongs/:repeated/:exchange/:others/:subSeq/:end/:answer">
              <Evaluation />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  </div>
  );
}

export default App;
