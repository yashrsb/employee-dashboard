import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './GridView.css';

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

function GridView() {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="grid">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Class</th><th>Subjects</th><th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {data.employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.age}</td>
              <td>{emp.class}</td>
              <td>{emp.subjects.join(', ')}</td>
              <td>{emp.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridView;
