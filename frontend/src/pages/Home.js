import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import './Home.css';

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
const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $age: Int
    $class: String
  ) {
    updateEmployee(id: $id, name: $name, age: $age, class: $class) {
      id
      name
      age
      class
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;
function Home() {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', age: '', class: '' });
const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

const handleDelete = async (id) => {
  await deleteEmployee({ variables: { id } });
  refetch();
};

const handleSave = async () => {
  await updateEmployee({
    variables: {
      id: editingId,
      name: form.name,
      age: parseInt(form.age),
      class: form.class,
    },
  });
  setEditingId(null);
  refetch();
};
 

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ name: emp.name, age: emp.age, class: emp.class });
  };

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading employees: {error.message}</p>;

  return (
    <div className="dashboard">
      <h1>Employee Dashboard - Home</h1>
      <div className="tile-grid">
        {data.employees.map(emp => (
          <div key={emp.id} className="tile-card">
            {editingId === emp.id ? (
              <>
                <input name="name" value={form.name} onChange={handleFormChange} />
                <input name="age" value={form.age} onChange={handleFormChange} />
                <input name="class" value={form.class} onChange={handleFormChange} />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{emp.name}</h3>
                <p><strong>Age:</strong> {emp.age}</p>
                <p><strong>Class:</strong> {emp.class}</p>
                <div className="actions">
                  <button onClick={() => navigate(`/employee/${emp.id}`)}>View</button>
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Home;
