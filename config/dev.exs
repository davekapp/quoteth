use Mix.Config

config :quoteth, Quoteth.Endpoint,
  http: [port: System.get_env("PORT") || 4000],
  debug_errors: true,
  cache_static_lookup: false

# Enables code reloading for development
config :phoenix, :code_reloader, true

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# database connection
db_pw = Application.get_env(:database, :password)
config :phoenix, :database, url: "ecto://ecto:#{db_pw}@localhost/quoteth_development"

# ecto repo config
config :quoteth, Quoteth.Repo,
  database: "quoteth_development",
  username: "ecto",
  #password: "",
  hostname: "localhost"
