## Description

A simple web application built with NestJS that allows users to upload PDF files and extracts text content from them. It automatically cleansup uploded files after extraction and features a ease of use one click solution for copying the extracted text to the clipboard.


## Features 

- Upload PDF Files: Upload a PDF file through a user-friendly minimalistic web interface.
- Text Extraction: Extracts and displays the text content from the uploaded PDF.
- Error Handling: Basic error handling is provided, e.g. invalid file types are rejected gracefully.
- File Size Limit: Ensures uploaded files do not exceed the allowed size (default: 10 MB).
- Automated Cleanup: Deletes uploaded files after processing to save storage space.
- Testing: Basic testing using Jest to ensure reliability.

## Technologies Used

- NestJS: Backend framework.
- Handlebars (HBS): Templating engine for server-side rendered views.
- Multer: Middleware for handling file uploads.
- pdf-parse: Library for extracting text content from PDFs.
- TypeScript: Strongly-typed language for improved developer experience.

## Tiemframe / Deadline Estimation 

The project took about **3** working days to complete.
- Day 1: Researching technologies and frameworks and setting up the basic project.
- Day 2: Implementing file upload functionality and basic UI design.
- Day 3: Implementing tests, fixing issues and UI refinements.


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is licensed under the MIT License.
