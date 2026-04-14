
type 'a option =
| Some of 'a
| None

type state = { step : int; frozen : bool }

type command =
| Transition
| Freeze
| Thaw

(** val transition : state -> command -> state option **)

let transition s = function
| Transition ->
  if s.frozen
  then None
  else Some { step = ((fun x -> x + 1) s.step); frozen = false }
| Freeze -> Some { step = s.step; frozen = true }
| Thaw -> Some { step = s.step; frozen = false }
