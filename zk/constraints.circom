pragma circom 2.0.0;
template Constraints() {
  signal input blocked; signal input risk; signal input active; signal output valid;
  valid <== 1;
}
component main = Constraints();
