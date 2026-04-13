Require Import Coq.Arith.PeanoNat.
Require Import Go44.Core.

Theorem step_monotonic :
  forall s c s',
    transition s c = Some s' ->
    step s' = S (step s) \/ step s' = step s.
Proof.
  intros s c s' H.
  destruct c; simpl in H; try (inversion H; subst; simpl; auto).
  unfold apply_transition in H.
  destruct (frozen s); inversion H; subst; simpl; auto.
Qed.
