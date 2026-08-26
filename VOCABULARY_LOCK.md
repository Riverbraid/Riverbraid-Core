# Riverbraid-Core vocabulary boundary

Core identifiers for record types, predicates, profiles, checks, authorities, and extensions are structural references.

Core does **not** define a universal semantic vocabulary for truth, trust, legitimacy, evidentiary weight, risk, readiness, maturity, certification, or interpretation.

## Predicate rule

A relationship predicate must be namespaced or otherwise stably identified. Its meaning belongs to the declared vocabulary, profile, or authority that defines it.

A mapping between two vocabularies is itself an attributed, scoped assertion. Core must not infer semantic equivalence merely because two labels are similar.

## Unknown-extension rule

Unknown namespaced types, predicates, and extension members must be preservable opaquely during structural processing. Structural validation must not require network dereferencing.

## Historical vocabulary

The exact former `VOCABULARY_LOCK.md` is preserved at `historical/phase15/VOCABULARY_LOCK.md`. Its former Ring/constellation meanings are not current Core semantics.
