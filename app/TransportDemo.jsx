'use client';
import {useEffect,useState} from 'react';
import {ArrowLeft,ArrowRight,Play,Pause,RotateCcw,Monitor,Server} from 'lucide-react';

function sequence(tcp,loss){
  if(!tcp)return [
    {text:'UDP ส่ง Datagram ได้โดยไม่สร้างการเชื่อมต่อก่อน',received:[]},
    {text:'ส่งชิ้น A ไปยังผู้รับ',token:'A',received:['A']},
    {text:loss?'ชิ้น B สูญหายระหว่างทาง':'ส่งชิ้น B ไปยังผู้รับ',token:'B',lost:loss,received:loss?['A']:['A','B']},
    {text:'ส่งชิ้น C ต่อไป โดยไม่รอการยืนยันจากผู้รับ',token:'C',received:loss?['A','C']:['A','B','C']},
    {text:loss?'ผู้รับได้ A และ C ส่วน B หายไป UDP ไม่มีการส่งซ้ำในตัว':'ผู้รับได้ A B C ในตัวอย่างนี้ แต่ UDP ไม่รับประกันการส่งถึงหรือลำดับ',received:loss?['A','C']:['A','B','C']}
  ];
  return [
    {text:'TCP เริ่มด้วยการสร้างการเชื่อมต่อ ก่อนส่งข้อมูล',received:[],delivered:[]},
    {text:'ผู้ส่งส่ง SYN เพื่อขอสร้างการเชื่อมต่อ',token:'SYN',received:[],delivered:[]},
    {text:'ผู้รับตอบ SYN + ACK กลับมา',token:'SYN + ACK',back:true,received:[],delivered:[]},
    {text:'ผู้ส่งตอบ ACK การเชื่อมต่อพร้อมรับส่งข้อมูล',token:'ACK',received:[],delivered:[]},
    {text:'ผู้รับได้ชิ้น A และส่งให้โปรแกรมตามลำดับ',token:'A',received:['A'],delivered:['A']},
    {text:loss?'ชิ้น B สูญหายระหว่างทาง':'ผู้รับได้ชิ้น B ต่อจาก A',token:'B',lost:loss,received:loss?['A']:['A','B'],delivered:loss?['A']:['A','B']},
    {text:loss?'ผู้รับได้ C แต่เก็บรอ B เพื่อส่งให้โปรแกรมตามลำดับ':'ผู้รับได้ C และส่งข้อมูล A B C ให้โปรแกรมตามลำดับ',token:'C',received:loss?['A','C']:['A','B','C'],delivered:loss?['A']:['A','B','C']},
    {text:loss?'เมื่อยังไม่ได้รับการยืนยัน B และหมดเวลารอ ผู้ส่งส่ง B ซ้ำ':'ผู้รับส่ง ACK ยืนยันข้อมูลที่ได้รับ',token:loss?'B · ส่งซ้ำ':'ACK',back:!loss,received:['A','B','C'],delivered:['A','B','C']},
    {text:loss?'ผู้รับได้ B แล้ว จึงส่ง B และ C ให้โปรแกรม และตอบ ACK':'โปรแกรมได้รับข้อมูลครบตามลำดับ A B C',token:loss?'ACK':null,back:true,received:['A','B','C'],delivered:['A','B','C']},
    {text:'ตัวอย่างเสร็จสิ้น TCP จัดการการส่งซ้ำและลำดับให้โปรแกรม',received:['A','B','C'],delivered:['A','B','C']}
  ];
}
function ProtocolLane({protocol,step,loss,playing}){
  const tcp=protocol==='TCP',events=sequence(tcp,loss),event=events[Math.min(step,events.length-1)];
  return <div className={`protocol-lane ${tcp?'tcp-lane':'udp-lane'}`}>
    <div className="protocol-title"><h3>{protocol}</h3><span>{tcp?'เชื่อมต่อ · ยืนยัน · ส่งซ้ำ':'ส่ง Datagram · ไม่มี ACK ในตัว'}</span></div>
    <div className="protocol-wire" aria-label={`${protocol} ${event.text}`}>
      <div className="protocol-end"><Monitor size={25}/><span>ผู้ส่ง</span></div>
      <div className="protocol-track"><span className="wire-line"/>{event.token&&<span key={`${step}-${loss}`} className={`wire-token ${event.back?'back':''} ${event.lost?'lost':''} ${playing?'':'paused'}`}>{event.token}</span>}{event.lost&&<span className="loss-mark" aria-hidden="true">×</span>}</div>
      <div className="protocol-end"><Server size={25}/><span>ผู้รับ</span></div>
    </div>
    <p className="protocol-caption" aria-live="polite">{event.text}</p>
    <div className="receive-tray"><span>ข้อมูลที่รับได้</span><div>{['A','B','C'].map(letter=><span key={letter} className={`receive-piece ${event.received.includes(letter)?'arrived':''} ${loss&&letter==='B'&&step>=(tcp?5:2)&&!event.received.includes(letter)?'missing':''}`}>{letter}</span>)}</div></div>
    <div className="application-tray"><span>ส่งให้โปรแกรม</span><strong>{(tcp?event.delivered:event.received).join(' → ')||'ยังไม่มีข้อมูล'}</strong>{tcp&&event.received.includes('C')&&!event.delivered.includes('C')&&<small>C เก็บรอ B อยู่ที่ TCP</small>}</div>
  </div>;
}
export default function TransportDemo(){
  const [step,setStep]=useState(0),[playing,setPlaying]=useState(false),[loss,setLoss]=useState(true);
  useEffect(()=>{if(!playing||step===9)return;const timer=setTimeout(()=>setStep(s=>s+1),2200);return()=>clearTimeout(timer)},[playing,step]);
  useEffect(()=>{if(step===9)setPlaying(false)},[step]);
  function jump(next){setPlaying(false);setStep(Math.max(0,Math.min(9,next)))}
  return <section className="transport-demo" aria-label="ภาพจำลอง TCP และ UDP">
    <div className="transport-intro"><span className="transport-kicker">LAYER 4 · TRANSPORT</span><h2>เมื่อข้อมูลหาย TCP และ UDP ทำอย่างไร</h2><p>A B C แทนชิ้นข้อมูลตัวอย่าง ลองติดตามชิ้น B ที่สูญหายระหว่างทาง</p></div>
    <label className="loss-switch"><input type="checkbox" checked={loss} onChange={e=>{setLoss(e.target.checked);setStep(0);setPlaying(false)}}/>จำลองชิ้น B สูญหายระหว่างทาง</label>
    <div className="protocol-comparison"><ProtocolLane protocol="TCP" step={step} loss={loss} playing={playing}/><ProtocolLane protocol="UDP" step={step} loss={loss} playing={playing}/></div>
    <div className="transport-controls"><button className="primary-button" onClick={()=>{if(step===9)setStep(0);setPlaying(v=>!v)}}>{playing?<Pause size={18}/>:<Play size={18}/>} {playing?'หยุดภาพจำลอง':'เล่นเปรียบเทียบ'}</button><button className="icon-button" aria-label="TCP UDP ขั้นก่อนหน้า" disabled={step===0} onClick={()=>jump(step-1)}><ArrowLeft size={18}/></button><span>ขั้นที่ {step+1} / 10</span><button className="icon-button" aria-label="TCP UDP ขั้นถัดไป" disabled={step===9} onClick={()=>jump(step+1)}><ArrowRight size={18}/></button><button className="icon-button" aria-label="เริ่มภาพจำลอง TCP UDP ใหม่" onClick={()=>jump(0)}><RotateCcw size={18}/></button></div>
    <p className="transport-note">ภาพย่อเพื่ออธิบายขั้นตอน ไม่ได้ใช้วัดความเร็ว · TCP ใช้หมายเลขลำดับไบต์จริง ส่วน UDP อาจมาถึงสลับลำดับได้ แอปพลิเคชันสามารถเพิ่มการยืนยันและส่งซ้ำเองได้</p>
  </section>;
}
