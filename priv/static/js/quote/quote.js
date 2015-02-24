var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var QuoteBox = React.createClass({
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
        <Quote key={quote.id} author={quote.author} saying={quote.saying} />
      );
    });

    return(
      <div className="quote-box">
        <ReactCSSTransitionGroup transitionName="quote">
          {quotes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Quote = React.createClass({
  render: function() {
    return(
      <div key={this.props.key} className="quote-entry">
        <h2>{this.props.saying}</h2>
        <h2>
          &nbsp; &nbsp;--{this.props.author}
        </h2>
      </div>
    );
  }
})

React.render(
  <QuoteBox url="http://localhost:4000/api/v1/quotes/homepage_quotes" refreshInterval={3300} />,
  document.getElementById("quotes")
);
