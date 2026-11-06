'use client';
import {useState} from 'react';

const areas=[
  ['พื้นที่ทำงาน','Logical คือพื้นที่วางอุปกรณ์และต่อสาย ส่วน Physical ใช้ดูการจัดวางอุปกรณ์ตามสถานที่'],
  ['อุปกรณ์และสายเชื่อมต่อ','เลือก PC จาก End Devices เลือก Switch จาก Network Devices และเลือกสายจาก Connections'],
  ['หน้าต่างตั้งค่าอุปกรณ์','คลิก PC แล้วเปิด Desktop → IP Configuration เพื่อกรอก IP Address และ Subnet Mask'],
  ['Realtime และ Simulation','Realtime ใช้ตั้งค่าและทดสอบเครือข่าย ส่วน Simulation ใช้ดูการส่งข้อมูลทีละเหตุการณ์'],
];
export default function PacketTracerOverview(){
  const [selected,setSelected]=useState(0);
  return <section className="ip-demo" aria-label="ภาพรวมหน้าจอ Packet Tracer">
    <h2>ภาพรวมหน้าจอ · เลือกส่วนที่ต้องการรู้จัก</h2>
    <p>แผนภาพย่อของหน้าจอโปรแกรม</p>
    <div className="pt-overview">
      <div className="pt-toolbar">File · Save · เครื่องมือเลือกและจัดวาง</div>
      <button className="pt-workspace" aria-pressed={selected===0} onClick={()=>setSelected(0)}>
        <strong>1 · พื้นที่ทำงาน Logical</strong>
        <span>PC → Switch → PC</span>
        <small>วางอุปกรณ์และลากสายเชื่อมต่อ</small>
      </button>
      <div className="pt-overview-bottom">
        {areas.slice(1).map(([title],i)=><button key={title} aria-pressed={selected===i+1} onClick={()=>setSelected(i+1)}>{i+2} · {title}</button>)}
      </div>
    </div>
    <div className="ip-explanation" aria-live="polite"><strong>{areas[selected][0]}</strong><p>{areas[selected][1]}</p></div>
    <p className="ip-hint">ตำแหน่งและชื่อปุ่มบางส่วนอาจต่างกันตามรุ่นของโปรแกรม</p>
  </section>;
}
