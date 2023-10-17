const { google } = require('googleapis');
const { auth } = require('google-auth-library');
const fs = require('fs');

// Load the credentials from the JSON key file you downloaded
const credentials = JSON.parse(fs.readFileSync('/Users/seohyeonlee/mlh-allin-hack-2023/mutual-aid-map-6ebac4d0d792.json.json'));

// Create a new JWT client with the credentials
const client = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Load the Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: client });

// Specify the Google Sheet ID and the range of data you want to retrieve
const spreadsheetId = '1570210837';
const range = 'Sheet1!A1:C10';

// Retrieve data from the Google Sheet
sheets.spreadsheets.values.get(
  {
    spreadsheetId: spreadsheetId,
    range: range,
  },
  (err, res) => {
    if (err) {
      console.error('The API returned an error:', err);
      return;
    }
    const values = res.data.values;
    if (values.length) {
      console.log('Data from Google Sheets:');
      values.forEach(row => {
        console.log(row.join('\t'));
      });
    } else {
      console.log('No data found.');
    }
  }
);





