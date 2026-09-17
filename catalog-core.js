(function(root){
 const PAGE_SIZE=20;
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function selectProducts(products,view,query,page=1){const q=normalize(query).trim();const filtered=products.filter(p=>(view==='balcao'?p.scope==='balcao':view==='encomendas'?p.scope==='encomendas':p.group===view)&&normalize(p.name+' '+p.description).includes(q));const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));const current=Math.min(Math.max(1,page),pages);return {items:filtered.slice((current-1)*PAGE_SIZE,current*PAGE_SIZE),total:filtered.length,page:current,pages,start:filtered.length?(current-1)*PAGE_SIZE+1:0,end:Math.min(current*PAGE_SIZE,filtered.length)}}
 const total=(price,qty)=>price==null?null:Math.round(price*qty*100)/100;
 function cakeTotal(price,weight,cover=0,shine=false,topper=false,tier=false){return Math.round(((price+cover)*weight+(shine?10:0)+(topper?40:0)+(tier?30:0))*100)/100}
 const api={PAGE_SIZE,normalize,selectProducts,total,cakeTotal};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CakeCatalog=api;
})(globalThis);
