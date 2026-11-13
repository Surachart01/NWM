'use client';
import {useState,useEffect} from 'react';
import {ArrowLeft,ArrowRight,Play,Pause,RotateCcw,Film} from 'lucide-react';
import {animSpecs,vlanColor} from './animSpecs';
import {Explain} from './IPGlossary';

const PKT_Y=-50;
function Packet({label,tag,v,bad}){
  const w=16+label.length*8.5,tw=tag?58:0,fill=bad?vlanColor.bad:(vlanColor[v]||vlanColor[0]);
  return <g>
    <rect x={-(w+tw)/2} y={-14} width={w} height={28} rx={6} fill={fill}/>
    <text x={-(w+tw)/2+w/2} y={5} className="topo-pkt-label">{label}</text>
    {tag&&<><rect x={-(w+tw)/2+w+3} y={-12} width={tw-3} height={24} rx={4} fill="#fff7d6" stroke="#8a6d1d"/><text x={-(w+tw)/2+w+3+(tw-3)/2} y={5} className="topo-tag-label">แท็ก {tag}</text></>}
  </g>;
}

export default function TopoAnim({spec}){
  const S=animSpecs[spec],max=S.steps.length-1;
  const [step,setStep]=useState(0),[playing,setPlaying]=useState(false);
  useEffect(()=>{if(!playing)return;const id=setInterval(()=>setStep(s=>Math.min(max,s+1)),2300);return()=>clearInterval(id)},[playing,max]);
  useEffect(()=>{if(step>=max)setPlaying(false)},[step,max]);
  const cur=S.steps[step],N=Object.fromEntries(S.nodes.map(n=>[n.id,n])),subs=cur.subs||{};
  const table=cur.table&&S.tables[cur.table.name];
  function offs(i){const [a,b,,,off]=S.links[i];if(!off)return {x:0,y:0};const A=N[a],B=N[b],dx=B.x-A.x,dy=B.y-A.y,l=Math.hypot(dx,dy)||1;return {x:-dy/l*off,y:dx/l*off}}
  function ends(i){const [a,b]=S.links[i],A=N[a],B=N[b],o=offs(i);return {x1:A.x+o.x,y1:A.y+o.y,x2:B.x+o.x,y2:B.y+o.y}}
  return <section className="ip-demo topo-anim" aria-label={S.title}>
    <div className="ip-demo-heading"><Film size={19}/><h2>{S.title}</h2><span>ภาพเคลื่อนไหว · กดเล่นหรือกดถัดไปทีละขั้น</span></div>
    {S.legend&&<div className="topo-legend">{S.legend.map(([c,t])=><span key={t}><i style={{background:c}}/>{t}</span>)}</div>}
    <p className="topo-scroll-hint">เลื่อนภาพไปด้านข้างเพื่อดูให้ครบ</p><div className="topo-frame" tabIndex={0} aria-label="ภาพจำลอง เลื่อนแนวนอนได้บนจอเล็ก">
      <svg viewBox={`0 0 ${S.w} ${S.h}`} className="topo-svg" role="img" aria-label={cur.title}>
        {S.links.map(([a,b,label,kind0],i)=>{const kind=cur.lv?.[i]??kind0,e=ends(i),down=(cur.down||[]).includes(i),col=down?vlanColor.bad:kind==='trunk'?'#5b4636':kind==='bad'?vlanColor.bad:(vlanColor[kind]||'#9aa89f');
          return <g key={i} className={down?'topo-link-down':''}><line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={col} strokeWidth={kind==='trunk'?7:3.5} strokeDasharray={down||kind==='bad'?'7 6':undefined} strokeLinecap="round"/>{kind==='trunk'&&!down&&<line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#f5ece1" strokeWidth={2} strokeDasharray="10 8"/>}{down&&<g transform={`translate(${(e.x1+e.x2)/2},${(e.y1+e.y2)/2})`}><circle r={12} fill={vlanColor.bad}/><text y={5} className="topo-x">✕</text></g>}</g>})}
        {(cur.block||[]).map((b,i)=>{const e=ends(b.link),fromA=S.links[b.link][0]===b.at,t=b.t??.32,x=fromA?e.x1+(e.x2-e.x1)*t:e.x2+(e.x1-e.x2)*t,y=fromA?e.y1+(e.y2-e.y1)*t:e.y2+(e.y1-e.y2)*t;return <g key={'b'+i} transform={`translate(${x},${y})`} className="topo-block"><rect x={-22} y={-12} width={44} height={24} rx={5}/><text y={5}>{b.label||'BLK'}</text></g>})}
        {S.nodes.map(n=>{const hl=(cur.hl||[]).includes(n.id),w=n.w||64;
          return <g key={n.id} className={`topo-node ${n.kind||''} ${hl?'hl':''}`} transform={`translate(${n.x},${n.y})`}>
            <rect x={-w} y={-28} width={w*2} height={56} rx={10} style={(cur.nv?.[n.id]??n.v)?{stroke:vlanColor[cur.nv?.[n.id]??n.v],strokeWidth:3}:undefined}/>
            <text y={-4} className="topo-name">{n.label}</text>
            <text y={17} className="topo-sub">{subs[n.id]??n.sub}</text>
          </g>})}
        {S.links.map(([a,b,label,kind,off],i)=>{if(!label)return null;const e=ends(i),flat=Math.abs(e.y1-e.y2)<4;return <text key={'l'+i} x={(e.x1+e.x2)/2} y={(e.y1+e.y2)/2+(flat?(off?(off>0?20:-12):46):0)} dx={flat?0:16} className="topo-link-label">{label}</text>})}
        {(cur.notes||[]).map((t,i)=><text key={'n'+i} x={t.x} y={t.y} className={`topo-note ${t.bad?'bad':''}`}>{t.text}</text>)}
        {cur.at&&<g transform={`translate(${N[cur.at].x},${N[cur.at].y+PKT_Y})`}><Packet label={cur.atLabel||'●'} v={cur.atV}/></g>}
        {(cur.moves||[]).map((m,i)=>{const A0=N[m.from],B0=N[m.to],o=m.link!=null?offs(m.link):{x:0,y:0},py=m.link!=null?0:PKT_Y,ux=(B0.x-A0.x)/(Math.hypot(B0.x-A0.x,B0.y-A0.y)||1),uy=(B0.y-A0.y)/(Math.hypot(B0.x-A0.x,B0.y-A0.y)||1),ia=m.link!=null?(A0.w||64)+45:0,ib=m.link!=null?(B0.w||64)+45:0,A={x:A0.x+ux*ia,y:A0.y+uy*ia},B={x:B0.x-ux*ib,y:B0.y-uy*ib};
          return <g key={`${step}-${i}`} className="topo-pkt" style={{'--fx':`${A.x+o.x}px`,'--fy':`${A.y+o.y+py}px`,'--tx':`${B.x+o.x}px`,'--ty':`${B.y+o.y+py}px`,animationDelay:`${.1+(m.delay||0)}s`}}><Packet label={m.label} tag={m.tag} v={m.v} bad={m.bad}/></g>})}
        {(cur.drops||[]).map((d,i)=>{const n=N[d.at];return <g key={`${step}-d${i}`} className="topo-drop" transform={`translate(${n.x+(d.dx||0)},${n.y+(d.dy??46)})`}>
          <circle r={13} fill={vlanColor.bad}/><text y={5} className="topo-x">✕</text>
          <text x={20} y={5} className="topo-drop-label">{d.label}</text></g>})}
      </svg>
    </div>
    <div className="ip-explanation" aria-live="polite"><strong>{String(step+1).padStart(2,'0')} · {cur.title}</strong><p><Explain>{cur.text}</Explain></p></div>
    {table&&<div className="topo-table"><span>{table.title}</span><div className="table-wrap"><table><thead><tr>{table.headers.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{table.rows.map((r,i)=><tr key={i} className={cur.table.hl===i?'topo-row-hl':''}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div></div>}
    <div className="ip-controls">
      <button className="primary-button" onClick={()=>{if(step===max)setStep(0);setPlaying(!playing)}}>{playing?<Pause size={17}/>:<Play size={17}/>} {playing?'หยุดชั่วคราว':'เล่นอนิเมชัน'}</button>
      <button className="icon-button" aria-label="ขั้นก่อนหน้า" disabled={step===0} onClick={()=>{setPlaying(false);setStep(s=>s-1)}}><ArrowLeft size={18}/></button>
      <span>ขั้น {step+1} / {max+1}</span>
      <button className="icon-button" aria-label="ขั้นถัดไป" disabled={step===max} onClick={()=>{setPlaying(false);setStep(s=>s+1)}}><ArrowRight size={18}/></button>
      <button className="icon-button" aria-label="เริ่มภาพเคลื่อนไหวใหม่" onClick={()=>{setStep(0);setPlaying(false)}}><RotateCcw size={17}/></button>
    </div>
  </section>;
}
