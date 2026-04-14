module.exports = {
  electionInvariants: {
    ballot_secrecy: {
      check: (state) => !state.ballots || !state.ballots.some(b => b.voter_id && !b.encrypted),
      description: 'All cast ballots must be encrypted.'
    },
    tally_integrity: {
      check: (state) => (state.ballotsCast || 0) <= (state.electors || 0),
      description: 'Ballots cast cannot exceed total electors.'
    }
  }
};
