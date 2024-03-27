import React from 'react'
import './App.css';
import Login from './pages/Login'
import Footer from './components/footer/footer';

//testing
function App() {
  return (
    <div >
      <div className="text-white h-[100vh] flex justify-center items-center">
        <Login />        
      </div>
      <Footer />
    </div>
    
  );
}

export default App;
