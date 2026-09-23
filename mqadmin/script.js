const animals={
fox:{name:"Raposa",role:"Exploradora",base:"#e9782d",light:"#ffe2c9",accent:"#5b2d1d"},
panda:{name:"Panda",role:"Aventureiro",base:"#202637",light:"#f4f5fa",accent:"#8fd3ff"},
cat:{name:"Gato",role:"Cientista",base:"#89909e",light:"#e9edf5",accent:"#ff9bc1"},
rabbit:{name:"Coelho",role:"Inventora",base:"#eee7e1",light:"#fff8f3",accent:"#f59bb5"},
dog:{name:"Cachorro",role:"Explorador",base:"#9b633f",light:"#f3cda7",accent:"#79c8ff"},
tiger:{name:"Tigre",role:"Desafiante",base:"#f08a22",light:"#ffe0a8",accent:"#241d18"}
};
const furPalettes={
fox:["#e9782d","#f3a24b","#ffe1c7","#9b4d24","#4b2d24","#202637"],
panda:["#202637","#6b7280","#f4f5fa","#d8dee9","#b9c3d4","#111827"],
cat:["#89909e","#596273","#d7dbe3","#f0b7b7","#8d6e63","#303746"],
rabbit:["#eee7e1","#f5cdbd","#d9b6d0","#c7d5e7","#b98c76","#8b6b7d"],
dog:["#9b633f","#d4935d","#f1c7a0","#6f442d","#f1e7d7","#4d596a"],
tiger:["#f08a22","#ffb13b","#ffd99a","#d75a20","#fff0cc","#352319"]
};
const shirtColors=["#2674ff","#e23d4f","#1fa86b","#252b3a","#f4b82f","#7d42d8","#ff6fae","#00b8a9","#ff7a45","#7c5cff","#f6f7fb","#8b5e3c"];
const headStyles=[
{name:"Normal",key:"normal"}, {name:"Óculos",key:"glasses"}, {name:"Bandana",key:"bandana"},
{name:"Boné",key:"cap"}, {name:"Fone",key:"headphones"}, {name:"Capuz",key:"hood"},
{name:"Coroa",key:"crown"}, {name:"Mago",key:"wizard"}, {name:"Flor",key:"flower"}, {name:"Antena",key:"antenna"}
];
const accessoryStyles=[
{name:"Nenhum",key:"none"}, {name:"Óculos",key:"glasses"}, {name:"Fone",key:"headphones"},
{name:"Mochila",key:"backpack"}, {name:"Cachecol",key:"scarf"}, {name:"Coroa",key:"crown"},
{name:"Medalha",key:"medal"}, {name:"Gravata",key:"bowtie"}, {name:"Capa",key:"cape"}, {name:"Varinha",key:"wand"}
];
let customization={animal:"fox",fur:null,shirt:"#2674ff",head:"cap",accessory:"none",headColor:"#2674ff",accessoryColor:"#ffd166",eyeColor:"#182033"};

