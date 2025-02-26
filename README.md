npm run dev → run the application directly using ts-node without converting the files.

npm run build → convert all files in src/ to JavaScript in dist/.

npm start → run the application from the converted JavaScript files in dist/.


files in src:

config/          # config files like database config

routes/          # define all routes

controllers/     # the logic of the application

services/        # the business logic

entities/        # define the entities of the database

middleware/      # any additional middleware

uploads/         # any additional uploads

utils/           # helper codes

validations/     # codes to validate the data

server.ts        # the main file to run the application

