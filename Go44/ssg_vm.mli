
type 'a option =
| Some of 'a
| None

type state = { step : int; frozen : bool }

type command =
| Transition
| Freeze
| Thaw

val transition : state -> command -> state option
