const { negator } = require('../../../../lib/function');
const { isEmpty } = require('../../../../lib/string');

let readline;

const initReadlineInterface = () => {
  readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const readlineQuestion = (prompt) => {
  return new Promise((resolve) => {
    readline.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

const persistentReadlineQuestion = async (
  prompt,
  accepter = negator(isEmpty)
) => {
  let acceptableAnswer;
  while (!acceptableAnswer) {
    const answer = await readlineQuestion(prompt);
    if (accepter(answer)) {
      acceptableAnswer = answer;
    }
  }
  return acceptableAnswer;
};

const closeReadlineInterface = () => {
  if (readline) {
    readline.close();
  }
};

module.exports = {
  initReadlineInterface,
  readlineQuestion,
  persistentReadlineQuestion,
  closeReadlineInterface,
};