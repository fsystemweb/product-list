const fs = require('fs');
const path = require('path');

// Read the environment file
const envFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');
let envFileContent = fs.readFileSync(envFilePath, 'utf-8');

// Replace placeholders with environment variables
envFileContent = envFileContent.replace('{{GRAPHQL_SERVER_URL}}', process.env.GRAPHQL_SERVER_URL);
envFileContent = envFileContent.replace('{{GRAPHQL_SERVER_ID}}', process.env.GRAPHQL_SERVER_ID);
envFileContent = envFileContent.replace(
  '{{GRAPHQL_SERVER_TOKEN}}',
  process.env.GRAPHQL_SERVER_TOKEN
);

// Write the modified content back to the file
fs.writeFileSync(envFilePath, envFileContent);
