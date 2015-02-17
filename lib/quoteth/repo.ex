defmodule Quoteth.Repo do
  use Ecto.Repo, otp_app: :quoteth, adapter: Ecto.Adapters.Postgres
  import Ecto.Repo.Config, only: [parse_url: 1]

  # how to do a manual SQL query:
  # Ecto.Adapters.SQL.query(
  #   Quoteth.Repo, "SELECT id, saying, author from quotes
  #   ORDER BY RANDOM() LIMIT 1", [])
  # Notice how you still need to specify the table when using Quoteth.Repo,
  # it just uses the DB connection config from it

  # not sure if this is doing anything, seems to be for an old version of Ecto
  def conf do
    parse_url Application.get_env(:phoenix, :database)[:url]
  end

  # not sure if this is doing anything, seems to be for an old version of Ecto
  def priv do
    Application.app_dir(:quoteth, "priv/repo")
  end

end
