(function(){
'use strict';
function order(rows,state){
 const ids=state?.questionOrder;
 if(!Array.isArray(ids)||ids.length!==rows.length||new Set(ids).size!==rows.length)return rows;
 const map=new Map(rows.map(r=>[r.id,r]));return ids.every(id=>map.has(id))?ids.map(id=>map.get(id)):rows;
}
function mix(rows,state,block){
 const old=order(rows,state),groups=[];
 if(block){const map=new Map();for(const r of rows){const k=block(r);if(!map.has(k)){const a=[];map.set(k,a);groups.push(a);}map.get(k).push(r);}}
 else for(const r of rows)groups.push([r]);
 for(let i=groups.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[groups[i],groups[j]]=[groups[j],groups[i]];}
 if(groups.length>1&&groups[0][0].id===old[0]?.id)groups.push(groups.shift());
 state.questionOrder=groups.flat().map(r=>r.id);return order(rows,state);
}
function mount(container,onShuffle){
 if(!container)return;const b=document.createElement('button');b.type='button';b.id='shuffle-content';b.className='outline content-shuffle';b.textContent='⤨ Shuffle';b.title='Shuffle question order. Your scores and assessment history stay saved.';b.onclick=()=>{onShuffle();b.blur();};container.append(b);
}
window.ActivityShuffle={order,mix,mount};
})();
