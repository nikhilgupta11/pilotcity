/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');

const adkPackagesList = [
  'developer-adk-setup',
  'developer-adk-rfp',
  'developer-adk-discord',
  'developer-adk-teamcommunity',
  'developer-adk-train',
  'developer-adk-research',
  'developer-adk-practice',
  'developer-adk-ideate',
  'developer-adk-pitches',
  'developer-adk-interact',
  'developer-adk-designprototype',
  'developer-adk-demo',
  'developer-adk-autoapply',
  'developer-adk-interview',
  'developer-adk-offer',
  'developer-adk-agreement'
];

adkPackagesList.forEach(package => {
  exec(`npx yalc add ${package}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