function currentAnimal(){return animals[customization.animal]||animals.fox}
function animalColors(){
const a=currentAnimal();
return {base:customization.fur||a.base,light:a.light,accent:a.accent};
}
function animalFace(){
const a=currentAnimal(), c=animalColors(), base=c.base, light=c.light, accent=c.accent;
let ears="", stripes="";
if(customization.animal==="fox") ears=`<path d="M54 74L48 15L91 48Z" fill="${base}"/><path d="M166 74L172 15L129 48Z" fill="${base}"/><path d="M57 58L54 30L76 49Z" fill="#ffc4c4"/><path d="M163 58L166 30L144 49Z" fill="#ffc4c4"/>`;
if(customization.animal==="panda") ears=`<circle cx="65" cy="48" r="25" fill="#161b29"/><circle cx="155" cy="48" r="25" fill="#161b29"/>`;
if(customization.animal==="cat") ears=`<path d="M55 72L54 19L96 51Z" fill="${base}"/><path d="M165 72L166 19L124 51Z" fill="${base}"/><path d="M59 56L59 33L78 49Z" fill="${accent}"/><path d="M161 56L161 33L142 49Z" fill="${accent}"/>`;
if(customization.animal==="rabbit") ears=`<rect x="62" y="5" width="35" height="85" rx="18" fill="${base}"/><rect x="123" y="5" width="35" height="85" rx="18" fill="${base}"/><rect x="72" y="15" width="15" height="65" rx="8" fill="${accent}"/><rect x="133" y="15" width="15" height="65" rx="8" fill="${accent}"/>`;
if(customization.animal==="dog") ears=`<path d="M55 54Q26 65 42 119L72 92Z" fill="${base}"/><path d="M165 54Q194 65 178 119L148 92Z" fill="${base}"/>`;
if(customization.animal==="tiger") ears=`<path d="M54 74L48 15L91 48Z" fill="${base}"/><path d="M166 74L172 15L129 48Z" fill="${base}"/><path d="M59 57L54 30L77 49Z" fill="#ffd4b5"/><path d="M161 57L166 30L143 49Z" fill="#ffd4b5"/>`;
if(customization.animal==="tiger") stripes=`<path d="M62 75l18 13M158 75l-18 13M73 48l17 10M147 48l-17 10" stroke="#39251b" stroke-width="7" stroke-linecap="round"/>`;
return `${ears}<circle cx="110" cy="105" r="65" fill="${base}"/><ellipse cx="110" cy="128" rx="39" ry="31" fill="${light}"/>${stripes}
<ellipse cx="86" cy="104" rx="12" ry="15" fill="#fff"/><ellipse cx="134" cy="104" rx="12" ry="15" fill="#fff"/>
<circle cx="88" cy="106" r="6" fill="${customization.eyeColor||"#182033"}"/><circle cx="132" cy="106" r="6" fill="${customization.eyeColor||"#182033"}"/>
<circle cx="90" cy="104" r="2" fill="#fff"/><circle cx="134" cy="104" r="2" fill="#fff"/>
<path d="M101 126Q110 119 119 126Q117 137 110 137Q103 137 101 126Z" fill="#2b2030"/>
<path d="M110 136Q101 147 92 143M110 136Q119 147 128 143" fill="none" stroke="#2b2030" stroke-width="4" stroke-linecap="round"/>`;
}
function clothingSVG(){
const shirt=customization.shirt||"#2674ff";
let detail=`<circle cx="110" cy="205" r="20" fill="#fff" opacity=".96"/><path d="M100 205L108 213L123 195" fill="none" stroke="${shirt}" stroke-width="6" stroke-linecap="round"/>`;
if(customization.animal==="fox"&&shirt==="#2674ff") detail=`<path d="M92 189L110 179L128 189L121 215H99Z" fill="#fff" opacity=".95"/><path d="M110 183V211M99 198H121" stroke="#ff7b2f" stroke-width="4"/>`;
return `<path d="M50 243Q54 177 110 176Q166 177 170 243Z" fill="${shirt}"/><path d="M78 180Q66 204 67 243M142 180Q154 204 153 243" fill="none" stroke="#fff" opacity=".14" stroke-width="8"/>${detail}`;
}
function headAccessorySVG(){
let x=""; const hc=customization.headColor||"#2674ff", ac=customization.accessoryColor||"#ffd166";
if(customization.head==="glasses")x+=`<rect x="64" y="91" width="44" height="28" rx="12" fill="none" stroke="${hc}" stroke-width="6"/><rect x="112" y="91" width="44" height="28" rx="12" fill="none" stroke="${hc}" stroke-width="6"/><path d="M108 104H112" stroke="${hc}" stroke-width="6"/>`;
if(customization.head==="bandana")x+=`<path d="M50 77Q110 105 170 77L166 91Q110 119 54 91Z" fill="${hc}"/>`;
if(customization.head==="cap")x+=`<path d="M58 74Q72 38 110 38Q148 38 162 74Z" fill="${hc}"/><path d="M142 68Q176 67 183 79Q158 88 139 81Z" fill="${ac}"/>`;
if(customization.head==="headphones")x+=`<path d="M48 105Q48 44 110 44Q172 44 172 105" fill="none" stroke="${hc}" stroke-width="11"/><circle cx="49" cy="105" r="17" fill="${ac}"/><circle cx="171" cy="105" r="17" fill="${ac}"/>`;
if(customization.head==="hood")x+=`<path d="M51 106Q54 39 110 32Q166 39 169 106L151 91Q110 65 69 91Z" fill="${hc}" opacity=".96"/>`;
if(customization.head==="crown")x+=`<path d="M68 55L76 23L96 45L110 18L124 45L144 23L152 55Z" fill="${hc}" stroke="${ac}" stroke-width="4"/>`;
if(customization.head==="wizard")x+=`<path d="M66 76L110 12L154 76Z" fill="${hc}" stroke="${ac}" stroke-width="4"/><path d="M91 58Q110 44 129 58" fill="none" stroke="${ac}" stroke-width="5"/>`;
if(customization.head==="flower")x+=`<circle cx="110" cy="43" r="10" fill="${ac}"/><circle cx="95" cy="43" r="11" fill="${hc}"/><circle cx="125" cy="43" r="11" fill="${hc}"/><circle cx="110" cy="28" r="11" fill="${hc}"/><circle cx="110" cy="58" r="11" fill="${hc}"/>`;
if(customization.head==="antenna")x+=`<path d="M110 43V20" stroke="${hc}" stroke-width="6"/><circle cx="110" cy="15" r="9" fill="${ac}"/>`;
if(customization.accessory==="glasses")x+=`<rect x="64" y="91" width="44" height="28" rx="12" fill="rgba(100,180,255,.22)" stroke="${ac}" stroke-width="5"/><rect x="112" y="91" width="44" height="28" rx="12" fill="rgba(100,180,255,.22)" stroke="${ac}" stroke-width="5"/><path d="M108 104H112" stroke="${ac}" stroke-width="5"/>`;
if(customization.accessory==="headphones")x+=`<path d="M48 108Q48 53 110 53Q172 53 172 108" fill="none" stroke="${ac}" stroke-width="8"/><circle cx="50" cy="108" r="14" fill="${ac}"/><circle cx="170" cy="108" r="14" fill="${ac}"/>`;
if(customization.accessory==="backpack")x+=`<path d="M51 174Q35 184 39 235L62 235L66 182Z" fill="${ac}"/><path d="M169 174Q185 184 181 235L158 235L154 182Z" fill="${ac}"/>`;
if(customization.accessory==="scarf")x+=`<path d="M66 153Q110 171 154 153L150 177Q110 194 70 177Z" fill="${ac}"/><path d="M130 177L151 219L136 222L119 179Z" fill="${hc}"/>`;
if(customization.accessory==="crown")x+=`<path d="M68 55L76 23L96 45L110 18L124 45L144 23L152 55Z" fill="${ac}" stroke="${hc}" stroke-width="4"/>`;
if(customization.accessory==="medal")x+=`<path d="M101 178L110 197L119 178" stroke="${hc}" stroke-width="8"/><circle cx="110" cy="204" r="14" fill="${ac}" stroke="${hc}" stroke-width="4"/>`;
if(customization.accessory==="bowtie")x+=`<path d="M91 193L110 202L91 211Z" fill="${ac}"/><path d="M129 193L110 202L129 211Z" fill="${ac}"/><circle cx="110" cy="202" r="5" fill="${hc}"/>`;
if(customization.accessory==="cape")x+=`<path d="M58 178Q40 195 49 247L82 238L76 183Z" fill="${ac}" opacity=".95"/><path d="M162 178Q180 195 171 247L138 238L144 183Z" fill="${ac}" opacity=".95"/>`;
if(customization.accessory==="wand")x+=`<path d="M151 190L183 222" stroke="${hc}" stroke-width="6" stroke-linecap="round"/><path d="M184 216L188 225L197 229L188 233L184 242L180 233L171 229L180 225Z" fill="${ac}"/>`;
return x;
}
function createCharacterSVG(){
const c=animalColors();
return `<svg viewBox="0 0 220 270" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="bodyGrad" x1="0" x2="1"><stop stop-color="${customization.shirt||"#2674ff"}"/><stop offset="1" stop-color="#64a3ff"/></linearGradient></defs>
<ellipse cx="110" cy="252" rx="65" ry="10" fill="#000" opacity=".25"/>
${customization.accessory==="backpack"?headAccessorySVG():""}
${animalFace()}
${clothingSVG()}
${headAccessorySVG()}
<circle cx="110" cy="208" r="4" fill="#fff" opacity=".4"/>
</svg>`;
}
function refreshCharacter(){
document.getElementById("bigCharacter").innerHTML=createCharacterSVG();
document.getElementById("rankCharacter").innerHTML=createCharacterSVG();
document.getElementById("loginCharacter").innerHTML=createCharacterSVG();
const a=currentAnimal();
document.getElementById("previewName").textContent=a.name;
document.getElementById("rankName").textContent=a.name;
}
function makeChoice(containerId,items,getLabel,getKey,onPick){
const box=document.getElementById(containerId);box.innerHTML="";
items.forEach(item=>{
const b=document.createElement("button");b.className="editor-choice";
b.innerHTML=getLabel(item);
b.onclick=()=>{onPick(getKey(item));document.querySelectorAll(`#${containerId} .editor-choice`).forEach(x=>x.classList.remove("selected"));b.classList.add("selected");refreshCharacter();};
if(getKey(item)===getKey(items[0])) b.classList.add("selected");
box.appendChild(b);
});
}
function buildAnimalOptions(){
const box=document.getElementById("animalOptions");box.innerHTML="";
Object.entries(animals).forEach(([id,a])=>{
const b=document.createElement("button");b.className="animal-card"+(customization.animal===id?" selected":"");
b.innerHTML=`<div>${animalThumb(id)}</div><span>${a.name}</span>`;
b.onclick=()=>{customization.animal=id;customization.fur=null;document.querySelectorAll(".animal-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");buildFurOptions();refreshCharacter();};
box.appendChild(b);
});
}
function animalThumb(id){
const old=customization.animal,oldF=customization.fur;customization.animal=id;customization.fur=null;
const s=createCharacterSVG();customization.animal=old;customization.fur=oldF;
return s;
}
function buildFurOptions(){
const box=document.getElementById("furOptions");box.innerHTML="";
furPalettes[customization.animal].forEach(color=>{
const b=document.createElement("button");b.className="fur-swatch"+((customization.fur||currentAnimal().base)===color?" selected":"");b.style.background=color;
b.onclick=()=>{customization.fur=color;document.querySelectorAll(".fur-swatch").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");refreshCharacter();};
box.appendChild(b);
});
}
function buildStyles(){
const make=(id,items,current,setter)=>{
const box=document.getElementById(id);box.innerHTML="";
items.forEach((item,i)=>{
const b=document.createElement("button");b.className="style-choice"+(current===item.key?" selected":"");
b.innerHTML=`<div class="style-preview ${item.key}">${styleIcon(item.key)}</div><span>${item.name}</span>`;
b.onclick=()=>{setter(item.key);document.querySelectorAll(`#${id} .style-choice`).forEach(x=>x.classList.remove("selected"));b.classList.add("selected");refreshCharacter();};
box.appendChild(b);
});
};
make("headOptions",headStyles,customization.head,k=>customization.head=k);
make("shirtOptions",shirtColors.map(c=>({key:c,name:""})),customization.shirt,k=>customization.shirt=k);
make("accessoryOptions",accessoryStyles,customization.accessory,k=>customization.accessory=k);
document.querySelectorAll("#shirtOptions .style-choice").forEach((b,i)=>b.querySelector(".style-preview").style.background=shirtColors[i]);
const hp=document.getElementById("headColorPicker"), ap=document.getElementById("accessoryColorPicker"), ep=document.getElementById("eyeColorPicker");
if(hp){hp.value=customization.headColor||"#2674ff";hp.oninput=()=>{customization.headColor=hp.value;refreshCharacter();savePlayer();};}
if(ap){ap.value=customization.accessoryColor||"#ffd166";ap.oninput=()=>{customization.accessoryColor=ap.value;refreshCharacter();savePlayer();};}
if(ep){ep.value=customization.eyeColor||"#182033";ep.oninput=()=>{customization.eyeColor=ep.value;refreshCharacter();savePlayer();};}
}
function styleIcon(key){
const icons={normal:"●",glasses:"◉",bandana:"◆",cap:"⌒",headphones:"◉",hood:"◒",crown:"♛",wizard:"△",flower:"✿",antenna:"•",none:"∅",backpack:"▣",scarf:"≈",medal:"●",bowtie:"◆",cape:"◇",wand:"✦"};
return icons[key]||"•";
}
function buildCharacterEditor(){
buildAnimalOptions();buildFurOptions();buildStyles();refreshCharacter();
}



const gradeProfiles={
  pre1:{label:"Pré I",title:"Pequenos Exploradores",description:"12 fases bem leves para contar, reconhecer cores e formas e brincar com números de 1 a 5.",time:30,questions:5,lives:5,modes:[
    ["count","Fase 1 • Vamos Contar","Conte de 1 a 5","blue"],["sameDifferent","Fase 2 • Iguais ou Diferentes?","Observe as figuras","purple"],
    ["colorMatch","Fase 3 • Cores Divertidas","Encontre a cor","orange"],["shapes","Fase 4 • Mundo das Formas","Reconheça as formas","green"],
    ["sequenceEasy","Fase 5 • Trilha dos Números","Ordem de 1 a 5","gold"],["moreLess","Fase 6 • Quem Tem Mais?","Compare quantidades","blue"],
    ["beforeAfter","Fase 7 • Vizinho do Número","Antes e depois","purple"],["patterns","Fase 8 • Padrão Colorido","Complete o padrão","orange"],
    ["additionVisual","Fase 9 • Juntando Brinquedos","Junte até 5","green"],["count","Fase 10 • Jardim da Contagem","Conte os desenhos","gold"],
    ["shapes","Fase 11 • Caça às Formas","Encontre a forma","blue"],["sequenceEasy","Fase 12 • Festa dos Números","Sequência final","purple"]]},
  pre2:{label:"Pré II",title:"Aventuras dos Números",description:"12 fases leves com números de 1 a 10, pequenas somas, formas, sequências e quantidades.",time:28,questions:6,lives:5,modes:[
    ["count","Fase 1 • Floresta da Contagem","Conte até 10","blue"],["sameDifferent","Fase 2 • Olho Vivo","Iguais ou diferentes","purple"],
    ["colorMatch","Fase 3 • Cores Mágicas","Encontre a cor","orange"],["additionVisual","Fase 4 • Vila da Soma","Junte até 5","green"],
    ["subtractionVisual","Fase 5 • Tirando Brinquedos","Tire até 5","gold"],["sequenceEasy","Fase 6 • Trilha Numérica","Sequências simples","blue"],
    ["beforeAfter","Fase 7 • Número Vizinho","Antes e depois","purple"],["missingEasy","Fase 8 • Número Perdido","Complete 1 a 10","orange"],
    ["shapes","Fase 9 • Cidade das Formas","Formas divertidas","green"],["moreLess","Fase 10 • Mais ou Menos","Compare quantidades","gold"],
    ["additionVisual","Fase 11 • Oficina da Soma","Soma com desenhos","blue"],["mixedEasy","Fase 12 • Desafio do Explorador","Revisão divertida","purple"]]},
  g1:{label:"1º Ano",title:"Aventura dos Números",description:"Desafios de sequência, comparação, adição, subtração, dobro, metade e problemas simples.",time:30,questions:8,lives:4,modes:[
    ["addition","Fase 1 • Soma até 20","Some e descubra","blue"],
    ["subtraction","Fase 2 • Subtração até 20","Resolva as contas","purple"],
    ["sequence","Fase 3 • Sequência Desafiadora","Complete sequências","orange"],
    ["compare","Fase 4 • Maior, Menor ou Igual","Compare números","green"],
    ["missingNumber","Fase 5 • Número Perdido","Descubra o número","gold"],
    ["wordProblem","Fase 6 • Probleminhas","Pense e resolva","blue"],
    ["doubleHalf","Fase 7 • Dobro e Metade","Descubra o dobro ou metade","purple"],
    ["mixedG1","Fase 8 • Desafio Relâmpago","Misture tudo","orange"],
    ["sequence","Fase 9 • Sequência Maluca","Pule de 2 em 2 e de 5 em 5","green"],
    ["compare","Fase 10 • Duelo dos Números","Qual é maior?","gold"],
    ["addition","Fase 11 • Desafio até 30","Somas maiores","blue"],
    ["mixedG1","Fase 12 • Mestre dos Problemas","Desafio final misto","purple"]]},
  g2:{label:"2º Ano",title:"Missão Matemática",description:"Desafios com números maiores, sequências variadas, operações e problemas de raciocínio.",time:28,questions:8,lives:4,modes:[
    ["addition","Fase 1 • Soma até 100","Resolva as somas","blue"],
    ["subtraction","Fase 2 • Subtração até 100","Resolva as subtrações","purple"],
    ["sequence","Fase 3 • Sequências Secretas","Descubra a regra","orange"],
    ["compare","Fase 4 • Batalha dos Números","Maior, menor ou igual","green"],
    ["missingNumber","Fase 5 • Número Misterioso","Descubra o número","gold"],
    ["wordProblem","Fase 6 • Problemas do Dia","Use o raciocínio","blue"],
    ["multiplicationIntro","Fase 7 • Grupos Iguais","Introdução à multiplicação","purple"],
    ["doubleHalf","Fase 8 • Dobro e Metade","Pense rápido","orange"],
    ["sequence","Fase 9 • Sequência Saltitante","De 2, 3, 5 e 10 em 10","green"],
    ["compare","Fase 10 • Desafio de Comparação","Compare números de 2 e 3 algarismos","gold"],
    ["mixedG2","Fase 11 • Desafio Turbo","Misture as habilidades","blue"],
    ["mixedG2","Fase 12 • Grande Desafio","Desafio final misto","purple"]]},
  g3:{label:"3º ano",title:"Missões do 3º ano",description:"12 desafios variados, com contas mais fáceis, raciocínio e as quatro operações. Tempo: 30 segundos.",time:30,questions:12,lives:3,modes:[
    ["addition","Cidade da Soma","Adição fácil","blue"],["subtraction","Vale da Subtração","Subtração fácil","purple"],
    ["multiplication","Torre da Tabuada","Tabuada até 8","orange"],["division","Reino da Divisão","Divisões exatas","green"],
    ["compare","Duelo dos Números","Maior, menor ou igual","gold"],["sequence","Trilha das Sequências","Descubra a sequência","blue"],
    ["missingNumber","Número Perdido","Complete a sequência","purple"],["wordProblem","Probleminhas","Resolva situações simples","orange"],
    ["addition","Desafio da Soma","Mais contas de adição","green"],["subtraction","Desafio da Subtração","Mais contas de subtração","gold"],
    ["mixed","Templo Matemático","Misture as operações","blue"],["mixed","Grande Desafio","Desafio final do 3º ano","purple"]]},
  g4:{label:"4º ano",title:"Missões do 4º ano",description:"Quatro operações, frações, medidas e problemas.",time:15,questions:10,lives:3,modes:[
    ["addition","Cidade dos Grandes Números","Adição","blue"],["subtraction","Vale dos Desafios","Subtração","purple"],
    ["multiplication","Torre Multiplicadora","Multiplicação","orange"],["fraction","Ilha das Frações","Frações","green"],
    ["mixed","Templo Matemático","Misto","gold"]]},
  g5:{label:"5º ano",title:"Missões do 5º ano",description:"Operações, frações, decimais, porcentagens e desafios.",time:15,questions:10,lives:3,modes:[
    ["addition","Vila da Soma","Adição","blue"],["subtraction","Floresta dos Números","Subtração","purple"],
    ["multiplication","Torre da Tabuada","Multiplicação","orange"],["division","Reino da Divisão","Divisão","green"],
    ["mixed","Templo Matemático","Desafio misto","gold"],["boss","Desafio Final","Modo avançado","red"]]}
};
const RANKS_LOCAL=[
{name:'Bronze',icon:'🥉',min:0,next:500,color:'#cd7f32'},
{name:'Prata',icon:'🥈',min:500,next:1200,color:'#c7d0df'},
{name:'Ouro',icon:'🥇',min:1200,next:2500,color:'#ffd166'},
{name:'Platina',icon:'💠',min:2500,next:5000,color:'#65d8ff'},
{name:'Diamante',icon:'💎',min:5000,next:9000,color:'#8fa8ff'},
{name:'Mestre',icon:'👑',min:9000,next:null,color:'#dca7ff'}
];
function getRankInfo(points){
  if(window.FirebaseRanking && FirebaseRanking.getRankInfo) return FirebaseRanking.getRankInfo(points);
  const p=Math.max(0,Math.floor(Number(points)||0));let index=0;
  for(let i=0;i<RANKS_LOCAL.length;i++)if(p>=RANKS_LOCAL[i].min)index=i;
  const r=RANKS_LOCAL[index],nextRank=RANKS_LOCAL[index+1]||null;
  const progress=r.next===null?100:Math.min(100,Math.max(0,((p-r.min)/(r.next-r.min))*100));
  return {...r,index,points:p,progress,toNext:r.next===null?0:Math.max(0,r.next-p),nextName:nextRank?nextRank.name:null};
}
function syncLocalRank(){const r=getRankInfo(player.points);player.rank=r.name;player.rankIndex=r.index;player.rankIcon=r.icon;player.level=Math.max(1,Math.floor(player.points/100)+1);return r;}
function difficultyLevel(){return (player.grade==="pre1"||player.grade==="pre2")?0:getRankInfo(player.points).index;}

let selectedGrade=null;
let player={name:"",character:"fox",points:0,record:0,level:1,xp:0,grade:"g5",rank:"Bronze",rankIndex:0,rankIcon:"🥉",correctTotal:0,missionsCompleted:0,completedMissions:[]};

let game={
mode:"",question:0,totalQuestions:10,answer:0,lives:3,score:0,correct:0,wrong:0,combo:0,bestCombo:0,
locked:false,timeLimit:15,deadline:0,animationFrame:null
};

function showScreen(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function storageKey(){
return "mathQuestPlayer_"+player.name.toLowerCase().replace(/[^a-z0-9áéíóúãõç]+/gi,"_");
}

function savePlayer(){localStorage.setItem(storageKey(),JSON.stringify(player));}

function loadPlayer(){
const saved=localStorage.getItem(storageKey());
if(saved){
  try{
    player={...player,...JSON.parse(saved)};
    if(player.customization) customization={...customization,...player.customization};
    syncLocalRank();
  }catch(e){}
}
}

function buildCharacterOptions(){
const container=document.getElementById("characterOptions");container.innerHTML="";
Object.entries(animals).forEach(([id,c])=>{
const button=document.createElement("button");button.className="character-option"+(player.character===id?" selected":"");
button.innerHTML=`<div class="character-option-image">${createCharacterSVG(id)}</div><div><strong>${c.name}</strong><span>${c.role}</span></div>`;
button.onclick=()=>{
  player.character=id;
  customization={hair:null,shirt:null,skin:null};
  player.customization=customization;
  document.querySelectorAll(".character-option").forEach(x=>x.classList.remove("selected"));
  button.classList.add("selected");
  updateCharacterPreview();
  buildColorOptions();
};
container.appendChild(button);
});
}

function updateCharacterPreview(){
document.getElementById("bigCharacter").innerHTML=createCharacterSVG(player.character);
document.getElementById("previewName").textContent=currentAnimal().name;
document.getElementById("loginCharacter").innerHTML=createCharacterSVG(player.character);
}


function buildColorOptions(){
const box=document.getElementById("colorOptions");box.innerHTML="";
const feature=document.querySelector(".customize-btn.active")?.dataset.feature||"shirt";
palettes[feature].forEach(color=>{
const b=document.createElement("button");b.className="color-dot"+(customization[feature]===color?" active":"");
b.style.background=color;
b.title="Escolher cor";
b.onclick=()=>{
  customization[feature]=color;
  player.customization=customization;
  savePlayer();
  buildColorOptions();
  updateCharacterPreview();
};
box.appendChild(b);
});
}
document.querySelectorAll(".customize-btn").forEach(b=>b.addEventListener("click",()=>{
document.querySelectorAll(".customize-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");buildColorOptions();
}));

function loadPlayer(){
const saved=localStorage.getItem(storageKey());
if(saved){
  try{
    player={...player,...JSON.parse(saved)};
    if(player.customization) customization={...customization,...player.customization};
    syncLocalRank();
  }catch(e){}
}
}
function storageKey(){return "mathQuestPlayer_"+player.name.toLowerCase().replace(/[^a-z0-9áéíóúãõç]+/gi,"_");}
function savePlayer(){player.customization=customization;localStorage.setItem(storageKey(),JSON.stringify(player));}

function buildGradeOptions(){
  const box=document.getElementById("gradeOptions");box.innerHTML="";
  Object.entries(gradeProfiles).forEach(([id,p])=>{
    const b=document.createElement("button");
    b.className="grade-card"+(player.grade===id?" selected":"");
    b.innerHTML=`<div class="grade-number">${p.label}</div><strong>${p.title}</strong><span>${p.description}</span><b>→</b>`;
    b.onclick=()=>{selectedGrade=id;player.grade=id;document.querySelectorAll(".grade-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");setTimeout(openCharacterEditor,120);};
    box.appendChild(b);
  });
}
function openCharacterEditor(){
  buildCharacterEditor();
  document.getElementById("editorPoints").textContent=player.points;
  document.getElementById("previewPoints").textContent=player.points;
  document.getElementById("previewLevel").textContent=player.level;
  document.getElementById("previewXp").textContent=(player.xp%100)+" / 100 XP";
  document.getElementById("previewXpBar").style.width=(player.xp%100)+"%";
  showScreen("characterScreen");
}
function startLogin(){
  const input=document.getElementById("playerName"),name=input.value.trim();
  if(!name){input.focus();return;}
  player.name=name;loadPlayer();selectedGrade=player.grade||"g5";buildGradeOptions();showScreen("gradeScreen");
}
document.getElementById("startButton").onclick=startLogin;
document.getElementById("playerName").addEventListener("keydown",e=>{if(e.key==="Enter")startLogin();});
document.getElementById("gradeBack").onclick=()=>showScreen("loginScreen");
document.getElementById("enterGameButton").onclick=()=>{
  player.customization=JSON.parse(JSON.stringify(customization));
  savePlayer();
  updateDashboard();
  showScreen("menuScreen");
};
document.getElementById("editorBack").onclick=()=>{savePlayer();buildGradeOptions();showScreen("gradeScreen");};


async function updateDashboard(){
  const profile=gradeProfiles[player.grade]||gradeProfiles.g5;
  if(window.FirebaseRanking && FirebaseRanking.isConfigured()){
    try{
      const cloud=await FirebaseRanking.loadScore(player.grade||'g5');
      if(cloud && Number.isFinite(Number(cloud.points))){
        player.points=Number(cloud.points);
        player.xp=player.points;
        syncLocalRank();
        savePlayer();
      }
    }catch(e){
      console.warn('Não foi possível carregar o progresso do Firebase:', e); setRankingStatus('● Firebase: '+(e.message||'erro ao carregar'),'offline');
    }
  }
  document.getElementById("dashboardName").textContent=player.name;
  document.getElementById("dashboardGrade").textContent=profile.label;
  syncLocalRank();
  document.getElementById("dashboardLevel").textContent="Nível "+player.level+" • "+player.rank;
  document.getElementById("totalPoints").textContent=player.points;
  document.getElementById("recordPoints").textContent=player.record;
  document.getElementById("smallCharacter").innerHTML=createCharacterSVG();
  const xp=player.xp%100;
  document.getElementById("xpText").textContent=`${xp} / 100 XP`;
  document.getElementById("xpBar").style.width=xp+"%";
  document.getElementById("gradeBadge").textContent=profile.label.toUpperCase();
  document.getElementById("gradeTitle").textContent=profile.title;
  document.getElementById("gradeDescription").textContent=profile.description;
  buildMissionGrid();
  renderRankCard();
  renderAchievements();
  updateRanking();
}
function buildMissionGrid(){
  const profile=gradeProfiles[player.grade]||gradeProfiles.g5, ri=difficultyLevel();
  const box=document.getElementById("missionGrid");box.innerHTML="";
  profile.modes.forEach(([mode,title,subtitle,color],i)=>{
    const required=Math.min(Math.floor(i/2),5);
    const locked=ri<required;
    const reward=20+i*5;
    const completed=(player.completedMissions||[]).includes(mode);
    const b=document.createElement("button");b.className="mission-card"+(color==="gold"?" featured":"")+(color==="red"?" boss":"")+(locked?" locked":"")+(completed?" completed":"");
    const icon={blue:"+",purple:"−",orange:"×",green:"÷",gold:"★",red:"👑"}[color]||"•";
    const stars=Math.min(3,1+Math.floor(i/4));
    b.innerHTML=`<div class="mission-icon ${color}">${locked?'🔒':(completed?'✓':icon)}</div><div><strong>${title}${completed?' ✓':''}</strong><span>${locked?'Desbloqueia no rank '+RANKS_LOCAL[required].name:subtitle+' • dificuldade '+(ri+1)+' • bônus +'+reward+' pts'}</span><em class="mission-stars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</em></div><b>${locked?'🔒':(completed?'↻':'→')}</b>`;
    b.disabled=locked; if(!locked)b.onclick=()=>startGame(mode); box.appendChild(b);
  });
}
function renderRankCard(){
  syncLocalRank();
  const r=getRankInfo(player.points); const icon=document.getElementById('rankIcon'),name=document.getElementById('rankName'),next=document.getElementById('rankNext'),bar=document.getElementById('rankBar'),pct=document.getElementById('rankProgressText');
  if(!icon)return; icon.textContent=r.icon; name.textContent=r.name; name.style.color=r.color; pct.textContent=Math.round(r.progress)+'%'; bar.style.width=r.progress+'%'; bar.style.background=r.color;
  next.textContent=r.next===null?'Você alcançou o rank máximo!':`Faltam ${r.toNext} pontos para ${r.nextName}`;
}
const ACHIEVEMENTS=[
  ['first','🚀','Primeiro passo','Conclua sua primeira missão',p=>p.missionsCompleted>=1],
  ['500','⭐','500 pontos','Alcance 500 pontos',p=>p.points>=500],
  ['1200','🥇','Chegou ao Ouro','Alcance o rank Ouro',p=>p.points>=1200],
  ['2500','💠','Platina','Alcance o rank Platina',p=>p.points>=2500],
  ['5000','💎','Diamante','Alcance o rank Diamante',p=>p.points>=5000],
  ['combo','🔥','Combo de fogo','Faça um combo de 5 acertos',p=>(p.bestCombo||0)>=5],
  ['precision','🎯','Mira certeira','Termine uma missão com 90% ou mais',p=>(p.bestAccuracy||0)>=90],
  ['master','👑','Mestre da Matemática','Alcance o rank Mestre',p=>p.points>=9000]
];
function renderAchievements(){const box=document.getElementById('achievementGrid');if(!box)return;box.innerHTML='';ACHIEVEMENTS.forEach(([id,icon,title,desc,check])=>{const unlocked=check(player);const el=document.createElement('div');el.className='achievement-card '+(unlocked?'unlocked':'locked-achievement');el.innerHTML=`<div class="achievement-icon">${unlocked?icon:'🔒'}</div><div><strong>${title}</strong><span>${desc}</span></div>`;box.appendChild(el)})}

function updateRanking(){
  if(window.FirebaseRanking && FirebaseRanking.isConfigured()){
    setRankingStatus('● Conectando ao ranking...','sync');
    FirebaseRanking.watchRanking(player.grade||'g5', players=>{
      updateFirebasePill('ok'); setRankingStatus('● Ranking online','');
      renderRanking(players||[]);
    }, (err)=>{
      console.error('Firebase:', err);
      setRankingStatus('● Firebase: ' + (err && err.message ? err.message : 'erro de conexão'), 'offline');
      renderRanking(localRankingFallback());
    });
  }else{
    setRankingStatus('● Configure o Firebase para compartilhar','offline');
    renderRanking(localRankingFallback());
  }
}
function setRankingStatus(text,kind=''){
  const el=document.getElementById('rankingStatus');
  if(el){el.textContent=text;el.className='ranking-status '+kind;}
}
function characterForRanking(){return customization.animal||'fox';}
function localRankingFallback(){
  const players=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key&&key.startsWith('mathQuestPlayer_')){
      try{
        const p=JSON.parse(localStorage.getItem(key));
        if((p.grade||'g5')===(player.grade||'g5')) players.push(p);
      }catch(e){}
    }
  }
  if(!players.some(p=>p.name===player.name)) players.push(player);
  return players.sort((a,b)=>(b.points||0)-(a.points||0)).slice(0,50);
}
function createRankingCharacter(animal){
  const saved=JSON.parse(JSON.stringify(customization));
  customization={...saved,animal:['fox','panda','cat','rabbit','dog','tiger'].includes(animal)?animal:'fox'};
  const svg=createCharacterSVG();
  customization=saved;
  return svg;
}
function renderRanking(players){
  const box=document.getElementById('ranking');
  if(!box)return;
  box.innerHTML='';
  players.slice(0,10).forEach((p,i)=>{
    const row=document.createElement('div');
    row.className='ranking-row';
    const medal=i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1);
    row.innerHTML=`<strong>${medal}</strong><div class="ranking-player"><div class="rank-avatar">${createRankingCharacter(p.character)}</div><strong>${escapeHTML(p.name||'Jogador')}</strong></div><div class="rank-points">${Number(p.points)||0}</div><div class="rank-level">Nível ${Number(p.level)||1}</div>`;
    box.appendChild(row);
  });
}
async function sendScoreOnline(){
  if(!(window.FirebaseRanking && FirebaseRanking.isConfigured())){
    setRankingStatus('● Configure o Firebase para compartilhar','offline');
    return null;
  }
  try{
    updateFirebasePill('sync'); setRankingStatus('● Salvando pontuação...','sync');
    const saved=await FirebaseRanking.saveScore({
      name:player.name,
      score:game.score,
      level:player.level,
      character:characterForRanking(),
      grade:player.grade||'g5',
      rank:player.rank,
      rankIndex:player.rankIndex,
      mode:game.mode||'mixed',
      correct:game.correct,
      wrong:game.wrong,
      totalQuestions:game.totalQuestions,
      accuracy:game.totalQuestions ? Math.round((game.correct/game.totalQuestions)*100) : 0,
      bestCombo:game.bestCombo,
      timeLimit:game.timeLimit
    });
    if(saved && Number.isFinite(Number(saved.points))){
      player.points=Number(saved.points);
      player.xp=player.points;
      syncLocalRank();
      savePlayer();
    }
    updateFirebasePill('ok'); setRankingStatus('● Ranking online','');
    return saved;
  }catch(e){
    console.error('Firebase ranking:',e);
    const friendly=(window.FirebaseRanking && FirebaseRanking.explainError)
      ? FirebaseRanking.explainError(e)
      : (e && e.message ? e.message : 'não foi possível salvar agora');
    updateFirebasePill('off','● Firebase: erro'); setRankingStatus('● Firebase: ' + friendly,'offline');
    return null;
  }
}

