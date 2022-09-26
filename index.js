const inquirer = require('inquirer');
const fs = require('fs');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

var ids = [];

//Array of inquiry objects for manager questions
const questionsManger = [
    {
        type: "input",
        name: "managerName",
        message: "What is the team's manager's name?",
        validate(answer) {
            if(!answer) {
                return "Please fill in manager's name"
            }
            return true
        }
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the team's manager's employee ID?",
        validate (answer) {
            answer.trim();
            const digitRegex = /^[\d+]+$/;

            if(!digitRegex.test(answer) || ids.includes(answer)) {
                return "You have to provide a valid id number or one that is not in use"
            }
            ids.push(answer);
            return true
        }
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the team's manager's email address?",
        validate (answer) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address"
            }
            return true
        }
    },
    {
        type: "input",
        name: "managerOffice",
        message: "What is the team's manager's office number?",
        validate (answer) {
            answer.trim();
            const digitRegex = /^[\d+]+$/;

            if(!digitRegex.test(answer)) {
                return "You have to provide a valid office number"
            }
            return true
        }
    }
]

//Array of inquiry objects for the different types of employees questions
const questionsBuildTeam = [
    {
        type: "list",
        name: "addTeam",
        message: "Add a new team member? (Use arrows to select from the options.)",
        choices: ['Engineer', 'Intern', 'Finished']
    },
    {
        type: "input",
        name: "memberName",
        message: "What is the team member's name?",
        when: (answers) => answers.addTeam === 'Engineer' || answers.addTeam === 'Intern',
        validate(answer) {
            if(!answer) {
                return "Please fill in a name"
            }
            return true
        }
    },
    {
        type: "input",
        name: "memberId",
        message: "What is the team member's employee ID?",
        when: (answers) => answers.addTeam === 'Engineer' || answers.addTeam === 'Intern',
        validate (answer) {
            answer.trim();
            const digitRegex = /^[\d+]+$/;

            if(!digitRegex.test(answer) || ids.includes(answer)) {
                return "You have to provide a valid id number or one that is not in use"
            }
            ids.push(answer);
            return true
        }
    },
    {
        type: "input",
        name: "memberEmail",
        message: "What is the team member's email address?",
        when: (answers) => answers.addTeam === 'Engineer' || answers.addTeam === 'Intern',
        validate (answer) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address"
            }
            return true
        }
    },
    {
        type: "input",
        name: "memberGithub",
        message: "What is the team member's GitHub username?",
        when: (answers) => answers.addTeam === 'Engineer',
        validate(answer) {
            if(!answer) {
                return "Please fill in a GitHub username"
            }
            return true
        }
    },
    {
        type: "input",
        name: "memberSchool",
        message: "What is the team member's school?",
        when: (answers) => answers.addTeam === 'Intern',
        validate(answer) {
            if(!answer) {
                return "Please fill in a school"
            }
            return true
        }
    }
]

//Returns a manager HTML card using the data from a manager object
function createManagerCard(manager){

return `
            <div class="card" style="margin: 5px;">
                <header class="card-header is-flex-direction-column has-background-black">
                    <div class="card-header-title has-text-white is-size-4">${manager.name}</div>
                    <div class="card-header-title has-text-white"><i class="fas fa-briefcase">&nbsp;${manager.getRole()}</i></div>
                </header>
                <div class="card-content">
                    <table class="table is-bordered">
                            <tbody>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">ID</th>
                                    <td class="is-size-6">${manager.id} </td>
                                </tr>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">Email</td>
                                    <td class="is-size-6"><a href = "mailto: ${manager.email}">${manager.email}</a></td>
                                </tr>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">Office #</td>
                                    <td class="is-size-6">${manager.officeNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
`;
}

