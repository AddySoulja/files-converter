# MERN File Conversion Application

This is a MERN (MongoDB, Express, React, Node.js) application that allows users to convert files from one format to another. It provides a user-friendly interface to upload files, convert them, and download the converted files.

## Features

- File upload: Users can upload files of various formats.
- File conversion: The application supports converting files from one format to another.
- Supported file formats: The application supports conversion between popular file formats such as PDF, Word (DOC/DOCX), and more.
- Download converted files: Users can download the converted files once the conversion is complete.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.
- MongoDB: Install MongoDB and make sure it's running.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/AddySoulja/files-converter.git
   ```

2. Install dependencies:

   ```bash
   cd pdfconverter
   npm install
   ```

3. Configure the server:

   - Create a `.env` file in the root directory based on the `.env.example` file.
   - Update the MongoDB connection URL in the `.env` file.

4. Start the server:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:5000`.

5. Set up the client:

   - Open a new terminal and navigate to the `pdfconverter` directory:

     ```bash
     cd pdfconverter
     ```

   - Install client dependencies:

     ```bash
     npm install
     ```

6. Start the client:

   ```bash
   npm start
   ```

   The client will open in your default browser at `http://localhost:3000`.

7. Start converting files!

## Folder Structure

The project structure is set up as follows:

```
pdfconverter/
  |- pdfconverter/                 # React client application
  |- models/                 # MongoDB models
  |- routes/                 # Express routes
  |- controllers/            # Request handlers/controllers
  |- utils/                  # Utility functions
  |- .env.example            # Example environment variables
  |- .gitignore              # Git ignore file
  |- index.js                # Express server application
  |- package.json            # Server package.json
  |- client/package.json     # Client package.json
  |- README.md               # Project README file
```

## Technologies Used

- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- File Conversion: pdf-lib

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your branch: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Submit a pull request.


## Contact

For any questions or inquiries, please contact **adityadhanraj1357@gmail.com**.

---
