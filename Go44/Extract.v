Require Import Extraction Go44.Core.
Require Import List.
Extraction Language OCaml.
Extract Inductive bool => "bool" [ "true" "false" ].
Extract Inductive list => "list" [ "[]" "(::)" ].
Extract Inductive nat => "int" [ "0" "(fun x -> x + 1)" ] "(fun zero succ n -> if n=0 then zero () else succ (n-1))".
Extract Inductive option => "option" [ "Some" "None" ].
Extraction "go44.ml" State Command transition run.
