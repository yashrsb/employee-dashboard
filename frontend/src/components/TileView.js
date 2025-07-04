import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './TileView.css';

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      age
      class
    }
  }
`;

function TileView() {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="tile-container">
      {data.employees.map(emp => (
        <div key={emp.id} className="tile">
          <h3>{emp.name}</h3>
          <p>Age: {emp.age}</p>
          <p>Class: {emp.class}</p>
          <button onClick={() => navigate(`/employee/${emp.id}`)}>View</button>
        </div>
      ))}
    </div>
  );
}

export default TileView;
