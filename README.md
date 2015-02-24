# Quoteth

## What is this?

This is a small sandbox application I made using Elixir & Phoenix to see how things in it work. It also has a bunch of ReactJS for the same reason. I've uploaded this to GitHub in the hopes that someone else might find it useful.


## How to install & set things up

First off, you need to install Elixir 1.0.2. Odds are any 1.0.x will work though, if you already have one.

Next, install the lib dependencies with mix:

1. Install dependencies with `mix deps.get`
2. Set up your settings.exs file over in config/. There's a settings_sample.exs included there that you can modify, just make sure you save it as settings.exs. (This file is in .gitignore so you don't accidentally uploading anything sensitive to the world at large.)
3. Set up database with `mix ecto.create` `mix ecto.migrate`
4. Start Phoenix endpoint with `mix phoenix.server`

Now you can visit `localhost:4000` from your browser.

Take a look at the routes with `mix phoenix.routes` and see what else you can do. :)
