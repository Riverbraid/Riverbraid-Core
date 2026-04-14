module.exports = {
  personaInvariants: {
    persona_immutability: {
      check: (state) => !!state.signature,
      description: 'Persona must have a valid cryptographic signature.'
    },
    value_alignment: {
      check: (state) => state.values && state.values.includes('epistemic integrity'),
      description: 'Persona must uphold Riverbraid core values.'
    }
  }
};
