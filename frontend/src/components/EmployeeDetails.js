import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './EmployeeDetails.css';

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EMPLOYEE, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { name, age, class: className, subjects, attendance } = data.employee;

  return (
    <div className="details-view">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Class: {className}</p>
      <p>Subjects: {subjects.join(', ')}</p>
      <p>Attendance: {attendance}</p>
      <button onClick={() => navigate('/')}>Back to Tiles</button>
    </div>
  );
}

export default EmployeeDetails;
