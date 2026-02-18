class ValidationService {
  static validateEmployees(employees) {
    if (employees.length < 2) {
      throw new Error("At least 2 employees required.");
    }

   

    employees.forEach(emp => {
      if (!emp.Employee_EmailID || !emp.Employee_Name) {
        throw new Error("Invalid employee CSV format.");
      }
    });

     const emails = employees.map(e => e.Employee_EmailID);
    const unique = new Set(emails);

    if (unique.size !== emails.length) {
      throw new Error("Duplicate Employee_EmailID found.");
    }

  }
}

module.exports = ValidationService;