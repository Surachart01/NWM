'use client';
import {Children,cloneElement,isValidElement,useId,useState,useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
const terms={
'Internet Protocol':'โพรโทคอลอินเทอร์เน็ต: กติกาสำหรับระบุที่อยู่และส่งต่อแพ็กเก็ตระหว่างเครือข่าย',
'IPv4 Address':'ที่อยู่ IPv4: หมายเลขขนาด 32 บิต เช่น 192.168.1.10',
'IP Address':'ที่อยู่ไอพี: หมายเลขที่กำหนดให้อินเทอร์เฟซเพื่อระบุต้นทางและปลายทาง',
'IPv4':'Internet Protocol version 4: โพรโทคอลอินเทอร์เน็ตรุ่นที่ 4 ใช้ที่อยู่ 32 บิต',
'IPv6':'Internet Protocol version 6: โพรโทคอลอินเทอร์เน็ตรุ่นที่ 6 ใช้ที่อยู่ 128 บิต',
'Octet':'อ็อกเท็ต: กลุ่มข้อมูล 8 บิต มีค่าฐานสิบ 0–255; IPv4 มี 4 Octet',
'Host bits':'บิตส่วนโฮสต์: บิตที่ใช้ระบุที่อยู่ภายใน Subnet มีจำนวน 32 ลบ Prefix',
'Network bits':'บิตส่วนเครือข่าย: บิตด้านหน้าที่ใช้ระบุเครือข่าย จำนวนเท่ากับ Prefix',
'Network Portion':'ส่วนเครือข่าย: ส่วนของที่อยู่ที่ระบุว่าอยู่เครือข่ายใด',
'Host Portion':'ส่วนโฮสต์: ส่วนของที่อยู่ที่ระบุที่อยู่ภายในเครือข่าย',
'Subnet Mask':'ซับเน็ตมาสก์: ค่า 32 บิตที่แบ่งส่วน Network และ Host เช่น 255.255.255.0',
'Network Address':'ที่อยู่เครือข่าย: ค่าใช้ระบุ Subnet โดยบิตส่วน Host เป็น 0 ทั้งหมด',
'Broadcast Address':'ที่อยู่กระจายข้อมูล: ใช้ส่งถึงทุกโฮสต์ใน Subnet แบบ broadcast โดย Host bits เป็น 1 ทั้งหมด',
'First Usable IP':'ที่อยู่แรกที่กำหนดให้โฮสต์ได้ ใน Subnet ทั่วไปคือ Network Address + 1',
'Last Usable IP':'ที่อยู่สุดท้ายที่กำหนดให้โฮสต์ได้ ใน Subnet ทั่วไปคือ Broadcast Address − 1',
'First Usable':'ที่อยู่แรกที่กำหนดให้โฮสต์ได้ ใน Subnet ทั่วไปคือ Network Address + 1',
'Last Usable':'ที่อยู่สุดท้ายที่กำหนดให้โฮสต์ได้ ใน Subnet ทั่วไปคือ Broadcast Address − 1',
'Default Gateway':'ทางออกเริ่มต้น: ที่อยู่ของเราเตอร์ที่ใช้ส่งข้อมูลไปยังเครือข่ายอื่นเมื่อไม่มีเส้นทางเฉพาะ',
'Block Size':'ขนาดช่วง: ระยะเพิ่มของเครือข่ายใน Octet ที่พิจารณา คำนวณด้วย 256 − ค่า Mask ใน Octet นั้น',
'Wildcard Mask':'ไวลด์การ์ดมาสก์: ระบุบิตที่ตรวจสอบ (0) และบิตที่ไม่ตรวจสอบ (1) สำหรับ Subnet หาได้จาก 255.255.255.255 − Mask',
'Route Summarization':'การรวมเส้นทาง: รวมหลายเครือข่ายเป็น Prefix ที่สั้นลง โดยพิจารณาบิตด้านหน้าที่เหมือนกัน',
'Point-to-Point':'การเชื่อมต่อระหว่างปลายทางสองฝั่งโดยตรง เช่น ลิงก์ระหว่างเราเตอร์',
'Private IP':'ที่อยู่ส่วนตัว: ที่อยู่สงวนสำหรับใช้ภายในเครือข่าย เช่น 192.168.0.0/16',
'Public':'สาธารณะ: ในบริบทที่อยู่ IP หมายถึงที่อยู่สำหรับการสื่อสารบนอินเทอร์เน็ตสาธารณะ',
'FLSM':'Fixed Length Subnet Mask: การแบ่งเครือข่ายย่อยขนาดเท่ากัน ใช้ Mask เดียวกัน',
'VLSM':'Variable Length Subnet Mask: การแบ่งเครือข่ายย่อยต่างขนาดตามจำนวนโฮสต์',
'CIDR':'Classless Inter-Domain Routing: การระบุเครือข่ายด้วย Prefix โดยไม่ยึด Class A, B หรือ C',
'Prefix':'จำนวนบิตส่วน Network เช่น /24 หมายถึงส่วนเครือข่าย 24 บิต',
'Subnets':'เครือข่ายย่อยหลายเครือข่าย แต่ละเครือข่ายมีขอบเขตตาม Prefix',
'Subnet':'เครือข่ายย่อย: กลุ่มที่อยู่ IP ที่มีส่วน Network ร่วมกันตาม Prefix',
'Network Layer':'ชั้นเครือข่าย: OSI ชั้นที่ 3 เกี่ยวข้องกับที่อยู่ IP และการส่งต่อระหว่างเครือข่าย',
'Network':'เครือข่าย: ในการคำนวณ IP หมายถึงส่วนที่ระบุเครือข่าย',
'Host':'โฮสต์: อุปกรณ์หรืออินเทอร์เฟซที่ใช้ที่อยู่ภายในเครือข่าย',
'Broadcast':'การกระจายข้อมูลถึงทุกโฮสต์ในเครือข่ายย่อยแบบ broadcast',
'Mask':'มาสก์: ในบทนี้หมายถึง Subnet Mask ที่แบ่งส่วน Network และ Host',
'Gateway':'เกตเวย์: อุปกรณ์ที่เป็นทางออกไปยังเครือข่ายอื่น',
'Router':'เราเตอร์: อุปกรณ์ส่งต่อแพ็กเก็ตระหว่างเครือข่าย',
'LAN':'Local Area Network: เครือข่ายเฉพาะบริเวณ เช่น ภายในห้องเรียน',
'VLAN':'Virtual LAN: การแบ่งเครือข่าย Layer 2 แบบตรรกะบนสวิตช์',
'AND':'การดำเนินการทางตรรกะ: ผลเป็น 1 เฉพาะเมื่อบิตทั้งสองเป็น 1 ใช้หา Network จาก IP และ Mask',
'Bit':'บิต: หน่วยข้อมูลที่มีค่า 0 หรือ 1',
'IP':'Internet Protocol: โพรโทคอลสำหรับการสื่อสารระดับเครือข่าย',
'OSI':'แบบจำลองอ้างอิงการสื่อสาร 7 ชั้น ใช้อธิบายหน้าที่ของระบบเครือข่าย',
'ACL':'Access Control List: รายการเงื่อนไขที่ใช้อนุญาตหรือปฏิเสธการรับส่งข้อมูล',
'Routing':'การกำหนดเส้นทางสำหรับส่งแพ็กเก็ตไปยังเครือข่ายปลายทาง',
'Wildcard':'ค่าที่ใช้กำหนดว่าบิตใดต้องตรวจสอบหรือไม่ต้องตรวจสอบ เช่น ใน ACL',
'Packet Tracer':'โปรแกรมจำลองเครือข่ายของ Cisco สำหรับฝึกเชื่อมต่อและกำหนดค่าอุปกรณ์',
'Ping':'เครื่องมือตรวจสอบการตอบกลับผ่านเครือข่ายโดยใช้ ICMP',
'PC':'Personal Computer: เครื่องคอมพิวเตอร์ส่วนบุคคล',
'Server':'เครื่องแม่ข่าย: อุปกรณ์ให้บริการแก่เครื่องอื่นในเครือข่าย',
'Printer':'เครื่องพิมพ์',
'Management IP':'ที่อยู่ IP สำหรับเข้าบริหารจัดการอุปกรณ์เครือข่าย'
};
const keys=Object.keys(terms).sort((a,b)=>b.length-a.length);
const regex=new RegExp('(?<![A-Za-z])('+keys.join('|')+')(?![A-Za-z0-9])','gi');
function Term({term}){const id=useId(),ref=useRef(null);const [open,setOpen]=useState(false),[pos,setPos]=useState({});const key=keys.find(k=>k.toLowerCase()===term.toLowerCase());function show(){const r=ref.current.getBoundingClientRect(),w=Math.min(330,window.innerWidth-24);setPos({left:Math.min(Math.max(12,r.left),window.innerWidth-w-12),top:r.bottom+10,width:w,...(r.bottom>window.innerHeight-170?{top:'auto',bottom:window.innerHeight-r.top+10}:{})});setOpen(true)}useEffect(()=>{if(!open)return;const close=e=>{if(!ref.current?.contains(e.target))setOpen(false)};const esc=e=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('pointerdown',close);document.addEventListener('keydown',esc);window.addEventListener('scroll',close,true);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',esc);window.removeEventListener('scroll',close,true)}},[open]);return <span className="ip-term"><button ref={ref} type="button" aria-describedby={open?id:undefined} aria-expanded={open} onMouseEnter={show} onMouseLeave={()=>setOpen(false)} onFocus={show} onBlur={()=>setOpen(false)} onClick={show}>{term}<sup aria-hidden="true">ⓘ</sup></button>{open&&createPortal(<span id={id} role="tooltip" className="ip-term-popup" style={pos}>{terms[key]}</span>,document.body)}</span>}
export function Explain({children}){if(typeof children!=='string')return children;return children.split(regex).map((part,i)=>keys.some(k=>k.toLowerCase()===part.toLowerCase())?<Term key={i} term={part}/>:part)}
const skip=new Set(['button','a','input','textarea','select','option','svg','code','pre','label']);
export function ExplainTree({children}){function walk(node){if(typeof node==='string')return <Explain>{node}</Explain>;if(!isValidElement(node)||typeof node.type!=='string'||skip.has(node.type))return node;return cloneElement(node,{},Children.map(node.props.children,walk))}return Children.map(children,walk)}
