const AssignmentService = require("../services/assignmentService");

describe("Secret Santa Assignment", () => {
  const employees = [
    { Employee_Name: "A", Employee_EmailID: "a@test.com" },
    { Employee_Name: "B", Employee_EmailID: "b@test.com" },
    { Employee_Name: "C", Employee_EmailID: "c@test.com" }
  ];

  test("No self assignment", () => {
    const service = new AssignmentService(employees);
    const result = service.generateAssignments();

    result.forEach(r => {
      expect(r.Employee_EmailID)
        .not.toBe(r.Secret_Child_EmailID);
    });
  });

  test("Each receiver unique", () => {
    const service = new AssignmentService(employees);
    const result = service.generateAssignments();

    const receivers = result.map(r => r.Secret_Child_EmailID);
    const unique = new Set(receivers);

    expect(unique.size).toBe(receivers.length);
  });
});