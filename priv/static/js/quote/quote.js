React.render(
  React.createElement(QuoteBox, {url: "http://localhost:4000/api/v1/quotes/homepage_quotes", refreshInterval: 3300}),
  document.getElementById("quotes")
);
