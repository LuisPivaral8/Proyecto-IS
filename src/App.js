import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import AgregarPlanta from './components/AgregarPlanta';
import Enciclopedia from './components/Enciclopedia';
import TablaPlantas from './components/TablaPlantas';
import EditProfile from './components/editProfile';
import ModifyProfile from './components/ModifyProfile';

const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <Routes>
                  {/* Rutas para LoginForm y SignupForm, sin Navbar */}
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/signup" element={<SignupForm />} />

                  {/* Rutas protegidas con Navbar */}
                  <Route
                      path="/*"
                      element={
                          <>
                              <Navbar />
                              <div className='myContent'>
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="agregar" element={<AgregarPlanta />} />
                                    <Route path="enciclopedia" element={<Enciclopedia />} />
                                    <Route path="modificar" element={<TablaPlantas />} />
                                    <Route path="modify" element={<ModifyProfile />} />
                                </Routes>
                              </div>
                              
                          </>
                      }
                  />
              </Routes>
          </Router>
      </QueryClientProvider>
  );
};

export default App;
