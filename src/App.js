import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';
import AgregarPlanta from './components/AgregarPlanta';
import Enciclopedia from './components/Enciclopedia'
import TablaPlantas from './components/TablaPlantas';
import EditProfile from './components/editProfile';
import ModifyProfile from './components/ModifyProfile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Envolver la aplicación con QueryClientProvider */}
      <Router>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/agregar" element={<AgregarPlanta />} />
          <Route path="/enciclopedia" element={<Enciclopedia />} />
          <Route path="/modificar" element={<TablaPlantas />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/modify" element={<ModifyProfile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
  
export default App;
