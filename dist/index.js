let blogs = [];

const show = (html) => {
  const content = document.getElementById('content');
  content.innerHTML = html;
};

const getBlogLinkId = (blog) => {
  return `${blog.title}-LINK`;
};

const Loading = () => {
  return `<p>Loading...</p>`;
};

const Home = ({ blogs }) => {
  return `
  <ul id="blogs-list">
      ${blogs
        .map(
          (blog) =>
            `<li><a id="${getBlogLinkId(blog)}" href="#">${blog.title}</a></li>`
        )
        .join('')}
  </ul>
`;
};

const Blog = ({ blog }) => {
  return `
    <h1>${blog.title}</h1>
    <small>${new Date(blog.timestamp).toLocaleDateString('en-GB')}</small>
    <hr/>
    <article>${blog.content}</article>
  `;
};

const addHomeClickListener = () => {
  const link = document.getElementById('title');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    show(Home({ blogs }));
    addBlogClickListeners(blogs);
  });
};

const addBlogClickListeners = (blogs) => {
  for (const blog of blogs) {
    const link = document.getElementById(getBlogLinkId(blog));
    link.addEventListener('click', (e) => {
      e.preventDefault();
      show(Blog({ blog }));
    });
  }
};

show(Loading());
fetch('blogs/index.json')
  .then((response) => response.json())
  .then((data) => {
    blogs = data.blogs;
    show(Home({ blogs }));
    addHomeClickListener();
    addBlogClickListeners(blogs);
  });
