Require Import Coq.Arith.PeanoNat.
Require Import Go44.Core.
Require Import Go44.Invariants.

Theorem safety_root_monotonic :
  forall s c s',
    transition s c = Some s' ->
    step s' >= step s.
Proof.
  intros.
  apply step_monotonic in H.
  destruct H as [H | H].
  - rewrite H. apply Nat.le_succ_r. left. apply Nat.le_refl.
  - rewrite H. apply Nat.le_refl.
Qed.
