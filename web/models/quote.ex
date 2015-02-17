defmodule Quoteth.Quote do
  use Ecto.Model

  schema "quotes" do
    field :saying, :string
    field :author, :string
  end

  def random(count \\ 1) do
    query = Ecto.Adapters.SQL.query(
      Quoteth.Repo,
      "SELECT id, saying, author FROM quotes ORDER BY RANDOM() LIMIT $1",
      [count]
    )

    %{rows: rows} = query
    Enum.map rows, fn row ->
      {id, saying, author} = row
      %Quoteth.Quote{id: id, saying: saying, author: author}
    end
  end

end
