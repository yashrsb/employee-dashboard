const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    employees: async (_, { page = 1, limit = 10, sortBy = 'name' }) => {
      return await Employee.find()
        .sort({ [sortBy]: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
  },
  Mutation: {
    addEmployee: async (_, args, context) => {
      //if (context.user?.role !== 'ADMIN') throw new Error('Not authorized');
      const emp = new Employee(args);
      return await emp.save();
    },
    updateEmployee: async (_, { id, ...updates }, context) => {
      //if (context.user?.role !== 'ADMIN') throw new Error('Not authorized');
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    updateEmployee: async (_, { id, ...updates }, context) => {
        //if (context.user?.role !== 'ADMIN') throw new Error('Not authorized');
        return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteEmployee: async (_, { id }, context) => {
        //if (context.user?.role !== 'ADMIN') throw new Error('Not authorized');
        await Employee.findByIdAndDelete(id);
        return true;
    },
    login: async (_, { username, password }) => {
      const users = [
        { id: 1, username: 'admin', password: 'admin123', role: 'ADMIN' },
        { id: 2, username: 'employee', password: 'emp123', role: 'EMPLOYEE' }
      ];

      const user = users.find(u => u.username === username && u.password === password);
      if (!user) throw new Error('Invalid credentials');

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
      return { ...user, token };
    }
  }
};

module.exports = resolvers;
