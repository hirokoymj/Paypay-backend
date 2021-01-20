const Employee = require("../database/models/employee");
const Performance = require("../database/models/performance");

module.exports = {
  Query: {
    performances: async (_) => {
      try {
        const performances = await Performance.find();
        return performances;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    performance: async (_, { id }) => {
      try {
        const performance = await Performance.findById(id);
        return performance;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createPerformance: async (_, { input }) => {
      try {
        const employee = await Employee.findById(input.employee);

        console.log(employee);
        const performance = new Performance({ ...input });
        const result = await performance.save();
        employee.performances.push(result.id);
        await employee.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deletePerformance: async (_, { id }) => {
      try {
        const performance = await Performance.findByIdAndDelete(id);
        return performance;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updatePerformance: async (_, { id, input }) => {
      try {
        const performance = await Performance.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return performance;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Performance: {
    employee: async (parent) => {
      const employee = await Employee.findById(parent.employee);
      return employee;
    },
    evaluator: async (parent) => {
      const employee = await Employee.findById(parent.employee);
      return employee;
    },
  },
};