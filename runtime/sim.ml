open Go44
let initial_state = { step = 0; root = 0; frozen = false }
let commands = [Transition 10; Freeze; Transition 20; Thaw; Transition 30]
let final_state = run initial_state commands
let () = Printf.printf "Step: %d, Root: %d, Frozen: %b
" final_state.step final_state.root final_state.frozen
