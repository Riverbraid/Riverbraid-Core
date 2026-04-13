Require Import Go44.Invariants.

Theorem root_preservation :
  forall s c s',
    transition s c = Some s' ->
    (c = Freeze \/ c = Thaw \/ (exists t, c = Clearance t)) ->
    root s' = root s.
Proof.
  intros s c s' H Hc.
  destruct c; simpl in H.
  - (* Transition branch: Contradiction *)
    destruct Hc as [H1 | [H2 | H3]].
    + discriminate H1.
    + discriminate H2.
    + destruct H3 as [t' H3]. discriminate H3.
  - (* Freeze *)
    inversion H; subst; simpl; reflexivity.
  - (* Thaw *)
    inversion H; subst; simpl; reflexivity.
  - (* Clearance *)
    destruct (0 <? t) eqn:E.
    + inversion H; subst; simpl; reflexivity.
    + discriminate H.
Qed.
