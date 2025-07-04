const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Role {
    ADMIN
    EMPLOYEE
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
  }

  type User {
    id: ID!
    username: String!
    role: Role!
    token: String
  }

  type Query {
    employees(page: Int, limit: Int, sortBy: String): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String!]!
      attendance: Int!
    ): Employee

    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String!]
      attendance: Int
    ): Employee

    deleteEmployee(id: ID!): Boolean

    login(username: String!, password: String!): User
  }
`;
