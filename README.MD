# Hospital Management System Test

This is a test project in React Native aimed at developing a Hospital Management System. The application consists of three screens and utilizes Firebase as the database. The functionality of each screen is described below:

## Screens

### Screen 1: Create Program

The first screen allows users to create a program. It provides input fields to enter relevant details of the program, such as program name, date, and description. Upon clicking the "Consigne" button, it will navigate to the second screen.

### Screen 2: Text Editor

The second screen displays a text editor where users can input and edit program instructions or consignments. Users can enter the necessary content using the available editing options. Once the changes are made, users can save the content, which will navigate them back to the third screen.

### Screen 3: Program List

The third screen presents a list of programs created by the user. Each program item is displayed with relevant details, such as program name, date, and description. Users can click on the plus icon to open the first screen and create a new program. Additionally, clicking on an existing program item will open the first screen, displaying the selected program's details for updating.

## Firebase Integration

Firebase is utilized as the database for storing and retrieving program data. The application connects to Firebase using appropriate credentials and interacts with the database to perform operations such as creating new programs, updating existing ones, and retrieving program information.

## Getting Started

To run the Hospital Management System test application, follow the steps below:

1. Clone the repository: `git clone https://github.com/Nanfack-Takoutsi-Yvan/HMS.git`
2. Navigate to the project directory: `cd HMS`
3. Install the dependencies: `npm install`
4. Set up Firebase credentials in the project by providing the necessary configuration details.
5. Start the development server: `npm start`
6. Run the application on a connected device or emulator using the appropriate command.

## Dependencies

The following dependencies are used in this test project:

* React Native
* Firebase
* [Additional dependencies specific to your project]

Please make sure to install these dependencies before running the application.

## Contribution

If you wish to contribute to this project, you are welcome to submit pull requests. However, please note that this project is solely intended for testing purposes.

## License

This project is licensed under the [MIT License](https://chat.openai.com/LICENSE).

Feel free to reach out if you have any questions or need further assistance. Enjoy testing the Hospital Management System application!
