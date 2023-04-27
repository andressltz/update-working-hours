# update-working-hours

### Installation
- Clone the repository using `git clone <repository-url>` command.
- Navigate to the project directory.
- Create a `.env` based on `.env.example` file in the root directory, and add the URL that has the current list of working days at `PROJECT_URL`
- Install all the dependencies by running `yarn` in the terminal.

### Running the Project
- Run `yarn start` to start the project.

### Customizing Options
- To change the activity description, which will be written in the message field,
 open `constants.js` file, and change the value of `ACTIVITY_TYPE` constant. The default value is 'Desenvolvimento'.
- To change the activity type at dropdown selector, find the index of your activity in the dropdown options, and update the `DROPDOWN_OPTION` constant in `constants.js` file. The default value is `option-8`, which represents 'desenvolvimento'.
