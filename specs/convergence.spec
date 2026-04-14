# Specification: Convergence Predicate v1.0
# Domain: Stationary State Governance

## 1. The Coupling Test
The system MUST fail if `run-vectors.cjs` is modified without a 
corresponding update to the Merkle Root of the constellation.

## 2. Stationary State Invariant
A system is converged (At Rest) when the verification transform 
yields an identity mapping of the state hash.
$$H(State) \equiv H(Verify(State))$$
If $H_{div} > 0$, the system is in 'Drift' and must Fail-Closed.
