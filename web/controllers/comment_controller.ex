defmodule Quoteth.CommentController do
  use Phoenix.Controller
  require Logger

  alias Quoteth.Repo
  alias Quoteth.Router
  import Quoteth.Router.Helpers

  plug :action

  def article(conn, _params) do
    conn
    |> render "article.html"
  end

  def index(conn, _params) do
    # comments = [
    #   %{author: "Bob Dole", text: "SUP YALL IM BOB DOLE"},
    #   %{author: "Test Person", text: "No *need* to yell, Bob."}
    # ]

    json conn, Quoteth.CommentHolder.all_comments
  end

  def create(conn, %{"author" => author, "text" => text} ) do
    Quoteth.CommentHolder.add_comment(%{author: author, text: text})

    json conn, Quoteth.CommentHolder.all_comments
  end
end
