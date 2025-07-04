import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { client } from './apolloClient';
import Home from './pages/Home';
import EmployeeDetails from './components/EmployeeDetails';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
