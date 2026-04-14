Require Import Coq.Arith.PeanoNat.
Require Import Go44.Core.

Theorem step_monotonic :
  forall s c s',
    transition s c = Some s' ->
    step s' = S (step s) \/ step s' = step s.
Proof.
  intros s c s' H.
  destruct c; simpl in H.
  - (* Transition *)
    destruct (frozen s) eqn:E.
    + inversion H.
    + inversion H; subst; simpl. left. reflexivity.
  - (* Freeze *)
    inversion H; subst; simpl. right. reflexivity.
  - (* Thaw *)
    inversion H; subst; simpl. right. reflexivity.
Qed.
