Require Import Arith List.
Import ListNotations.

Record State := mkState {
  step : nat;
  root : nat;
  frozen : bool
}.

Inductive Command :=
| Transition (r : nat)
| Freeze
| Thaw
| Clearance (t : nat).

Definition apply_transition s r :=
  if frozen s then None
  else Some (mkState (S (step s)) (Nat.max (root s) r) false).

Definition apply_freeze s := Some (mkState (step s) (root s) true).
Definition apply_thaw s := Some (mkState (step s) (root s) false).
Definition apply_clearance s t := 
  if (0 <? t) then Some (mkState (step s) (root s) false) else None.

Definition transition s c :=
  match c with
  | Transition r => apply_transition s r
  | Freeze => apply_freeze s
  | Thaw => apply_thaw s
  | Clearance t => apply_clearance s t
  end.

Fixpoint run (s : State) (cs : list Command) : State :=
  match cs with
  | [] => s
  | c :: cs' => 
      match transition s c with
      | Some s' => run s' cs'
      | None => run s cs'
      end
  end.
