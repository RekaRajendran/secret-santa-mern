class ValidationService {

  // ==============================
  // EMPLOYEE FILE VALIDATION
  // ==============================
  static validateEmployees(employees) {

    if (!Array.isArray(employees) || employees.length === 0) {
      throw new Error("Employees CSV file is empty.");
    }

    if (employees.length < 2) {
      throw new Error("At least 2 employees required.");
    }

    employees.forEach((emp, index) => {

      if (!emp.Employee_Name || !emp.Employee_EmailID) {
        throw new Error(
          `Invalid employee CSV format.`
        );
      }

      if (!this.isValidEmail(emp.Employee_EmailID)) {
        throw new Error(
          `Invalid email format at row ${index + 2}: ${emp.Employee_EmailID}`
        );
      }

    });

    // Duplicate email check
    const emails = employees.map(e => e.Employee_EmailID.trim().toLowerCase());
    const unique = new Set(emails);

    if (unique.size !== emails.length) {
      throw new Error("Duplicate Employee_EmailID found.");
    }
  }


  // ==============================
  // PREVIOUS FILE VALIDATION
  // ==============================
  static validatePreviousAssignments(previous, employees) {

    if (!Array.isArray(previous) || previous.length === 0) {
      throw new Error("Previous assignments CSV file is empty.");
    }

    const employeeEmails = new Set(
      employees.map(e => e.Employee_EmailID.trim().toLowerCase())
    );

    previous.forEach((row, index) => {

      if (!row.Employee_Name ||
        !row.Employee_EmailID ||
        !row.Secret_Child_Name ||
        !row.Secret_Child_EmailID) {
        throw new Error(
          `Invalid previous CSV format .`
        );
      }

      if (!this.isValidEmail(row.Employee_EmailID) ||
          !this.isValidEmail(row.Secret_Child_EmailID)) {
        throw new Error(
          `Invalid email format in previous file.`
        );
      }

      // Check if employee exists in current employee list
      // if (!employeeEmails.has(row.Employee_EmailID.trim().toLowerCase())) {
      //   throw new Error(
      //     `Employee in previous file not found in employee list: ${row.Employee_EmailID}`
      //   );
      // }

    });

  }


  // ==============================
  // EMAIL FORMAT VALIDATION
  // ==============================
  static isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

}

module.exports = ValidationService;
