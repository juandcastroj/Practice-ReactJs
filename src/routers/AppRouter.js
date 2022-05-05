import React from 'react'
import {BrowserRouter as Router, 
    Routes,
    Route,
    Navigate} 
    from 'react-router-dom';
import Forms from '../components/Forms';
 import  List  from '../components/List';
import { Naveg } from '../components/Naveg';



const AppRouter = () => {

  return (
        <div>
            <Router>
             <Naveg/> 
                <Routes>
                    <Route path="/" element={<List/>}/>
                    <Route path="/form" element={<Forms/>}/>
                    <Route path="/*" element={<Navigate to="/"/>}/>
                </Routes>
            </Router>
        </div>
  )
}

export default AppRouter