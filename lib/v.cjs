const fs=require('fs'),{execSync}=require('child_process'),path=require('path');
const vp='/workspaces/Riverbraid-Core/bin/verify-swarm.cjs';
const ev=(ctx)=>{
const {verifySwarm,getCurrentRoot}=require(vp),r=getCurrentRoot();
const ap='/workspaces/Riverbraid-Interface-Gold/.anchor',sp=ap+'.asc';
try{execSync(`gpg --verify "${sp}" "${ap}"`,{stdio:'ignore'});
if(fs.readFileSync(ap,'utf8').trim()!==r||!verifySwarm(r))throw 0;
console.log(`✅ Riverbraid Verified: ${ctx}`);}catch(e){process.exit(1);}};
module.exports={enforceCoreValidator:ev,
bindP5:(p)=>{const s=p.setup;p.setup=()=>{ev('p5-s');if(s)s();};const d=p.draw;p.draw=()=>{ev('p5-d');if(d)d();};},
bindHydra:(h)=>{const e=h.eval;h.eval=(c)=>{ev('hydra');return e(c);};}};
