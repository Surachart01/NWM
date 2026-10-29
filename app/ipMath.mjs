// Arithmetic avoids signed 32-bit bitwise pitfalls for IPv4 values above 127.255.255.255.
export const weights = [128,64,32,16,8,4,2,1];
export function parseIP(input) {
  const pieces=String(input).trim().split('.');
  if(pieces.length!==4||pieces.some(x=>!/^\d{1,3}$/.test(x)||Number(x)>255)) throw new Error('กรอก IPv4 จำนวน 4 ส่วน แต่ละส่วนเป็นจำนวนเต็ม 0–255');
  return pieces.reduce((n,x)=>n*256+Number(x),0);
}
export function formatIP(n){if(!Number.isInteger(n)||n<0||n>4294967295)throw new Error('ที่อยู่นอกช่วง IPv4');return [24,16,8,0].map(b=>Math.floor(n/2**b)%256).join('.');}
export function binary(n){return Number(n).toString(2).padStart(8,'0');}
export function subnet(ip,prefix){
  const p=Number(prefix);if(!Number.isInteger(p)||p<0||p>32)throw new Error('Prefix ต้องเป็นจำนวนเต็ม 0–32');
  const value=parseIP(ip),size=2**(32-p),network=Math.floor(value/size)*size,last=network+size-1;
  const mask=4294967296-size;
  return {p,value,size,network,last,mask:formatIP(mask),wildcard:formatIP(size-1),networkIP:formatIP(network),broadcast:p>=31?'ไม่มี Broadcast สำหรับบริบทนี้':formatIP(last),first:formatIP(p>=31?network:network+1),end:formatIP(p>=31?last:last-1),hosts:p>=31?size:size-2};
}
export function requiredPrefix(hosts){const h=Number(hosts);if(!Number.isInteger(h)||h<1||h>4294967294)throw new Error('จำนวนที่อยู่โฮสต์ต้องเป็นจำนวนเต็ม 1–4,294,967,294');let bits=2;while(2**bits-2<h)bits++;return 32-bits;}
export function allocateVLSM(ip,prefix,demands){
  const base=subnet(ip,prefix);let cursor=base.network;
  if(!demands.length)throw new Error('ระบุอย่างน้อยหนึ่งเครือข่าย');
  return demands.map((hosts,index)=>({hosts:Number(hosts),index,p:requiredPrefix(hosts)})).sort((a,b)=>b.hosts-a.hosts||a.index-b.index).map(row=>{
    const size=2**(32-row.p);cursor=Math.ceil(cursor/size)*size;
    if(cursor+size>base.network+base.size)throw new Error('พื้นที่เครือข่ายตั้งต้นไม่เพียงพอ กรุณาลดจำนวนโฮสต์หรือจำนวนแผนก');
    const result={...row,...subnet(formatIP(cursor),row.p),requested:row.hosts};cursor+=size;return result;
  });
}
