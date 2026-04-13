Require Import Go44.Core.
Require Import Arith.

Record Policy := mkPolicy {
  max_root_threshold : nat;
  min_clearance_time : nat
}.

Definition is_valid (p : Policy) (c : Command) : bool :=
  match c with
  | Transition r => r <=? max_root_threshold p
  | Clearance t => min_clearance_time p <=? t
  | _ => true (* Freeze and Thaw are inherently structural *)
  end.

Definition safe_ingest (p : Policy) (s : State) (c : Command) : option State :=
  if is_valid p c then transition s c else None.
