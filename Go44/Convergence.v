(* Riverbraid Go44: Formal Convergence Proof *)
Require Import List.
Import ListNotations.

Parameter State : Type.
Parameter Invariants : Type.
Parameter satisfies_invariants : State -> Invariants -> Prop.
Parameter consistent_with : State -> State -> Prop.
Parameter consistent_subset : State -> State -> Prop.

Theorem braid_convergence : forall (inputs : list State) (inv : Invariants),
  exists (output : State),
    satisfies_invariants output inv /\
    (forall input, In input inputs -> consistent_with input output) /\
    (forall output', satisfies_invariants output' inv -> 
      output = output' \/ ~consistent_subset output output').
Admitted. (* Phase 2 Target: Replace with Qed. *)
