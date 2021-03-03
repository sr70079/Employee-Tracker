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


const viewByDepartment = () => {    

    inquirer
        .prompt({
          name: 'employByDept',
          type: 'list',
          message: 'Which department would you like to see the employees for?',
          choices: getDepartments()
        })
        .then((answer) => {
        if (answer.employByDept === 'engineering') {
            viewEngineering();
        } else if (answer.employByDept === 'finance') {
            viewFinance();
        }  else if (answer.employByDept === 'legal') {
            viewLegal();
        } else if (answer.employByDept === 'sales') {
            viewSales();
        } else {
            start();
        }

        
    });
}
//view engineers
// const viewEngineering = () => {
//     connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Engineering\' ORDER BY department.name', (err, data) => {
//         if(err) throw err;    
//             printTable(data);    
//             start();
//         }         
//     );           
// };        
//view finance
// const viewFinance = () => {
//     connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Finance\' ORDER BY department.name', (err, data) => {
//         if(err) throw err;    
//             printTable(data);    
//             start();
//         }         
//     );           
// };        
//view legal
// const viewLegal = () => {
//     connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Legal\' ORDER BY department.name', (err, data) => {
//         if(err) throw err;    
//             printTable(data);    
//             start();
//         }         
//     );           
// };        
// view sales
// const viewSales = () => {
//     connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Sales\' ORDER BY department.name', (err, data) => {
//         if(err) throw err;    
//             printTable(data);    
//             start();
//         }         
//     );           
// };        

// view all employees by manager
const viewManager = () => {
    connection.query('select e.first_name as \'Employee First Name\', e.last_name as \'Employee Last Name\', m.first_name as \'Manager First Name\', m.last_name as \'Manager Last Name\' from employee as e left join employee as m on e.manager_id = m.id where m.id is not null order by m.first_name', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );      
};

//add new employee
const addEmployee = () => {
    connection.query('SELECT * FROM role', (err, data) => {
        const allRoles = data.map((allRoles) => {
            return {
                value: allRoles.id,
                name: allRoles.title 
            }
        });    
        if (err) throw err; 
        connection.query('SELECT CONCAT(first_name, " ", last_name) as \'name\', id FROM employee WHERE id in (select manager_id from employee)', (err, data) => {
            const allManagers = data.map((employee) => {
                return {
                    value: employee.id,
                    name: employee.name
                }
            });
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'What is employee\'s first name?',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is employee\'s last name?',
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What is employee\'s role?',
                    choices: allRoles
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Who is employee\'s manager?',
                    choices: allManagers
                }
            ]).then((data) => {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role,
                        manager_id: data.manager,
                    },
                    (err) => {
        
                        if (err) throw err;
                        console.log('Employee has been added successfully!')
        
                        start();
                    }
                )
            });        
        });     
    });       
};

//remove existing employee
const removeEmployee = () => {
    connection.query('SELECT CONCAT(first_name, " ", last_name) as \'name\', id FROM employee', (err, data) => {
        const allEmployees = data.map((allEmployees) => {
            return {
                value: allEmployees.id,
                name: allEmployees.name,
            }
        })
        if(err) throw err;
        inquirer.prompt([
            {
                name: 'removeEmployee',
                type: 'list',
                message: 'Which employee would you like to remove?',
                choices: allEmployees

            },
        ]).then((data) => {
            connection.query(
                `DELETE FROM employee WHERE id=${data.removeEmployee}`);
            if (err) throw err;
            console.log('Employee has been removed successfully!')

            start();
        });          
    });   
};

const updateEmployeeRole = () => {

        
    
};

const updateEmployeeManager = () => {

        
    
};

// view all roles of employees
const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );        
};

//add new role
const addRole = () => {    
    connection.query('SELECT * FROM department', (err, data) => {
        const allDepartments = data.map((allDepartments) => {
            return {
                value: allDepartments.id,
                name: allDepartments.name 
            }
        })
        if(err) throw err;
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",                
                message: "What is the title of the role you would like to add?"
            },
            {
                name: "roleSalary",
                type: "input",                
                message: "What is the salary of the role you would like to add?"
            },
            {
                name: 'roleDepartment',
                type: 'list',
                message: 'Which department would you like to add role to?',
                choices: allDepartments

            },
        ]).then((data) => {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: data.roleTitle,
                    salary: data.roleSalary,
                    department_id: data.roleDepartment 
                },
                (err) => {
                    
                    if (err) throw err;
                    console.log("New role has been added successfully!")
    
                    start();
                }
            )
        });          
    });      
};

//remove existing role
const removeRole = () => {
    connection.query('SELECT * FROM role', (err, data) => {
        const allRoles = data.map((allRoles) => {
            return {
                value: allRoles.id,
                name: allRoles.title 
            }
        });
        if(err) throw err;
        inquirer.prompt([
            {
                name: 'removeRole',
                type: 'list',
                message: 'Which role would you like to remove?',
                choices: allRoles

            },
        ]).then((data) => {
            connection.query(
                `DELETE FROM role WHERE id=${data.removeRole}`);
            if (err) throw err;
            console.log('Role has been removed successfully!')

            start();
        });          
    })    
}; 

// view all departments of employees
const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, data) => {
        if(err) throw err;  
            printTable(data);    
            start();
        }       
    );      
};

//add a new department 
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'addDepartment',
            type: 'input',
            message: 'What type of department would you like to add?',
        },
    ]).then((data) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: data.addDepartment
            },
            (error) => {

                if (error) throw error;
                console.log('Department has been added successfully!')

                start();
            }
        )
    });    
};

//remove existing department
const removeDepartment = () => {
    connection.query('SELECT * FROM department', (err, data) => {
        const allDepartments = data.map((allDepartments) => {
            return {
                value: allDepartments.id,
                name: allDepartments.name 
            }
        })
        if(err) throw err;
        inquirer.prompt([
            {
                name: 'removeDepartment',
                type: 'list',
                message: 'Which department would you like to remove?',
                choices: allDepartments

            },
        ]).then((data) => {
            connection.query(
                `DELETE FROM department WHERE id=${data.removeDepartment}`);
            if (err) throw err;
            console.log('Department has been removed successfully!')

            start();
        });          
    })    
}; 

connection.connect((err) => {
if (err) throw err;
// run the start function after the connection is made to prompt the user
start();
});


