const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require("console-table-printer");



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
        choices: ['View all employees', 
        'View all employees by department', 
        'View all employees by manager', 
        'Add employee', 
        'Remove employee', 
        'Update employee role', 
        'Update employee manager', 
        'View all roles', 
        'Add role', 
        'Remove role', 
        'View all departments', 
        'Add department', 
        'Remove department', 
        'Quit'],
      })
      .then((answer) => {
        // based on their answer, goes to choice made
        if (answer.start === 'View all employees') {
            viewEmployee();
        } else if (answer.start === 'View all employees by department') {
            viewByDepartment();
        }  else if (answer.start === 'View all employees by department') {
            viewByDepartment();
        }  else if (answer.start === 'View all employees by manager') {
            viewManager();
        } else if (answer.start === 'Add employee') {
            addEmployee();
        } else if (answer.start === 'Remove employee') {
            removeEmployee();
        } else if (answer.start === 'Update employee role') {
            updateEmployeeRole();
        } else if (answer.start === 'Update employee manager') {
            updateEmployeeManager();
        } else if (answer.start === 'View all roles') {
            viewRoles();
        } else if (answer.start === 'Add role') {
            addRole();
        } else if (answer.start === 'Remove role') {
            removeRole();
        } else if (answer.start === 'View all departments') {
            viewAllDepartments();
        } else if (answer.start === 'Add department') {
            addDepartment();
        } else if (answer.start === 'Remove department') {
            removeDepartment();
        } else {
            connection.end();
        }
      });
  };

//  function to view table of employee
  const viewEmployee = () => {

        connection.query('SELECT * FROM employee', (err, data) => {
            if(err) throw err;        

                printTable(data);
    
                start();
            }           
    
        );          
      
    };

    const viewEmployee = () => {

            
      
    };

    const viewAllDepartments = () => {

        connection.query('SELECT * FROM department', (err, data) => {
            if(err) throw err;        

                printTable(data);
    
                start();
            }           
    
        );      
    };
  
  


connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });


