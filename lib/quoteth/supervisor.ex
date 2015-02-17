# defmodule Quoteth.Supervisor do
#   use Supervisor

#   def start_link do
#     :supervisor.start_link(__MODULE__, [])
#   end

#   def init(_) do
#     processes = [
#       worker(Repo, []),
#       worker(Quoteth.Endpoint, [])
#     ]

#     supervise(processes, strategy: :one_for_one)
#   end

# end
