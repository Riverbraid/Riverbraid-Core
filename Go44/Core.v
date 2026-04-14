Require Import Coq.Arith.PeanoNat.

Record State := mkState {
  step   : nat;
  frozen : bool
}.

Inductive Command :=
| Transition
| Freeze
| Thaw.

Definition transition (s : State) (c : Command) : option State :=
  match c with
  | Transition =>
      if frozen s then None
      else Some (mkState (S (step s)) false)
  | Freeze => Some (mkState (step s) true)
  | Thaw  => Some (mkState (step s) false)
  end.