function escapeHTML(text){const d=document.createElement("div");d.textContent=text;return d.innerHTML;}

function startGame(mode){
  cancelTimer();
  const profile=gradeProfiles[player.grade]||gradeProfiles.g5;
  const ri=difficultyLevel();
  const phaseIndex=Math.max(0,profile.modes.findIndex(m=>m[0]===mode));
  const phaseBonus=20+phaseIndex*5;
  game={mode,grade:player.grade,question:0,totalQuestions:profile.questions,answer:0,lives:profile.lives,score:0,correct:0,wrong:0,combo:0,bestCombo:0,locked:false,timeLimit:(player.grade==="g3"?30:Math.max(8,profile.time-ri*1.2)),deadline:0,animationFrame:null,phaseIndex,phaseBonus};
  showScreen("gameScreen");updateGameHeader();nextQuestion();
}
function nextQuestion(){
  cancelTimer();
  if(game.question>=game.totalQuestions){finishGame("complete");return;}
  if(game.lives<=0){finishGame("lives");return;}
  game.question++;game.locked=false;
  const q=generateQuestion(game.mode,game.grade);game.answer=q.answer;
  document.getElementById("questionNumber").textContent=game.question;
  document.querySelector(".question-counter span").textContent=" / "+game.totalQuestions;
  document.getElementById("questionType").textContent=q.type;
  document.getElementById("questionText").innerHTML=String(q.text).replace(/\n/g,"<br>");
  document.getElementById("feedback").textContent="";
  document.getElementById("answers").innerHTML="";
  document.getElementById("timerText").textContent=game.timeLimit.toFixed(1);
  document.getElementById("timerBar").style.width="100%";
  createAnswers(q.answer,q.options);updateGameHeader();startTimer();
}
function makeNear(answer,step=1,spread=10){
  const vals=[answer];let tries=0;
  while(vals.length<4&&tries<100){tries++;
    const delta=Math.floor(Math.random()*Math.max(2,spread*2+1))-Math.max(1,spread);
    let v=typeof answer==="number"&&answer%1!==0?Number((answer+delta*step).toFixed(1)):answer+delta*step;
    if(v>=0&&!vals.includes(v))vals.push(v);
  }
  while(vals.length<4){const v=answer+vals.length;if(!vals.includes(v))vals.push(v);}
  return vals;
}

function easyOptions(answer,max){
  const vals=[answer];
  while(vals.length<4){const v=random(1,max);if(!vals.includes(v))vals.push(v);}
  return vals;
}
function generatePreQuestion(mode,grade){
  const isPre1=grade==="pre1";
  const max=isPre1?5:10;
  const pick=(arr)=>arr[random(0,arr.length-1)];
  const options4=(answer,maxOpt=max)=>{
    const vals=[answer]; let guard=0;
    while(vals.length<4 && guard++<100){
      const v=random(1,Math.max(4,maxOpt));
      if(!vals.includes(v)) vals.push(v);
    }
    return shuffle(vals);
  };

  if(mode==="count"){
    const n=random(1,max), icon=pick(["🍎","⭐","🐶","🌸","🧸"]);
    return {text:`Conte: ${Array(n).fill(icon).join(" ")} = ?`,answer:n,type:"CONTAGEM",options:options4(n,max)};
  }
  if(mode==="sameDifferent"){
    const n=random(1,isPre1?4:6), same=Math.random()<0.5;
    const a=Array(n).fill("🔵").join(" ");
    const b=same?a:Array(Math.max(1,n+(Math.random()<0.5?-1:1))).fill("🔵").join(" ");
    return {text:`${a}<br><br>${b}<br><br>São iguais ou diferentes?`,answer:same?"IGUAIS":"DIFERENTES",type:"OBSERVE",options:["IGUAIS","DIFERENTES"]};
  }
  if(mode==="colorMatch"){
    const colors=[["🔴","VERMELHO"],["🔵","AZUL"],["🟡","AMARELO"],["🟢","VERDE"]];
    const p=pick(colors);
    return {text:`Qual é a cor? ${p[0]}`,answer:p[1],type:"CORES",options:colors.map(x=>x[1])};
  }
  if(mode==="shapes"){
    const shapes=[["círculo",0],["quadrado",4],["triângulo",3]];
    const picked=pick(shapes);
    return {text:`Qual é a forma? ${picked[0]} 🔵\n\nQuantos lados ela tem?`,answer:picked[1],type:"FORMAS",options:[0,3,4,5]};
  }
  if(mode==="sequenceEasy"){
    const start=isPre1?random(1,2):random(1,5), answer=start+3;
    return {text:`Complete: ${start} • ${start+1} • ${start+2} • ?`,answer,type:"SEQUÊNCIA",options:options4(answer,max)};
  }
  if(mode==="missingEasy"){
    const start=random(1,isPre1?3:6), answer=start+1;
    return {text:`Complete: ${start} • ? • ${start+2}`,answer,type:"NÚMERO PERDIDO",options:options4(answer,max)};
  }
  if(mode==="beforeAfter"){
    const n=isPre1?random(2,4):random(2,9), after=Math.random()<0.5, answer=after?n+1:n-1;
    return {text:after?`Qual número vem depois do ${n}?`:`Qual número vem antes do ${n}?`,answer,type:"VIZINHO DO NÚMERO",options:options4(answer,max)};
  }
  if(mode==="moreLess"){
    let a=random(1,max),b=random(1,max); while(a===b)b=random(1,max);
    const answer=Math.max(a,b);
    return {text:`Qual grupo tem mais?\n\n${"● ".repeat(a)}\nOU\n${"● ".repeat(b)}`,answer,type:"MAIS OU MENOS",options:[a,b,...options4(answer,max)].filter((v,i,arr)=>arr.indexOf(v)===i).slice(0,4)};
  }
  if(mode==="patterns"){
    const shapes=["🔵","🟡","🟢","🔴"], first=random(0,3), second=(first+1)%4;
    return {text:`Qual vem depois?\n${shapes[first]} ${shapes[second]} ${shapes[first]} ${shapes[second]} ?`,answer:shapes[first],type:"PADRÕES",options:[shapes[first],shapes[second],shapes[(second+1)%4],shapes[(first+2)%4]]};
  }
  if(mode==="additionVisual"){
    const maxA=isPre1?2:4, a=random(1,maxA), b=random(1,maxA), answer=a+b;
    return {text:`Junte ${Array(a).fill("🍎").join(" ")} + ${Array(b).fill("🍎").join(" ")} = ?`,answer,type:"SOMA COM DESENHOS",options:options4(answer,isPre1?5:8)};
  }
  if(mode==="subtractionVisual"){
    const a=random(2,isPre1?4:5), b=random(1,a-1), answer=a-b;
    return {text:`Você tem ${Array(a).fill("🧸").join(" ")} e tira ${b}. Quantos ficam?`,answer,type:"SUBTRAÇÃO COM DESENHOS",options:options4(answer,5)};
  }
  if(mode==="mixedEasy"){
    return generatePreQuestion(pick(["count","colorMatch","sequenceEasy","additionVisual","moreLess"]),grade);
  }
  return generatePreQuestion("count",grade);
}

function challengeOptions(answer,min,max){
  const vals=[answer];
  let guard=0;
  while(vals.length<4 && guard++<100){
    const v=random(min,max);
    if(!vals.includes(v)) vals.push(v);
  }
  return vals;
}
function challengeOptions(answer,min,max){
  const vals=[answer]; let guard=0;
  while(vals.length<4 && guard++<100){const v=random(min,max);if(!vals.includes(v))vals.push(v);}
  return vals.sort(()=>Math.random()-.5);
}
function generateGrade12Question(mode,grade){
  const g2=grade==="g2";
  if(mode==="addition"){
    const a=random(g2?25:10,g2?80:40), b=random(g2?15:8,g2?60:35), ans=a+b;
    return {text:`${a} + ${b} = ?`,answer:ans,type:"ADIÇÃO",options:challengeOptions(ans,Math.max(0,ans-20),ans+20)};
  }
  if(mode==="subtraction"){
    const a=random(g2?50:20,g2?120:60), b=random(g2?10:5,Math.floor(a*.65)), ans=a-b;
    return {text:`${a} − ${b} = ?`,answer:ans,type:"SUBTRAÇÃO",options:challengeOptions(ans,Math.max(0,ans-20),ans+20)};
  }
  if(mode==="compare"){
    const max=g2?999:99, a=random(g2?100:15,max), b=random(g2?100:15,max);
    return {text:`Qual símbolo completa? <br><b>${a} &nbsp; ? &nbsp; ${b}</b>`,answer:a>b?">":a<b?"<":"=",type:"COMPARAÇÃO",options:[">","<","=","≠"]};
  }
  if(mode==="missingNumber"){
    const step=random(g2?3:2,g2?12:6), start=random(g2?10:5,g2?80:35), pos=random(1,3);
    const nums=[start,start+step,start+step*2,start+step*3,start+step*4], ans=nums[pos]; nums[pos]="?";
    return {text:`Descubra a regra e complete:<br><b>${nums.join(" • ")}</b>`,answer:ans,type:"NÚMERO MISTERIOSO",options:challengeOptions(ans,Math.max(0,ans-step*2),ans+step*2)};
  }
  if(mode==="sequence"){
    const steps=g2?[2,3,4,5,10]:[2,3,5], step=steps[random(0,steps.length-1)];
    const start=random(g2?5:3,g2?50:25), nums=[start,start+step,start+step*2,start+step*3,start+step*4,start+step*5];
    const pos=random(2,4),ans=nums[pos]; nums[pos]="?";
    return {text:`Qual é a regra?<br><b>${nums.join(" • ")}</b>`,answer:ans,type:"SEQUÊNCIA",options:challengeOptions(ans,Math.max(0,ans-step*2),ans+step*2)};
  }
  if(mode==="wordProblem"){
    const a=random(g2?20:8,g2?70:35), b=random(g2?8:4,g2?30:15), type=random(0,2);
    if(type===0){const ans=a+b;return {text:`Uma turma tinha ${a} livros e recebeu mais ${b}. Quantos livros tem agora?`,answer:ans,type:"PROBLEMA",options:challengeOptions(ans,ans-15,ans+15)};}
    if(type===1){const total=a+b;return {text:`Havia ${total} alunos. ${b} saíram para o recreio. Quantos ficaram?`,answer:a,type:"PROBLEMA",options:challengeOptions(a,Math.max(0,a-15),a+15)};}
    const groups=g2?random(3,6):random(2,4), each=g2?random(3,8):random(2,5), ans=groups*each;
    return {text:`Há ${groups} grupos com ${each} objetos em cada grupo. Quantos objetos ao todo?`,answer:ans,type:"RACIOCÍNIO",options:challengeOptions(ans,1,50)};
  }
  if(mode==="doubleHalf"){
    const n=random(g2?6:4,g2?50:30); const even=n%2? n+1:n;
    const ask=Math.random()<.5, ans=ask?even*2:even/2;
    return {text:ask?`Qual é o dobro de ${even}?`:`Qual é a metade de ${even}?`,answer:ans,type:ask?"DOBRO":"METADE",options:challengeOptions(ans,Math.max(0,ans-15),ans+15)};
  }
  if(mode==="multiplicationIntro"){
    const a=random(2,g2?8:5),b=random(2,g2?10:6),ans=a*b;
    return {text:`São ${a} grupos com ${b} objetos em cada um.<br>Quantos objetos ao todo?`,answer:ans,type:"MULTIPLICAÇÃO",options:challengeOptions(ans,1,80)};
  }
  if(mode==="mixedG1"||mode==="mixedG2"){
    const list=g2?["addition","subtraction","sequence","compare","missingNumber","wordProblem","doubleHalf","multiplicationIntro"]:["addition","subtraction","sequence","compare","missingNumber","wordProblem","doubleHalf"];
    return generateGrade12Question(list[random(0,list.length-1)],grade);
  }
  return null;
}

