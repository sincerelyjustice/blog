const { addBlog } = require('./core/add');
const { removeBlog } = require('./core/remove');

const [command, argument] = process.argv.slice(2);

if (!command) {
  help();
  process.exit();
}

const expectArgument = () => {
  if (!argument) {
    console.log(
      'Expected an argument. Use "blog -h" or "blog --help" for assistance.'
    );
    process.exit();
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
  case ('-h', '--help'):
    help();
  default:
    console.log(
      'Invalid command. Use "blog -h" or "blog --help" for assistance.'
    );
}
