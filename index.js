const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: '12345678',
    database: 'employees',
  });
 
  
// function which prompts the user for what action they should take
const start = () => {
    inquirer
      .prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager', 'View all roles', 'Add role', 'Remove role', 'View all departments', 'Add department', 'Remove department', 'Quit'],
      })
      .then((answer) => {
        // based on their answer, goes to choice made
        if (answer.viewEmployee === 'View all employees') {
            viewEmployee();
        } else if (answer.viewByDepartment === 'View all employees by department') {
            viewByDepartment();
        } 
        else if (answer.viewByDepartment === 'View all employees by department') {
            viewByDepartment();
          }
        else if (answer.viewManager === 'View all employees by manager') {
            viewManager();
        }
        else if (answer.addEmployee === 'Add employee') {
            addEmployee();
        }
        else if (answer.removeEmployee === 'Remove employee') {
            removeEmployee();
        }
        else if (answer.updateEmployeeRole === 'Update employee role') {
            updateEmployeeRole();
        }
        else if (answer.updateEmployeeManager === 'Update employee manager') {
            updateEmployeeManager();
        }
        else if (answer.viewRoles === 'View all roles') {
            viewRoles();
        }
        else if (answer.addRole === 'Add role') {
            addRole();
        }
        else if (answer.removeRole === 'Remove role') {
            removeRole();
        }
        else if (answer.viewAllDepartments === 'View all departments') {
            viewAllDepartments();
        }
        else if (answer.addDepartment === 'Add department') {
            addDepartment();
        }
        else if (answer.removeDepartment === 'Remove department') {
            removeDepartment();
        }
        else {
            connection.end();
        }
      });
  };
  


connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });


