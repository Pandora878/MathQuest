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
  'auth/unauthorized-domain':'O domínio do GitHub não está autorizado. Adicione pandora878.github.io em Firebase → Authentication → Settings → Authorized domains.',
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
  }catch(e){
   const x=new Error(errorText(e)); x.code=e&&e.code; throw x;
  }
 })();
 try{return await ready;}catch(e){ready=null;throw e;}
}

async function ensureAuth(){await init({requireAuth:true});return auth.currentUser;}

function grade(v){return ['pre1','pre2','g1','g2','g3','g4','g5'].includes(v)?v:'g5';}
function character(v){return ['fox','panda','cat','rabbit','dog','tiger'].includes(v)?v:'fox';}
function name(v){return String(v||'').trim().slice(0,30)||'Jogador';}

async function saveScore(data){
 const user=await ensureAuth();
 const g=grade(data.grade);
 const ref=db.collection('mathQuestRanking').doc(g).collection('players').doc(user.uid);
 let saved=null;
 await db.runTransaction(async tx=>{
  const snap=await tx.get(ref);
  const old=snap.exists?snap.data():{};
  const points=(Number(old.points)||0)+Math.max(0,Math.floor(Number(data.score)||0));
  const r=getRankInfo(points);
  const level=Math.max(Number(old.level)||1,Math.floor(points/100)+1,Number(data.level)||1);
  saved={
   name:name(data.name),points,level,rank:r.name,rankIndex:r.index,rankIcon:r.icon,
   character:character(data.character),grade:g,authUid:user.uid,
   updatedAt:firebase.firestore.FieldValue.serverTimestamp()
  };
  tx.set(ref,saved,{merge:true});
 });
 return saved;
}

async function loadScore(g){
 await init({requireAuth:true});
 const ref=db.collection('mathQuestRanking').doc(grade(g)).collection('players').doc(auth.currentUser.uid);
 const snap=await ref.get();
 return snap.exists?{id:snap.id,...snap.data()}:null;
}

function watchRanking(g,onData,onError){
 if(unsubscribe){unsubscribe();unsubscribe=null;}
 init({requireAuth:false}).then(()=>{
  const q=db.collection('mathQuestRanking').doc(grade(g)).collection('players').orderBy('points','desc').limit(50);
  unsubscribe=q.onSnapshot(
   snap=>onData(snap.docs.map(d=>({id:d.id,...d.data()}))),
   e=>onError&&onError(Object.assign(new Error(errorText(e)),{code:e&&e.code}))
  );
 }).catch(e=>onError&&onError(e));
}

window.FirebaseRanking={isConfigured,init,ensureAuth,saveScore,loadScore,watchRanking,getRankInfo,explainError:errorText,RANKS};
})();