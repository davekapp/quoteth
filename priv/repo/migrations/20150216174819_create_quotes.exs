defmodule Quoteth.Repo.Migrations.CreateQuotes do
  use Ecto.Migration

  def up do
    # can do this with a string using execute (for raw SQL)
    # execute "CREATE TABLE quotes(
    #    id serial primary key,
    #    saying varchar(255),
    #    author varchar(255)
    #  )"

    # or using a nice little DSL
    create table(:quotes) do
      # note that a serial id is automatically added unless you say not to
      add :saying, :string
      add :author, :string
    end
  end

  def down do
    # can do this with a string using execute (for raw SQL)
    # execute "DROP TABLE quotes"

    # or using a DSL, which is nicer to read
    drop table(:quotes)
  end
end