function generateQuestion(mode,grade){
  if((grade==="g1"||grade==="g2"||grade==="g3")){
    const special=generateGrade12Question(mode,grade);
    if(special) return special;
  }
  const r=(a,b)=>random(a,b), ri=difficultyLevel();
  if(grade==="pre1"||grade==="pre2"){
    return generatePreQuestion(mode,grade);
  }
  let op=mode;
  if(mode==="mixed"||mode==="boss"){
    const ops={
      pre1:["count","compare","sequence","shapes","beforeAfter","missing","moreLess","patterns","additionVisual"],pre2:["count","addition","subtraction","sequence","compare","beforeAfter","missing","shapes","additionVisual"],
      g1:["addition","subtraction","sequence","compare"],g2:["addition","subtraction","multiplication","division"],
      g3:["addition","subtraction","multiplication","division","compare","sequence","missingNumber","wordProblem"],g4:["addition","subtraction","multiplication","fraction"],
      g5:["addition","subtraction","multiplication","division","fraction","decimal","percent"]
    };
    const list=ops[grade]||ops.g5;op=list[r(0,list.length-1)];
  }
  let a,b,answer,text,type,options;
  if(op==="count"){
    const max=grade==="pre1"?5:10,n=r(1,max);answer=n;text=`Conte: ${"● ".repeat(n).trim()} = ?`;type="CONTAGEM";options=makeNear(answer,1,Math.min(4,answer+2));
  }else if(op==="compare"){
    const lim=grade==="pre1"?5:10;a=r(1,lim);b=r(1,lim);if(a===b)b++;
    answer=Math.max(a,b);text=`Qual é o maior: ${a} ou ${b}?`;type="MAIOR NÚMERO";options=[a,b,...makeNear(answer,1,4).filter(v=>v!==a&&v!==b)].slice(0,4);
  }else if(op==="sequence"){
    const step=1,start=r(1,grade==="pre1"?2:5);answer=start+step*3;
    text=`Complete: ${start} • ${start+step} • ${start+step*2} • ?`;type="SEQUÊNCIA";options=makeNear(answer,1,4);
  }else if(op==="shapes"){
    const shapes=[["círculo",0],["quadrado",4],["triângulo",3]],picked=shapes[r(0,2)];
    answer=picked[1];text=`Quantos lados tem um ${picked[0]}?`;type="FORMAS";options=makeNear(answer,1,4);
  }else if(op==="beforeAfter"){
    const n=grade==="pre1"?r(2,5):r(2,10); const ask=r(0,1); answer=ask?n+1:n-1;
    text=ask?`Qual número vem depois do ${n}?`:`Qual número vem antes do ${n}?`; type="VIZINHO DO NÚMERO"; options=makeNear(answer,1,3);
  }else if(op==="missing"){
    const step=1, start=r(1,grade==="pre1"?2:6), pos=r(1,2); answer=start+step*pos;
    const arr=[start,start+step,start+step*2,start+step*3]; arr[pos]="?"; text=`Complete: ${arr.join(" • ")}`; type="NÚMERO ESCONDIDO"; options=makeNear(answer,1,4);
  }else if(op==="moreLess"){
    const a=r(1,grade==="pre1"?5:10), b=r(1,grade==="pre1"?5:10); answer=Math.max(a,b); text=`Qual grupo tem mais?  ${"● ".repeat(a)}  ou  ${"● ".repeat(b)}?`; type="MAIS OU MENOS"; options=[a,b,...makeNear(answer,1,4).filter(v=>v!==a&&v!==b)].slice(0,4);
  }else if(op==="patterns"){
    const shapes=["🔵","🟡","🟢","🔴"]; const first=r(0,3), second=(first+1)%4; answer=first; text=`Qual vem depois? ${shapes[first]} ${shapes[second]} ${shapes[first]} ${shapes[second]} ?`; type="PADRÕES"; options=[first,second,(second+1)%4,(first+2)%4];
    options=options.map(i=>shapes[i]); answer=shapes[first];
  }else if(op==="additionVisual"){
    const a=r(1,grade==="pre1"?2:4), b=r(1,grade==="pre1"?2:4); answer=a+b; text=`Junte ${"🍎 ".repeat(a)} + ${"🍎 ".repeat(b)} = ?`; type="SOMA VISUAL"; options=makeNear(answer,1,3);
  }else if(op==="addition"){
    const baseMax=grade==="pre2"?20:grade==="g1"?50:grade==="g2"?100:grade==="g3"?500:grade==="g4"?5000:5000; const max=grade==="g3"?500:baseMax*(1+ri*.15);
    a=r(1,Math.floor(max*.6));b=r(1,Math.floor(max*.4));answer=a+b;text=`${a} + ${b} = ?`;type="ADIÇÃO";options=makeNear(answer,2,Math.max(5,Math.floor(max*.05)));
  }else if(op==="subtraction"){
    const baseMax=grade==="pre2"?20:grade==="g1"?50:grade==="g2"?100:grade==="g3"?500:grade==="g4"?5000:8000; const max=grade==="g3"?500:baseMax*(1+ri*.15);
    a=r(Math.ceil(max*.4),max);b=r(1,Math.floor(max*.35));if(b>a)b=a;answer=a-b;text=`${a} − ${b} = ?`;type="SUBTRAÇÃO";options=makeNear(answer,2,Math.max(5,Math.floor(max*.04)));
  }else if(op==="multiplication"){
    const maxA=grade==="g3"?8:Math.min(20,(grade==="g2"?5:12)+ri*2);a=r(2,maxA);b=grade==="g3"?r(2,8):r(2,12+ri*2);answer=a*b;text=`${a} × ${b} = ?`;type="MULTIPLICAÇÃO";options=makeNear(answer,5,20);
  }else if(op==="division"){
    const divisor=grade==="g3"?r(2,8):r(2,Math.min(18,(grade==="g2"?5:12)+ri*2)),quotient=grade==="g3"?r(2,10):r(2,Math.min(30,(grade==="g2"?10:20)+ri*3));a=divisor*quotient;answer=quotient;text=`${a} ÷ ${divisor} = ?`;type="DIVISÃO";options=makeNear(answer,1,10);
  }else if(op==="fraction"){
    const den=r(2,Math.min(12,8+ri)),num=r(1,den-1);answer=num;text=`Quanto é ${num}/${den} de ${den}?`;type="FRAÇÃO";options=makeNear(answer,1,den+2);
  }else if(op==="decimal"){
    const x=r(10,90+ri*10)/10,y=r(10,90+ri*10)/10;answer=Number((x+y).toFixed(1));text=`${x.toFixed(1)} + ${y.toFixed(1)} = ?`;type="DECIMAIS";options=makeNear(answer,.1,1);
  }else if(op==="percent"){
    const percent=[10,20,25,50,75][r(0,Math.min(4,3+ri))],base=[20,40,60,80,100,200][r(0,Math.min(5,4+ri))];answer=base*percent/100;text=`${percent}% de ${base} = ?`;type="PORCENTAGEM";options=makeNear(answer,1,10);
  }
  return {text,answer,type,options};
}

