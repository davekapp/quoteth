defmodule Quoteth.QuoteController do
  use Phoenix.Controller
  require Logger

  alias Quoteth.Repo
  alias Quoteth.Router
  import Quoteth.Router.Helpers

  plug :action

  def homepage(conn, _params) do
    Logger.info "params are: #{inspect _params}"

    conn
    |> assign(:quotes, Quoteth.Quote.random(2))
    |> render "homepage.html"
  end

  def index(conn, _params) do
    conn
    |> assign(:quotes, Repo.all(Quoteth.Quote))
    |> render "index.html"
  end

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"quote" => new_quote}) do
    %{"saying" => saying, "author" => author} = new_quote
    q = %Quoteth.Quote{saying: saying, author: author}
    Repo.insert(q)

    redirect conn, to: quote_path(conn, :index)
  end

  def show(conn, %{"id" => id}) do
    {id, _rest_of_binary} = Integer.parse(id)

    conn
    |> assign(:quote, Repo.get(Quoteth.Quote, id))
    |> render("show.html")
  end

  def edit(conn, %{"id" => id}) do
    {id, _rest_of_binary} = Integer.parse(id)

    conn
    |> assign(:quote, Repo.get(Quoteth.Quote, id))
    |> render("edit.html")
  end

  def update(conn, %{"id" => id, "quote" => existing_quote}) do
    %{"saying" => saying, "author" => author} = existing_quote
    {id, _rest_of_binary} = Integer.parse(id)
    q = Repo.get(Quoteth.Quote, id)
    q = %Quoteth.Quote{q | saying: saying, author: author}
    Repo.update(q)

    redirect conn, to: quote_path(conn, :show, q.id)
  end

  def delete(conn, %{"id" => id}) do
    {id, _rest_of_binary} = Integer.parse(id)
    q = Repo.get(Quoteth.Quote, id)
    Repo.delete(q)

    redirect conn, to: quote_path(conn, :index)
  end
end
