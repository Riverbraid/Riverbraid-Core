#!/usr/bin/env node
// Riverbraid Shield v1.5.0 | Deterministic Gateway
const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const LLM_ENDPOINT = process.env.LLM_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
const LLM_API_KEY = process.env.LLM_API_KEY;
const PORT = process.env.PORT || 8080;
const CONSTITUTION_DIR = process.env.CONSTITUTION_DIR || '.';

const threshold = JSON.parse(fs.readFileSync(`${CONSTITUTION_DIR}/constitution.threshold.json`, 'utf8'));

function containsEntropy(obj) {
  const str = JSON.stringify(obj);
  const patterns = ['Math.random', 'Date.now', 'process.hrtime', 'crypto.getRandomValues'];
  return patterns.some(p => str.includes(p));
}

app.post('/v1/chat/completions', async (req, res) => {
  try {
    // 1. Ingress Entropy Scan
    if (containsEntropy(req.body)) return res.status(403).json({ error: 'ENTROPY_DETECTED_IN_REQUEST' });

    // 2. High-Risk Threshold Gate
    const isHighRisk = /delete|exec|sudo|rm|format|transfer/i.test(JSON.stringify(req.body));
    if (isHighRisk && threshold.threshold > 0) {
        return res.status(403).json({ error: 'THRESHOLD_SIGNATURE_REQUIRED' });
    }

    // 3. Forward to LLM
    const response = await fetch(LLM_ENDPOINT, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LLM_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const llmResponse = await response.json();

    // 4. Egress Entropy Scan (The Fail-Closed Logic)
    if (containsEntropy(llmResponse)) return res.status(403).json({ error: 'ENTROPY_DETECTED_IN_RESPONSE' });

    res.json(llmResponse);
  } catch (err) {
    res.status(500).json({ error: 'SHIELD_INTERNAL_ERROR' });
  }
});

app.listen(PORT, () => console.log(`Shield Active on port ${PORT}`));