function createAnswers(correct,providedOptions){
const values=providedOptions&&providedOptions.length===4?[...providedOptions]:[correct];
while(values.length<4){
const delta=random(-15,15),wrong=correct+delta;
if(wrong>=0&&!values.includes(wrong))values.push(wrong);
}
shuffle(values);
const box=document.getElementById("answers");
values.forEach(value=>{
const button=document.createElement("button");button.className="answer-button";button.textContent=value;
button.onclick=()=>answerQuestion(button,value);box.appendChild(button);
});
}

function startTimer(){
cancelTimer();
game.deadline=performance.now()+game.timeLimit*1000;
const text=document.getElementById("timerText"),bar=document.getElementById("timerBar");
function tick(){
if(game.locked)return;
const remaining=game.deadline-performance.now();
if(remaining<=0){text.textContent="0.0";bar.style.width="0%";cancelTimer();timeExpired();return;}
const seconds=remaining/1000;
text.textContent=seconds.toFixed(1);
bar.style.width=Math.max(0,Math.min(100,seconds/game.timeLimit*100))+"%";
const danger=seconds<=5;
text.classList.toggle("danger",danger);bar.classList.toggle("danger",danger);
game.animationFrame=requestAnimationFrame(tick);
}
game.animationFrame=requestAnimationFrame(tick);
}

