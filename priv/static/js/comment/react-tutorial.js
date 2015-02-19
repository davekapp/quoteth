var converter = new Showdown.converter();

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    // optimistically stick the new comment on so we don't have to wait for the response
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    // now tell the server about the new comment
    $.ajax({
      url: this.props.url,
      dataType: "json",
      type: "POST",
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return(
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return(
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Comment" ref="comment" />
        <input type="submit" value="POST" />
      </form>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.comment.getDOMNode().value.trim();
    if(!author || !text) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});

    this.refs.author.getDOMNode().value = "";
    this.refs.comment.getDOMNode().value = "";
  }
});

var CommentHug = React.createClass({
  render: function() {
    var text = this.props.hugged ? "❤️ You hugged this! ❤️" : "You haven't hugged this. :(";
    var styles = {border: "1px blue dotted", borderRadius: "3px", fontSize: "50%", display: "inline-block", verticalAlign: "middle", marginLeft: "10px"};

    return(
      <div onClick={this.props.toggleHug} style={styles}>
        {text} (Click to change)
      </div>
    );
  }
});

var Comment = React.createClass({
  getInitialState: function() {
    return {hugged: false};
  },

  toggleHug: function() {
    this.setState({hugged: !this.state.hugged});
  },

  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    /*
      React automatically escapes things to prevent XSS attacks. For purposes of demoing things here we're
      using Showdown to read the markdown, and we're intentionally injecting the HTML.
      This is normally something that is possibly unsafe and so the React syntax
      for it isn't especially pretty.

      This also means we're 100% relying on Showdown to be secure. Good practice? Maybe not.
      But for purposes of demoing things, fine.
    */
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
          <span className="hug"><CommentHug hugged={this.state.hugged} toggleHug={this.toggleHug} /></span>
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

React.render(
  <CommentBox url="http://localhost:4000/api/v1/comments" pollInterval={2000} />,
  document.getElementById("article-comments")
);
