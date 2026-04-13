Require Import Extraction.
Require Import Go44.Core Go44.Safety.
Extract Inductive bool => "bool" [ "true" "false" ].
Extract Inductive list => "list" [ "[]" "(::)" ].
Extract Inductive option => "option" [ "Some" "None" ].
Extract Inductive nat => "int" [ "0" "(fun x -> x+1)" ] "(fun fO fS n -> if n=0 then fO () else fS (n-1))".
Extraction "ssg_vm.ml" transition divergence root_preservation.
