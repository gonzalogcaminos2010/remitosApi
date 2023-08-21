import React from 'react'; // Import the React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import create user component
import CreateRemito from './components/create-remito.component';


//npimport Remito from './components/remito.component';



import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Your header and navigation code here */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Routes>
                
                <Route path="/crear-remito" element={<CreateRemito />} />
                
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

