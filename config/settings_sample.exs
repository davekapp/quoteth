use Mix.Config

config :endpoint, :secret_key_base, "abc123"

config :database, :password, "secretpw"

config :session, :signing_salt, "abc123"
config :session, :encryption_salt, "123abc"
