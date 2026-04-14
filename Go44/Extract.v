Require Extraction.
Require Import Go44.Core Go44.Invariants Go44.Safety.

(* Direct mapping to OCaml native types to prevent type mismatches *)
Extract Inductive bool => "bool" [ "true" "false" ].
Extract Inductive nat => "int" [ "0" "(fun x -> x + 1)" ] "(fun fO fS n -> if n = 0 then fO () else fS (n-1))".

Extraction Language OCaml.
Extraction "ssg_vm.ml" State Command transition.
