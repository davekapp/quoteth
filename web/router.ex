defmodule Quoteth.Router do
  use Phoenix.Router

  pipeline :browser do
    plug :accepts, ~w(html)
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ~w(json)
  end

  scope "/", Quoteth do
    pipe_through :browser # Use the default browser stack

    get "/", QuoteController, :homepage
    resources "/quotes", QuoteController

    get "/article", CommentController, :article
  end

  scope "/api/v1/", Quoteth do
    pipe_through :api

    get "/comments", CommentController, :index
    post "/comments", CommentController, :create
  end

  # Other scopes may use custom stacks.
  # scope "/api", Quoteth do
  #   pipe_through :api
  # end
end
