defmodule Quoteth.Endpoint do
  use Phoenix.Endpoint, otp_app: :quoteth

  # Serve at "/" the given assets from "priv/static" directory
  plug Plug.Static,
    at: "/", from: :quoteth,
    only: ~w(css images js favicon.ico robots.txt)

  plug Plug.Logger

  # Code reloading will only work if the :code_reloader key of
  # the :phoenix application is set to true in your config file.
  plug Phoenix.CodeReloader

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head


  signing_salt = Application.get_env(:session, :signing_salt)
  encryption_salt = Application.get_env(:session, :encryption_salt)
  plug Plug.Session,
    store: :cookie,
    key: "_quoteth_key",
    signing_salt: signing_salt,
    encryption_salt: encryption_salt

  plug :router, Quoteth.Router
end
