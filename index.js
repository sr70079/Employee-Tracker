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

// view all employees by department
const viewByDepartment = () => {    

    inquirer
        .prompt({
          name: 'employByDept',
          type: 'list',
          message: 'Which department would you like to see the employees for?',
          choices: [
              'engineering',
              'finance',
              'legal',
              'sales',
              'exit'
          ],
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
const viewEngineering = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Engineering\' ORDER BY department.name', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );           
};        
//view finance
const viewFinance = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Finance\' ORDER BY department.name', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );           
};        
//view legal
const viewLegal = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Legal\' ORDER BY department.name', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );           
};        
//view sales
const viewSales = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = \'Sales\' ORDER BY department.name', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );           
};        

// view all employees by manager
const viewManager = () => {

    connection.query('select e.first_name as \'Employee First Name\', e.last_name as \'Employee Last Name\', m.first_name as \'Manager First Name\', m.last_name as \'Manager Last Name\' from employee as e left join employee as m on e.id = m.manager_id where m.id is not null order by m.first_name', (err, data) => {
        if(err) throw err;    
            printTable(data);    
            start();
        }         
    );     
    
};

const addEmployee = () => {
    
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is employee first name?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is employee last name?',
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is employee role?',
            choices: [
                'engineering',
                'finance',
                'legal',
                'sales'
            ],
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is employee manager?',
            choices: [
                //list all managers here
            ],
        }
    ]).then((data) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role,
                manager: data.manager,
            },
            (error) => {

                if (error) throw error;
                console.log('Employee has been added successfully!')

                start();
            }
        )
    });
        
    
};

const removeEmployee = () => {

   
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

const addRole = () => {

    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the role you would like to add?"
        }
    ]).then((data) => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: data.title
            },
            (error) => {
                
                if (error) throw error;
                printTable(data)
                console.log("New role has been added.")

                start();
            }
        )
    });

        
    
};

const removeRole = () => {

        
    
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

const addDepartment = () => {

        
    
};

const removeDepartment = () => {


        
    
}; 

connection.connect((err) => {
if (err) throw err;
// run the start function after the connection is made to prompt the user
start();
});


