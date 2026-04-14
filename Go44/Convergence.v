Require Import Coq.Lists.List.
Require Import Coq.Arith.Arith.
Import ListNotations.

Inductive Source : Type := Refusal | Safety | Judicial | Crypto | Cognition | Temporal | Manifest | Action | Integration | Memory | Interface | Network | Vision | Audio.

Definition source_rank (s : Source) : nat :=
  match s with
  | Refusal => 0 | Safety => 1 | Judicial => 2 | Crypto => 3 | Cognition => 4 | Temporal => 5 
  | Manifest => 6 | Action => 7 | Integration => 8 | Memory => 9 | Interface => 10 | Network => 11 
  | Vision => 12 | Audio => 13
  end.

Record State := mkState { st_source : Source ; st_payload : nat }.

Definition braid (inputs : list State) : State :=
  match inputs with
  | [] => mkState Refusal 0
  | h :: t => fold_left (fun best cur => if (source_rank (st_source cur) <=? source_rank (st_source best)) then cur else best) t h
  end.

Theorem braid_idempotent : forall (inputs : list State),
  let output := braid inputs in
  braid [output] = output.
Proof.
  intros inputs output. unfold output, braid.
  destruct inputs; simpl; reflexivity.
Qed.
