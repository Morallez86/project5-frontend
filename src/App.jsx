import React from 'react'
import './App.css';
import Login from './pages/Login'
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App" id="outer-container">
      <div className="page-wrap" id="app-page-wrap">
        <h1> Welcome to this cool Application</h1>
        <Login />
        <Footer />
      </div>
    </div>
  );
}

export default App;
