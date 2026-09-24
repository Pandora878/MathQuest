(function(){
'use strict';

const cfg=window.MATHQUEST_FIREBASE_CONFIG||{};
const configured=Boolean(cfg.apiKey&&cfg.projectId&&cfg.appId);
let db=null,auth=null,ready=null,unsubscribe=null;

const RANKS=[
 {name:'Bronze',icon:'🥉',min:0,next:500,color:'#cd7f32'},
 {name:'Prata',icon:'🥈',min:500,next:1200,color:'#c7d0df'},
 {name:'Ouro',icon:'🥇',min:1200,next:2500,color:'#ffd166'},
 {name:'Platina',icon:'💠',min:2500,next:5000,color:'#65d8ff'},
 {name:'Diamante',icon:'💎',min:5000,next:9000,color:'#8fa8ff'},
 {name:'Mestre',icon:'👑',min:9000,next:null,color:'#dca7ff'}
];

function getRankInfo(points){
 const p=Math.max(0,Math.floor(Number(points)||0));
 let index=0;
 for(let i=0;i<RANKS.length;i++) if(p>=RANKS[i].min) index=i;
 const r=RANKS[index], next=RANKS[index+1]||null;
 const progress=r.next===null?100:Math.min(100,Math.max(0,((p-r.min)/(r.next-r.min))*100));
 return {...r,index,points:p,progress,toNext:r.next===null?0:Math.max(0,r.next-p),nextName:next?next.name:null,nextIcon:next?next.icon:null};
}
function isConfigured(){return configured;}
function errorText(e){
 const c=e&&e.code?String(e.code):'';
 const m={
  'auth/operation-not-allowed':'O login anônimo está DESATIVADO. Ative Firebase → Authentication → Sign-in method → Anonymous.',
  'auth/unauthorized-domain':'O domínio não está autorizado. Adicione o domínio do jogo em Firebase → Authentication → Settings → Authorized domains.',
  'auth/network-request-failed':'O navegador não conseguiu falar com o Firebase. Verifique a internet/bloqueador.',
  'permission-denied':'O Firestore recusou a operação. Publique as regras firestore.rules.',
  'failed-precondition':'O Firestore Database ainda não foi criado.',
  'unavailable':'O Firestore está temporariamente indisponível.',
  'not-found':'Projeto/banco Firebase não encontrado.'
 };
 return m[c]||((e&&e.message)||'Erro desconhecido no Firebase.');
}

async function init(opts){
 opts=opts||{};
 if(!configured) throw new Error('firebase-config.js não foi carregado/configurado.');
 if(location.protocol==='file:') throw new Error('Abra pelo GitHub Pages (https://), não por file://.');
 if(!window.firebase) throw new Error('SDK do Firebase não carregou. Verifique a internet.');
 if(!firebase.apps.length) firebase.initializeApp(cfg);
 db=firebase.firestore();
 auth=firebase.auth();
 if(opts.requireAuth===false) return true;
 if(ready) return ready;
 ready=(async()=>{
  try{
   if(!auth.currentUser) await auth.signInAnonymously();
   if(!auth.currentUser) throw new Error('Firebase não criou o usuário anônimo.');
   return true;
  }catch(e){const x=new Error(errorText(e));x.code=e&&e.code;throw x;}
 })();
 try{return await ready;}catch(e){ready=null;throw e;}
}
async function ensureAuth(){await init({requireAuth:true});return auth.currentUser;}
function grade(v){return ['pre1','pre2','g1','g2','g3','g4','g5'].includes(v)?v:'g5';}
function character(v){return ['fox','panda','cat','rabbit','dog','tiger'].includes(v)?v:'fox';}
function normalizeName(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'').slice(0,40)||'jogador';}
function name(v){return String(v||'').trim().slice(0,30)||'Jogador';}

// Conta persistente por nome. O mesmo nome normalizado recupera a mesma conta
// em qualquer dispositivo que tenha acesso ao mesmo projeto Firebase.
async function loadAccount(playerName){
 const user=await ensureAuth();
 const id=normalizeName(playerName);
 const ref=db.collection('mathQuestAccounts').doc(id);
 const snap=await ref.get();
 if(!snap.exists)return null;
 return {id:snap.id,...snap.data(),authUid:user.uid};
}
async function saveAccount(data){
 const user=await ensureAuth();
 const id=normalizeName(data.name);
 const payload={
  name:name(data.name),
  grade:grade(data.grade),
  character:character(data.character),
  customization:data.customization||null,
  ownedSkins:Array.isArray(data.ownedSkins)?data.ownedSkins:[],
  points:Number(data.points)||0,
  record:Number(data.record)||0,
  level:Number(data.level)||1,
  xp:Number(data.xp)||0,
  coins:Number(data.coins)||0,
  questionCoins:Number(data.questionCoins)||0,
  totalQuestions:Number(data.totalQuestions)||0,
  totalCorrect:Number(data.totalCorrect)||0,
  totalWrong:Number(data.totalWrong)||0,
  totalTimeouts:Number(data.totalTimeouts)||0,
  totalChutes:Number(data.totalChutes)||0,
  totalPenalties:Number(data.totalPenalties)||0,
  maxWrongStreak:Number(data.maxWrongStreak)||0,
  bestCombo:Number(data.bestCombo)||0,
  bestAccuracy:Number(data.bestAccuracy)||0,
  missionsCompleted:Number(data.missionsCompleted)||0,
  completedMissions:Array.isArray(data.completedMissions)?data.completedMissions:[],
  modeStats:data.modeStats||{},
  adminTestAccount:Boolean(data.adminTestAccount),
  lastAuthUid:user.uid,
  updatedAt:firebase.firestore.FieldValue.serverTimestamp()
 };
 await db.collection('mathQuestAccounts').doc(id).set(payload,{merge:true});
 return {id,...payload};
}

async function saveScore(data){
 const user=await ensureAuth();
 const g=grade(data.grade);
 const playerId=normalizeName(data.name);
 const ref=db.collection('mathQuestRanking').doc(g).collection('players').doc(playerId);
 let saved=null;
 await db.runTransaction(async tx=>{
  const snap=await tx.get(ref);
  const old=snap.exists?snap.data():{};
  const inc=data.analytics||{}, mode=inc.mode||'geral';
  const oldMode=(old.modeStats||{})[mode]||{};
  const modeStats={...(old.modeStats||{})};
  modeStats[mode]={
   attempts:(Number(oldMode.attempts)||0)+(Number(inc.attempts)||0),
   correct:(Number(oldMode.correct)||0)+(Number(inc.correct)||0),
   wrong:(Number(oldMode.wrong)||0)+(Number(inc.wrong)||0),
   timeouts:(Number(oldMode.timeouts)||0)+(Number(inc.timeouts)||0),
   chutes:(Number(oldMode.chutes)||0)+(Number(inc.chutes)||0),
   penalties:(Number(oldMode.penalties)||0)+(Number(inc.penalties)||0)
  };
  const points=(Number(old.points)||0)+Math.max(0,Math.floor(Number(data.score)||0));
  const r=getRankInfo(points);
  const level=Math.max(Number(old.level)||1,Math.floor(points/100)+1,Number(data.level)||1);
  const coins=Math.max(0,Number(data.coins ?? old.coins ?? 0));
  saved={
   name:name(data.name),points,level,rank:r.name,rankIndex:r.index,rankIcon:r.icon,
   character:character(data.character),grade:g,authUid:user.uid,coins,
   missionsCompleted:(Number(old.missionsCompleted)||0)+(Number(inc.missionCompleted)||0),
   totalQuestions:(Number(old.totalQuestions)||0)+(Number(inc.attempts)||0),
   totalCorrect:(Number(old.totalCorrect)||0)+(Number(inc.correct)||0),
   totalWrong:(Number(old.totalWrong)||0)+(Number(inc.wrong)||0),
   totalTimeouts:(Number(old.totalTimeouts)||0)+(Number(inc.timeouts)||0),
   totalChutes:(Number(old.totalChutes)||0)+(Number(inc.chutes)||0),
   totalPenalties:(Number(old.totalPenalties)||0)+(Number(inc.penalties)||0),
   maxWrongStreak:Math.max(Number(old.maxWrongStreak)||0,Number(inc.maxWrongStreak)||0),
   modeStats,
   recentAttempts:[...(old.recentAttempts||[]),...(inc.recentAttempts||[])].slice(-30),
   updatedAt:firebase.firestore.FieldValue.serverTimestamp()
  };
  tx.set(ref,saved,{merge:true});
 });
 return saved;
}

async function loadScore(g,playerName){
 await init({requireAuth:true});
 const id=normalizeName(playerName);
 const ref=db.collection('mathQuestRanking').doc(grade(g)).collection('players').doc(id);
 const snap=await ref.get();
 return snap.exists?{id:snap.id,...snap.data()}:null;
}

async function getAllPlayers(){
 await init({requireAuth:true});
 const all=[];
 for(const g of ['pre1','pre2','g1','g2','g3','g4','g5']){
  const snap=await db.collection('mathQuestRanking').doc(g).collection('players').limit(500).get();
  snap.forEach(d=>all.push({id:d.id,...d.data(),grade:g}));
 }
 return all;
}

function watchAllPlayers(onData,onError){
 const unsubs=[];let alive=true;
 init({requireAuth:false}).then(()=>{
  const grades=['pre1','pre2','g1','g2','g3','g4','g5'];const byGrade={};
  grades.forEach(g=>{
   const q=db.collection('mathQuestRanking').doc(g).collection('players').orderBy('points','desc').limit(500);
   const u=q.onSnapshot(snap=>{byGrade[g]=snap.docs.map(d=>({id:d.id,...d.data(),grade:g}));if(alive)onData(grades.flatMap(x=>byGrade[x]||[]));},e=>{if(alive&&onError)onError(Object.assign(new Error(errorText(e)),{code:e&&e.code}))});
   unsubs.push(u);
  });
 }).catch(e=>onError&&onError(e));
 return ()=>{alive=false;unsubs.forEach(u=>{try{u()}catch(e){}});};
}

async function saveLiveProgress(data){
 const user=await ensureAuth();
 const g=grade(data.grade), id=normalizeName(data.name||data.playerName||'jogador');
 const ref=db.collection('mathQuestRanking').doc(g).collection('players').doc(id);
 await db.runTransaction(async tx=>{
  const snap=await tx.get(ref); if(!snap.exists)return;
  const old=snap.data();
  const points=Math.max(Number(old.points)||0,Math.floor(Number(data.points)||0));
  tx.set(ref,{points,level:Math.max(Number(old.level)||1,Math.floor(points/100)+1),rank:getRankInfo(points).name,rankIndex:getRankInfo(points).index,rankIcon:getRankInfo(points).icon,coins:Math.max(Number(old.coins)||0,Number(data.coins)||0),authUid:user.uid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
 });
}

function watchRanking(g,onData,onError){
 if(unsubscribe){unsubscribe();unsubscribe=null;}
 init({requireAuth:false}).then(()=>{
  const q=db.collection('mathQuestRanking').doc(grade(g)).collection('players').orderBy('points','desc').limit(50);
  unsubscribe=q.onSnapshot(snap=>onData(snap.docs.map(d=>({id:d.id,...d.data()}))),e=>onError&&onError(Object.assign(new Error(errorText(e)),{code:e&&e.code})));
 }).catch(e=>onError&&onError(e));
}

window.FirebaseRanking={isConfigured,init,ensureAuth,saveScore,loadScore,getAllPlayers,watchRanking,watchAllPlayers,saveLiveProgress,getRankInfo,explainError:errorText,RANKS,loadAccount,saveAccount,normalizeName};
})();
