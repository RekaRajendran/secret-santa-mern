class AssignmentService {
  constructor(employees, previousAssignments = []) {
    this.employees = employees;
    this.previousMap = this.createPreviousMap(previousAssignments);
  }

  createPreviousMap(assignments) {
    const map = new Map();
    assignments.forEach(a => {
      map.set(a.Employee_EmailID, a.Secret_Child_EmailID);
    });
    return map;
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  isValid(giver, receiver) {
    if (giver.Employee_EmailID === receiver.Employee_EmailID) {
      return false;
    }

    if (
      this.previousMap.get(giver.Employee_EmailID) ===
      receiver.Employee_EmailID
    ) {
      return false;
    }

    return true;
  }

  generateAssignments() {
    let attempts = 0;

    while (attempts < 1000) {
      const receivers = this.shuffle([...this.employees]);
      let valid = true;
      const result = [];

      for (let i = 0; i < this.employees.length; i++) {
        if (!this.isValid(this.employees[i], receivers[i])) {
          valid = false;
          break;
        }

        result.push({
          Employee_Name: this.employees[i].Employee_Name,
          Employee_EmailID: this.employees[i].Employee_EmailID,
          Secret_Child_Name: receivers[i].Employee_Name,
          Secret_Child_EmailID: receivers[i].Employee_EmailID
        });
      }

      if (valid) return result;

      attempts++;
    }

    throw new Error("No valid Secret Santa assignment possible.");
  }
}

module.exports = AssignmentService;