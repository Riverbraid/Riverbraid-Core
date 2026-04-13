Require Import Coq.Arith.PeanoNat.
Require Import Coq.Sorting.Permutation.
Require Import List.
Import ListNotations.
Require Import Go44.Core.

Fixpoint roots_of (cs : list Command) : list nat :=
  match cs with
  | [] => []
  | Transition r :: xs => r :: roots_of xs
  | _ :: xs => roots_of xs
  end.

Fixpoint fold_max (xs : list nat) (acc : nat) : nat :=
  match xs with
  | [] => acc
  | x :: xs' => fold_max xs' (Nat.max acc x)
  end.

Theorem run_root_characterization :
  forall cs s,
    root (run s cs) = fold_max (roots_of cs) (root s).
Proof.
  induction cs as [|c cs IH]; intros s; simpl.
  - reflexivity.
  - destruct (transition s c) eqn:H.
    + rewrite IH. destruct c; simpl in *; try (inversion H; subst; reflexivity).
      unfold apply_transition in H. destruct (frozen s); inversion H; subst; simpl; reflexivity.
      unfold apply_clearance in H. destruct (0 <? t); inversion H; subst; simpl; reflexivity.
    + rewrite IH. destruct c; simpl in *; try reflexivity.
      unfold apply_transition in H. destruct (frozen s); inversion H.
      unfold apply_clearance in H. destruct (0 <? t); inversion H.
Qed.

Theorem convergence :
  forall s cs1 cs2,
    Permutation cs1 cs2 ->
    root (run s cs1) = root (run s cs2).
Proof.
  intros s cs1 cs2 Hperm.
  repeat rewrite run_root_characterization.
  assert (H: Permutation (roots_of cs1) (roots_of cs2)).
  { induction Hperm; simpl; try constructor; auto.
    - destruct x; simpl; auto; constructor; auto.
    - destruct x, y; simpl; auto; try constructor; auto.
    - etransitivity; eauto. }
  clear Hperm.
  induction H; simpl; auto.
  - rewrite IHPermutation; reflexivity.
  - repeat rewrite Nat.max_assoc. rewrite (Nat.max_comm x y). reflexivity.
  - rewrite IHPermutation1. apply IHPermutation2.
Qed.
