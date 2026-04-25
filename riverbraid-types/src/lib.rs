//! # riverbraid-types
//!
//! Canonical shared type definitions for the Riverbraid governance layer.

#![cfg_attr(not(feature = "std"), no_std)]

#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub struct AnchorHash(pub [u8; 32]);

impl AnchorHash {
    pub fn short(&self) -> [u8; 6] {
        let mut out = [0u8; 6];
        let hex = b"0123456789abcdef";
        out[0] = hex[(self.0[0] >> 4) as usize];
        out[1] = hex[(self.0[0] & 0x0f) as usize];
        out[2] = hex[(self.0[1] >> 4) as usize];
        out[3] = hex[(self.0[1] & 0x0f) as usize];
        out[4] = hex[(self.0[2] >> 4) as usize];
        out[5] = hex[(self.0[2] & 0x0f) as usize];
        out
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
#[cfg_attr(feature = "serde", serde(rename_all = "SCREAMING_SNAKE_CASE"))]
pub enum StateLabel {
    Stationary,
    Drifting,
    FailClosed,
    Unknown,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum InvariantId {
    CouplingInvariant,
    ScaleSeparation,
    ThermodynamicMeaning,
    FailClosed,
    StationaryFloor,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub struct InvariantResult {
    pub invariant: InvariantId,
    pub passed: bool,
    pub reason: &'static str,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub struct StateSeal {
    pub anchor: AnchorHash,
    pub state: StateLabel,
    pub sequence: u64,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub struct WireSeal {
    pub version: u8,
    pub anchor_hex: [u8; 64],
    pub state: StateLabel,
    pub sequence: u64,
    pub invariants: [bool; 5],
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn anchor_short_form_01a777() {
        let mut bytes = [0u8; 32];
        bytes[0] = 0x01;
        bytes[1] = 0xa7;
        bytes[2] = 0x77;
        let anchor = AnchorHash(bytes);
        assert_eq!(&anchor.short(), b"01a777");
    }

    #[test]
    fn anchor_short_form_de2062() {
        let mut bytes = [0u8; 32];
        bytes[0] = 0xde;
        bytes[1] = 0x20;
        bytes[2] = 0x62;
        let anchor = AnchorHash(bytes);
        assert_eq!(&anchor.short(), b"de2062");
    }

    #[test]
    fn state_seal_fields() {
        let seal = StateSeal {
            anchor: AnchorHash([0u8; 32]),
            state: StateLabel::Stationary,
            sequence: 42,
        };
        assert_eq!(seal.state, StateLabel::Stationary);
        assert_eq!(seal.sequence, 42);
    }

    #[test]
    fn invariant_id_count() {
        let ids = [
            InvariantId::CouplingInvariant,
            InvariantId::ScaleSeparation,
            InvariantId::ThermodynamicMeaning,
            InvariantId::FailClosed,
            InvariantId::StationaryFloor,
        ];
        assert_eq!(ids.len(), 5);
    }
}
