const inquirer = require('inquirer');
const fs = require('fs');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

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
        type: "number",
        name: "managerId",
        message: "What is the team's manager's employee ID?",
        validate(answer) {
            if(!answer) {
                return "Please fill in manager's ID"
            }
            return true
        }
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the team's manager's email address?",
        validate (answer) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address"
            }
            return true
        }
    },
    {
        type: "number",
        name: "managerOffice",
        message: "What is the team's manager's office number?",
        validate(answer) {
            if(!answer) {
                return "Please fill in manager's office number"
            }
            return true
        }
    }
]

const questionsBuildTeam = [
    {
        type: "list",
        name: "addTeam",
        message: "Want to add to your team, or are you finsihed addint to your team?",
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
        type: "number",
        name: "memberId",
        message: "What is the team member's employee ID?",
        when: (answers) => answers.addTeam === 'Engineer' || answers.addTeam === 'Intern',
        validate(answer) {
            if(!answer) {
                return "Please fill in an ID#"
            }
            return true
        }
    },
    {
        type: "input",
        name: "memberEmail",
        message: "What is the team member's email address?",
        when: (answers) => answers.addTeam === 'Engineer' || answers.addTeam === 'Intern',
        validate (answer) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

function createManagerCard(manager){

return `
            <div class="card" style="margin: 5px;">
                <header class="card-header is-flex-direction-column has-background-black">
                    <div class="card-header-title has-text-white">${manager.name}</div>
                    <div class="card-header-title has-text-white">${manager.getRole()}</div>
                </header>
                <div class="card-content">
                    <div class="content">
                        <div class="tile is-size-6">ID: ${manager.id}</div>
                        <div class="tile is-size-6">Email: ${manager.email}</div>
                        <div class="tile is-size-6">Office #: ${manager.officeNumber}</div>
                    </div>
                </div>
            </div>
`;
}

function createEngineerCard(engineer){

    return `
                <div class="card" style="margin: 5px;">
                    <header class="card-header is-flex-direction-column has-background-black">
                        <div class="card-header-title has-text-white">${engineer.name}</div>
                        <div class="card-header-title has-text-white">${engineer.getRole()}</div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="tile is-size-6">ID: ${engineer.id}</div>
                            <div class="tile is-size-6">Email: ${engineer.email}</div>
                            <div class="tile is-size-6">GitHub: ${engineer.getGithub()}</div>
                        </div>
                    </div>
                </div>
    `;
}

function createInternCard(intern){

    return `
                <div class="card" style="margin: 5px;">
                    <header class="card-header is-flex-direction-column has-background-black">
                        <div class="card-header-title has-text-white">${intern.name}</div>
                        <div class="card-header-title has-text-white">${intern.getRole()}</div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="tile is-size-6">ID: ${intern.id}</div>
                            <div class="tile is-size-6">Email: ${intern.email}</div>
                            <div class="tile is-size-6">School: ${intern.school}</div>
                        </div>
                    </div>
                </div>
    `;
}

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

async function init(){
    let cont = true;
    let manager = null;
    let member = null;
    let teamMembers = []

    let manageAnswers = await inquirer
        .prompt(questionsManger)
            .then(answers => {
                // console.info('Manager answers:', answers);
                manager = new Manager(answers.managerName,parseInt(answers.managerId),answers.managerEmail,parseInt(answers.managerOffice));

            });

    while(cont) {
        let teamAnswers = await inquirer
        .prompt(questionsBuildTeam)
            .then(answers => {
                console.info('Build team answers:', answers);
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