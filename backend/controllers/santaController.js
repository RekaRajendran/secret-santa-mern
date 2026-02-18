const parseCSV = require("../utils/csvParser");
const generateCSV = require("../utils/csvGenerator");
const AssignmentService = require("../services/assignmentService");
const ValidationService = require("../services/validationService");

exports.generateSecretSanta = async (req, res, next) => {
  try {
    if (!req.files?.employees) {
      throw new Error("Employees CSV file is required.");
    }

    const employees = await parseCSV(req.files.employees[0].buffer);

    // const previous = req.files.previous
    //   ? await parseCSV(req.files.previous[0].buffer)
    //   : [];
    let previous = [];
    if (req.files.previous) {
      previous = await parseCSV(req.files.previous[0].buffer);

      ValidationService.validatePreviousAssignments(
        previous,
        employees
      );
    }
    ValidationService.validateEmployees(employees);
    
    const service = new AssignmentService(employees, previous);
    const result = service.generateAssignments();

    const csv = generateCSV(result);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=secret_santa.csv"
    );

    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};