//Returns an engineer HTML card using the data from an engineer object
function createEngineerCard(engineer){

    return `
                <div class="card" style="margin: 5px;">
                    <header class="card-header is-flex-direction-column has-background-black">
                        <div class="card-header-title has-text-white is-size-4">${engineer.name}</div>
                        <div class="card-header-title has-text-white"><i class="fas fa-flask">&nbsp;${engineer.getRole()}</i></div>
                    </header>
                    <div class="card-content">
                        <table class="table is-bordered">
                            <tbody>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">ID</th>
                                    <td class="is-size-6">${engineer.id} </td>
                                </tr>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">Email</td>
                                    <td class="is-size-6"><a href = "mailto: ${engineer.email}">${engineer.email}</a></td>
                                </tr>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">GitHub</td>
                                    <td class="is-size-6"><a href = "https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener">${engineer.getGithub()}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    `;
}

//Returns an intern HTML card using the data from an intern object
function createInternCard(intern){

    return `
                <div class="card" style="margin: 5px;">
                    <header class="card-header is-flex-direction-column has-background-black">
                        <div class="card-header-title has-text-white is-size-4">${intern.name}</div>
                        <div class="card-header-title has-text-white"><i class="fas fa-robot">&nbsp;${intern.getRole()}</i></div>
                    </header>
                    <div class="card-content">
                        <table class="table is-bordered">
                            <tbody>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">ID</th>
                                    <td class="is-size-6">${intern.id} </td>
                                </tr>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">Email</td>
                                    <td class="is-size-6"><a href = "mailto: ${intern.email}">${intern.email}</a></td>
                                </tr>
                                <tr> 
                                    <td class="is-size-6 has-text-weight-bold">School</td>
                                    <td class="is-size-6">${intern.school}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    `;
}


//Insert cards into base.html to then create buildTeam.html
function createEmployeeCards(manager,teamMembers){
    const outputFile = "./dist/buildTeam.html";
    const baseFile = "./dist/base.html";

    const data = fs.readFileSync('./dist/base.html',
            {encoding:'utf8', flag:'r'});
    
    const lines = data.split('\n');
    
    fs.writeFileSync(outputFile, ``, (err) => {
        if (err) throw err;
    });

    for (l of lines){

        fs.appendFileSync(outputFile, `${l}\n`, err => { 
            if (err) throw err 
        });

        if (l.includes(`id="teamMembers"`)) {
            // console.log("Can get to Team Members");
        
            fs.appendFileSync(outputFile, createManagerCard(manager), err => { 
                if (err) throw err 
            });
            for (member of teamMembers)
            {
                if (member.getRole() === 'Engineer') {
                    fs.appendFileSync(outputFile, createEngineerCard(member), err => { 
                        if (err) throw err 
                    });

                }
                if (member.getRole() === 'Intern') {
                    fs.appendFileSync(outputFile, createInternCard(member), err => { 
                        if (err) throw err 
                    });
                }
            }
        }
    }

    return true;
}

//Initialize script and launch inquriy questions
async function init(){
    let cont = true;
    let manager = null;
    let member = null;
    let teamMembers = []

    //Prompt user for manager questions
    let manageAnswers = await inquirer
        .prompt(questionsManger)
            .then(answers => {
                // console.info('Manager answers:', answers);
                manager = new Manager(answers.managerName,parseInt(answers.managerId),answers.managerEmail,parseInt(answers.managerOffice));

            });
    
    //Prompt user for manager questions 
    while(cont) {
        let teamAnswers = await inquirer
        .prompt(questionsBuildTeam)
            .then(answers => {
                // console.info('Build team answers:', answers);
                if (answers.addTeam === 'Finished') cont = false;
                else if (answers.addTeam === 'Engineer') {
                    member = new Engineer(answers.memberName,parseInt(answers.memberId),answers.memberEmail,answers.memberGithub);
                    teamMembers.push(member);
                    member = null;

                }
                else if (answers.addTeam === 'Intern') {
                    member = new Intern(answers.memberName,parseInt(answers.memberId),answers.memberEmail,answers.memberSchool);
                    teamMembers.push(member);
                    member = null;
                }
                else {
                    console.log("Invalid value provided for addTeam")
                }
            });
        // console.log(teamMembers);
    }

    createEmployeeCards(manager,teamMembers);
}

init()