(function(root){
 'use strict';
 const games={"preposition":{"name":"Preposition Paths","tag":"Place, time and direction","description":"Choose the word that shows where, when or which way.","tone":"sage"},"question":{"name":"Question Quest","tag":"Ask the right question","description":"Use clues to choose who, what, where, when, why or how.","tone":"aqua"},"digraph":{"name":"Digraph Detective","tag":"Two letters, one sound","description":"Listen to words and identify their consonant digraphs.","tone":"lilac"},"classroom":{"name":"Classroom Coach","tag":"Words for learning together","description":"Choose clear, polite classroom words and requests.","tone":"peach"},"tense":{"name":"Time-Travel Verbs","tag":"Yesterday, today and tomorrow","description":"Match action words to the time in a sentence.","tone":"aqua"},"link":{"name":"Linking Words","tag":"Join ideas clearly","description":"Choose words that show reasons, results, choices and contrasts.","tone":"sage"},"grow":{"name":"Grow a Sentence","tag":"Add useful details","description":"Drag phrases to add who, what, where, when and why.","tone":"peach"},"weather":{"name":"Weather Watch","tag":"Explore weather words","description":"Use weather pictures and clues to name conditions, storms and forecasts.","tone":"aqua"}};
 const levels=['A','AA'];
 function fresh(){return {version:1,selected:'',profiles:{}};}
 function restore(value){try{const s=typeof value==='string'?JSON.parse(value):value;if(s?.version===1&&s.profiles&&typeof s.profiles==='object'&&!Array.isArray(s.profiles))return s;}catch(e){}return fresh();}
 function profile(state,id){return state.profiles[id]??={games:{},attempts:[]};}
 function game(profile,key){profile.games??={};return profile.games[key]??={level:'A',A:{position:0,entries:{}},AA:{position:0,entries:{}}};}
 function entry(profile,key,level,item){const g=game(profile,key);g[level]??={position:0,entries:{}};g[level].entries??={};return g[level].entries[item.id]??={complete:false,solved:false,tries:0,hints:0,listens:0,seconds:0,response:null,support:'',assessment:'Formative'};}
 function shuffle(values,random=Math.random){const a=values.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function clean(text){return String(text||'').replace(/[{}]/g,'');}
 function correct(item,response){return item.orders?Array.isArray(response)&&item.orders.some(order=>order.length===response.length&&order.every((value,i)=>value===response[i])):response===item.answer;}
 function describe(item,response){return item.orders?Array.isArray(response)?response.map(i=>Number.isInteger(i)?item.sentences[i]:'[empty]').join(' '):'':String(response??'');}
 function target(item){return item.orders?item.orders[0].map(i=>item.sentences[i]).join(' '):item.answer;}
 function log(profile,key,level,item,e,event,response,result=null,method='Tap',newPoint=false){profile.attempts??=[];profile.attempts.push({time:new Date().toISOString(),game:key,level,item:item.id,event,response:describe(item,response),correct:result,newPoint,method,tries:e.tries,hints:e.hints,listens:e.listens,support:e.support,assessment:e.assessment,seconds:Math.round(e.seconds||0)});}
 function submit(profile,key,level,item,response,method='Tap'){
  const e=entry(profile,key,level,item);if(e.solved)return {ignored:true,correct:true,newPoint:false};
  if(item.orders){if(!Array.isArray(response)||response.length!==item.orders[0].length||response.some(i=>!Number.isInteger(i)||!item.sentences[i])||new Set(response).size!==response.length)throw Error('Fill every paragraph slot with a different sentence first.');}
  else if(!item.options.includes(response))throw Error('Choose an offered answer.');
  e.tries++;e.response=Array.isArray(response)?response.slice():response;const result=correct(item,response),newPoint=result&&!e.complete;
  e.solved=result;if(result){e.complete=true;e.completedAt??=new Date().toISOString();}
  log(profile,key,level,item,e,item.orders?'Paragraph check':'Answer',response,result,method,newPoint);
  return {ignored:false,correct:result,newPoint};
 }
 function reset(profile,key,level,item){const e=entry(profile,key,level,item);e.response=null;e.solved=false;e.feedback='';return e;}
 function count(profile,key,level){const g=game(profile,key);return Object.values(g[level]?.entries||{}).filter(e=>e.complete).length;}
 function total(profile){return Object.keys(games).reduce((sum,key)=>sum+levels.reduce((n,level)=>n+count(profile,key,level),0),0);}
 root.LanguageCore={games,levels,fresh,restore,profile,game,entry,shuffle,clean,correct,describe,target,submit,reset,count,total,log};
 if(typeof module!=='undefined')module.exports=root.LanguageCore;
})(typeof window!=='undefined'?window:globalThis);
