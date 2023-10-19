const { addBlog } = require('./core/add');
const { help } = require('./core/help');
const { removeBlog } = require('./core/remove');

const [command, argument] = process.argv.slice(2);

if (!command) {
  help();
  process.exit(1);
}

const expectArgument = () => {
  if (!argument) {
    console.log(
      'Expected an argument. Use "blog -h" or "blog --help" for assistance.'
    );
    process.exit(1);
  }
};

switch (command) {
  case 'add':
    expectArgument();
    addBlog(argument);
    break;
  case 'remove':
    expectArgument();
    removeBlog(argument);
    break;
  case '-h':
  case '--help':
    help();
    break;
  default:
    console.log(
      'Invalid command. Use "blog -h" or "blog --help" for assistance.'
    );
}
