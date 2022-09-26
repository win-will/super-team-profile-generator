# Super Team Profile Generator

## Description
This application takes information about employees on a software engineering team, then generates an HTML webpage that displays summaries for each person.

## User Story

```md
AS A manager
I WANT to generate a webpage that displays my team's basic info
SO THAT I have quick access to their emails and GitHub profiles
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address
WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab
WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
```

## Video Walkthrough

![Answer the questions to build "My Team" HTML page.](https://drive.google.com/file/d/1L3CuXKeZTg0lUUOEDXZf8nNrCUzGMny2/view)


## Screenshots

The following images shows a mock-up of the generated HTML’s appearance and functionality, as well as the console information provided to generate it.

![HTML webpage titled “My Team” features three boxes listing employee names, titles, and other key info.](./assets/images/webpage-screenshot.png)

![Console showing how employee names, titles, and other key info are gathered.](./assets/images/console-screenshot.png)