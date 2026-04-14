open Ssg_vm
let () =
  let s0 = { step = 0; frozen = false } in
  Printf.printf "Initial step: %d\n" s0.step;
  match transition s0 Transition with
  | Some s1 -> Printf.printf "After Transition -> step: %d\n" s1.step
  | None -> Printf.printf "Transition failed\n"