function cancelTimer(){
if(game.animationFrame!==null){cancelAnimationFrame(game.animationFrame);game.animationFrame=null;}
}

function timeExpired(){
if(game.locked)return;
game.locked=true;game.wrong++;game.combo=0;
document.getElementById("feedback").textContent="Tempo esgotado. O desafio terminou.";
document.getElementById("feedback").style.color="#ff5b68";
document.querySelectorAll(".answer-button").forEach(b=>{if(String(b.textContent)===String(game.answer))b.classList.add("correct");});
setTimeout(()=>finishGame("time"),900);
}

function answerQuestion(button,value){
if(game.locked)return;
game.locked=true;cancelTimer();
if(value===game.answer){
button.classList.add("correct");game.correct++;game.combo++;game.bestCombo=Math.max(game.bestCombo,game.combo);
const remaining=Math.max(0,game.deadline-performance.now())/1000;
const gained=10+Math.floor(remaining)+Math.min(game.combo*2,20);
game.score+=gained;
document.getElementById("feedback").textContent=`Resposta correta! +${gained} pontos`;
document.getElementById("feedback").style.color="#20a875";
document.getElementById("questionText").classList.add("pop");
}else{
button.classList.add("wrong");game.wrong++;game.lives--;game.combo=0;
document.getElementById("feedback").textContent=`Resposta correta: ${game.answer}`;
document.getElementById("feedback").style.color="#ff5b68";
document.querySelectorAll(".answer-button").forEach(b=>{if(String(b.textContent)===String(game.answer))b.classList.add("correct");});
}
updateGameHeader();
setTimeout(()=>{if(game.lives<=0)finishGame("lives");else nextQuestion();},850);
}

function updateGameHeader(){
document.getElementById("roundPoints").textContent=game.score;
document.getElementById("combo").textContent="x"+game.combo;
[1,2,3].forEach(n=>document.getElementById("life"+n).classList.toggle("active",n<=game.lives));
}

async function finishGame(reason){
cancelTimer();
game.score+=game.phaseBonus||0;
player.points+=game.score;player.xp=player.points;player.record=Math.max(player.record,game.score);player.correctTotal=(player.correctTotal||0)+game.correct;player.missionsCompleted=(player.missionsCompleted||0)+1;player.completedMissions=Array.from(new Set([...(player.completedMissions||[]),game.mode]));player.bestCombo=Math.max(player.bestCombo||0,game.bestCombo);const missionTotal=game.correct+game.wrong;const acc=missionTotal?Math.round(game.correct/missionTotal*100):0;player.bestAccuracy=Math.max(player.bestAccuracy||0,acc);syncLocalRank();savePlayer();await sendScoreOnline();
document.getElementById("resultCharacter").innerHTML=createCharacterSVG(player.character);
document.getElementById("finalPoints").textContent=game.score;
document.getElementById("correctCount").textContent=game.correct;
document.getElementById("wrongCount").textContent=game.wrong;
const total=game.correct+game.wrong;
document.getElementById("accuracy").textContent=(total?Math.round(game.correct/total*100):0)+"%";
document.getElementById("bestCombo").textContent=game.bestCombo;
const title=document.getElementById("resultTitle"),message=document.getElementById("resultMessage");
if(reason==="time"){title.textContent="Tempo encerrado!";message.textContent="O tempo acabou e a missão foi finalizada."}
else if(reason==="lives"){title.textContent="Suas vidas acabaram";message.textContent="Continue praticando e tente novamente."}
else if(game.correct>=8){title.textContent="Excelente!";message.textContent="Você teve um ótimo desempenho!"}
else if(game.correct>=5){title.textContent="Muito bem!";message.textContent="Você está evoluindo."}
else{title.textContent="Boa tentativa!";message.textContent="Pratique mais uma vez para melhorar."}
showScreen("resultScreen");
}

document.getElementById("backMenu").onclick=()=>{updateDashboard();showScreen("menuScreen");};
document.getElementById("exitGame").onclick=()=>{cancelTimer();showScreen("menuScreen");};

function random(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}}



function updateFirebasePill(state, message){
  const el=document.getElementById('firebase-status-pill');
  if(!el)return;
  const map={
    ok:['● Firebase: online','#0f3b2c','#72f0b2'],
    sync:['● Firebase: conectando...','#332b12','#ffd76a'],
    off:['● Firebase: offline','#3a1820','#ff9ca8']
  };
  const m=map[state]||map.sync;
  el.textContent=message||m[0];
  el.style.background=m[1];
  el.style.color=m[2];
}

window.addEventListener('load',function(){
  if(!window.FirebaseRanking){
    updateFirebasePill('off','● Firebase: arquivo ausente');
    return;
  }
  if(!FirebaseRanking.isConfigured()){
    updateFirebasePill('off','● Firebase: não configurado');
    return;
  }
  updateFirebasePill('sync');
  FirebaseRanking.init()
    .then(function(){ updateFirebasePill('ok'); })
    .catch(function(e){
      updateFirebasePill('off','● Firebase: erro');
      console.warn('Firebase:',e);
    });
});

window.addEventListener('load',function(){
  const pill=document.getElementById('firebase-status-pill');
  if(pill){
    pill.title='Clique para testar novamente';
    pill.style.cursor='pointer';
    pill.addEventListener('click',async function(){
      try{
        updateFirebasePill('sync','● Firebase: testando...');
        await FirebaseRanking.init({requireAuth:false});
        updateFirebasePill('ok','● Firebase: online');
        updateRanking();
      }catch(e){
        updateFirebasePill('off','● Firebase: erro');
        setRankingStatus('● Firebase: '+(e.message||'erro'),'offline');
      }
    });
  }
});
