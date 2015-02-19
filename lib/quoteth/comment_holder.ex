defmodule Quoteth.CommentHolder do
  @name __MODULE__

  def start_link, do: Agent.start_link(fn -> [] end, name: @name)

  def add_comment(comment),
  do: Agent.update(@name, &([comment | &1]))

  def all_comments(),
  do: Agent.get(@name, &(Enum.reverse &1))
end
