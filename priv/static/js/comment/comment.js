React.render(
  React.createElement(CommentBox, {url: "http://localhost:4000/api/v1/comments", pollInterval: 2000}),
  document.getElementById("article-comments")
);
