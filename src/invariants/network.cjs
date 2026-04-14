module.exports = {
  networkInvariants: {
    peer_consistency: {
      check: (state) => !!state.peerId && !!state.fingerprint,
      description: 'Network peer must have both an ID and a GPG fingerprint.'
    }
  }
};
