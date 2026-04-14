# Riverbraid Constraint DSL v1.0
constraint blocked:
  once true -> always true

constraint risk:
  allowed: low, medium, high
  if blocked == true -> must be low

constraint active:
  if blocked == true -> must be false
