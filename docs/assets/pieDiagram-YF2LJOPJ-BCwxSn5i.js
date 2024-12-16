import{p as B}from"./chunk-TMUBEWPD-CO6DEI0m.js";import{B as U,p as q,q as K,s as V,g as Z,c as j,b as H,_ as i,l as C,v as J,d as Q,C as X,G as Y,I as ee,K as z,L as te,k as ae,M as re}from"./index-DNVCC_fS.js";import{p as ie}from"./gitGraph-YCYPL57B-DAKmpljS.js";import"./_basePickBy-CeWgXKQA.js";import"./reduce-BqzYMoXu.js";import"./clone-kAcwC83r.js";var G=U.pie,D={sections:new Map,showData:!1,config:G},h=D.sections,w=D.showData,se=structuredClone(G),oe=i(()=>structuredClone(se),"getConfig"),ne=i(()=>{h=new Map,w=D.showData,J()},"clear"),le=i(({label:e,value:a})=>{h.has(e)||(h.set(e,a),C.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),ce=i(()=>h,"getSections"),pe=i(e=>{w=e},"setShowData"),de=i(()=>w,"getShowData"),F={getConfig:oe,clear:ne,setDiagramTitle:q,getDiagramTitle:K,setAccTitle:V,getAccTitle:Z,setAccDescription:j,getAccDescription:H,addSection:le,getSections:ce,setShowData:pe,getShowData:de},ge=i((e,a)=>{B(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ue={parse:i(async e=>{const a=await ie("pie",e);C.debug(a),ge(a,F)},"parse")},fe=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),he=fe,me=i(e=>{const a=[...e.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,n)=>n.value-s.value);return re().value(s=>s.value)(a)},"createPieArcs"),ve=i((e,a,M,s)=>{C.debug(`rendering pie chart
`+e);const n=s.db,y=Q(),T=X(n.getConfig(),y.pie),$=40,o=18,d=4,l=450,m=l,v=Y(a),c=v.append("g");c.attr("transform","translate("+m/2+","+l/2+")");const{themeVariables:r}=y;let[A]=ee(r.pieOuterStrokeWidth);A??(A=2);const _=T.textPosition,g=Math.min(m,l)/2-$,W=z().innerRadius(0).outerRadius(g),I=z().innerRadius(g*_).outerRadius(g*_);c.append("circle").attr("cx",0).attr("cy",0).attr("r",g+A/2).attr("class","pieOuterCircle");const b=n.getSections(),S=me(b),L=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],p=te(L);c.selectAll("mySlices").data(S).enter().append("path").attr("d",W).attr("fill",t=>p(t.data.label)).attr("class","pieCircle");let k=0;b.forEach(t=>{k+=t}),c.selectAll("mySlices").data(S).enter().append("text").text(t=>(t.data.value/k*100).toFixed(0)+"%").attr("transform",t=>"translate("+I.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(n.getDiagramTitle()).attr("x",0).attr("y",-(l-50)/2).attr("class","pieTitleText");const x=c.selectAll(".legend").data(p.domain()).enter().append("g").attr("class","legend").attr("transform",(t,u)=>{const f=o+d,P=f*p.domain().length/2,R=12*o,N=u*f-P;return"translate("+R+","+N+")"});x.append("rect").attr("width",o).attr("height",o).style("fill",p).style("stroke",p),x.data(S).append("text").attr("x",o+d).attr("y",o-d).text(t=>{const{label:u,value:f}=t.data;return n.getShowData()?`${u} [${f}]`:u});const O=Math.max(...x.selectAll("text").nodes().map(t=>(t==null?void 0:t.getBoundingClientRect().width)??0)),E=m+$+o+d+O;v.attr("viewBox",`0 0 ${E} ${l}`),ae(v,l,E,T.useMaxWidth)},"draw"),Se={draw:ve},$e={parser:ue,db:F,renderer:Se,styles:he};export{$e as diagram};
