const help = () => {
  console.log(`
Usage: blog <command> [options]

Commands:
  add <path-to-file.txt>         Add a new blog post
  remove <blog-title>            Remove a blog post by its title
  -h, --help                     Print this help message

Examples:
  blog add ./my-post.txt         Adds a new blog post from my-post.txt
  blog remove "My Post"          Removes the blog post titled "My Blog Title"
  blog --help                    Prints this help message
`);
};

module.exports = { help };
