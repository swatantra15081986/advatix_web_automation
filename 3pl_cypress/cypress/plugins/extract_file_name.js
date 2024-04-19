const fs = require('fs')
const path = require('path')

// Code tp extract CSV/ Excel file from Folder

const extract_file_name = ({folder_path, file_extension}) => {
        return new Promise((resolve, reject) => {
            // Read the contents of the folder
            fs.readdir(folder_path, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Filter filenames by the desired extension
                const files_with_desired_extension = files.filter(file => path.extname(file) === file_extension);

                if (files_with_desired_extension.length > 0) {
                    // Resolve with the last filename with the desired extension
                    resolve(files_with_desired_extension[files_with_desired_extension.length - 1]);
                } else {
                    // Reject if no files found with the desired extension
                    reject(new Error(`No files found with extension ${file_extension} in folder ${folder_path}`));
                }
            });
        });
    }


  module.exports = {
    extract_file_name,
  }