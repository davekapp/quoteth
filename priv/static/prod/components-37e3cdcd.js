var converter = new Showdown.converter();

var CommentBox = React.createClass({displayName: "CommentBox",
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
    // enable if you want updates, but disabled for now to make tracking network calls easier
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return(
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });
    return(
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});

var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
        React.createElement("input", {type: "text", placeholder: "Comment", ref: "comment"}), 
        React.createElement("input", {type: "submit", value: "POST"})
      )
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

var CommentHug = React.createClass({displayName: "CommentHug",
  render: function() {
    var text = this.props.hugged ? "❤️ You hugged this! ❤️" : "You haven't hugged this. :(";
    var styles = {border: "1px blue dotted", borderRadius: "3px", fontSize: "50%", display: "inline-block", verticalAlign: "middle", marginLeft: "10px"};

    return(
      React.createElement("div", {onClick: this.props.toggleHug, style: styles}, 
        text, " (Click to change)"
      )
    );
  }
});

var Comment = React.createClass({displayName: "Comment",
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
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author, 
          React.createElement("span", {className: "hug"}, React.createElement(CommentHug, {hugged: this.state.hugged, toggleHug: this.toggleHug}))
        ), 
        React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
    );
  }
});

React.render(
  React.createElement(CommentBox, {url: "http://localhost:4000/api/v1/comments", pollInterval: 2000}),
  document.getElementById("article-comments")
);

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var QuoteBox = React.createClass({displayName: "QuoteBox",
  getInitialState: function() {
    return {quotes: [], hasQuotes: false}
  },

  componentDidMount: function() {
    this.getQuotesFromServer();
    //setTimeout(this.getQuotesFromServer, 200);
  },

  getQuotesFromServer: function() {
    if(!this.state.hasQuotes) {
      $.get(this.props.url, function(data) {
        this.setState({quotes: data, hasQuotes: true});
        setTimeout(this.getQuotesFromServer, this.props.refreshInterval);
      }.bind(this));
    } else {
      this.setState({quotes: [], hasQuotes: false});
      setTimeout(this.getQuotesFromServer, 1000);
    }
  },

  render: function() {
    var quotes = this.state.quotes.map(function(quote) {
      return(
        React.createElement(Quote, {key: quote.id, author: quote.author, saying: quote.saying})
      );
    });

    return(
      React.createElement("div", {className: "quote-box"}, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "quote"}, 
          quotes
        )
      )
    );
  }
});

var Quote = React.createClass({displayName: "Quote",
  render: function() {
    return(
      React.createElement("div", {key: this.props.key, className: "quote-entry"}, 
        React.createElement("h2", null, this.props.saying), 
        React.createElement("h2", null, 
          "   --", this.props.author
        )
      )
    );
  }
})
