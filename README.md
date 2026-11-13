# การจัดการระบบเครือข่าย — เว็บประกอบการสอน

เว็บหลักใช้ Next.js ประกอบด้วยเนื้อหา OSI 8 หัวข้อ (บทเดิม 03–10), แผนผัง OSI, เส้นทางข้อมูล และบทเรียน IPv4/Subnetting 14 หัวข้อพร้อมภาพจำลองแบบโต้ตอบ

## เปิดใช้งาน

```sh
npm ci
npm run dev
```

เปิด http://127.0.0.1:5174

## สร้างเว็บพร้อมใช้งาน

```sh
npm run build
npm start
```

ผลลัพธ์อยู่ใน `out/` และใช้ static hosting ได้โดยตรง ความคืบหน้าในการอ่านบันทึกในเบราว์เซอร์ของแต่ละเครื่อง

## สื่อเดิม

เลือก “เปิดสื่อรายวิชาเดิม” ในสารบัญ หรือเปิด `/previous/index.html`
ซอร์สเดิมและผล build ก่อนย้ายสำรองอยู่ที่ `../nwm-slides-original-20261021/` ส่วนเว็บเดิมที่เปิดใช้งานได้ถูกเก็บไว้ใน `public/previous/`

โฟลเดอร์นี้เป็นโปรเจ็กต์ภายในเครื่อง ไม่ผูกกับรหัสเว็บไซต์ที่เผยแพร่ของ network-week1

## Deploy บน Vercel

โปรเจ็กต์ใช้ Next.js แบบ static export และสร้างเว็บใน `out` โดย `vercel.json` กำหนด Framework เป็น Other, Build Command เป็น `npm run build` และ Output Directory เป็น `out` เพื่อแทนการตั้งค่า Vite เดิมที่ใช้ `dist`

ตั้ง Root Directory ของ Vercel ให้ตรงกับโฟลเดอร์ `nwm-slides` ที่มี `package.json` และ `vercel.json` จากนั้น deploy source ล่าสุดอีกครั้ง ไม่ต้องอัปโหลดโฟลเดอร์ `out` หรืออาศัยลิงก์ `dist` ในเครื่อง

ห้ามเก็บ symlink `dist -> out` ใน Git เพราะเมื่อ checkout ใหม่ยังไม่มี `out` ทำให้ `next build` ล้มเหลวด้วย ENOENT ระหว่างอ่าน `dist` ก่อนเริ่มสร้างเว็บ การทดสอบ deploy ต้องเริ่มจากโฟลเดอร์ที่ไม่มี `.next` และ `out` เดิม


## บทเรียน IP Address

หน้าแรกแสดงหน่วยการเรียนแยกกัน เลือก **เข้าสู่หน่วยที่ 2** เพื่อเรียน IP Address เปิดตรงบทแรกได้ด้วย `/#ip-intro` และบทแปลงเลขฐานสองด้วย `/#ip-binary` URL fragment ใช้กับ static hosting ได้โดยไม่เพิ่ม routing configuration

- เริ่มต้น: IPv4, ฐานสอง, Subnet Mask, Network/Broadcast และ AND
- ฝึกคำนวณ: Block Size, ข้าม Octet, เปรียบเทียบ Subnet และเลือก Prefix ตามจำนวน Host
- แบ่งเครือข่าย: FLSM และ VLSM พร้อมตรวจพื้นที่ไม่เพียงพอ
- เสริมและทบทวน: Wildcard, Summarization, สูตร, Private IP และโจทย์คำนวณ 5 ข้อ

ภาพจำลองที่มีลำดับรองรับเล่นอัตโนมัติ หยุด ย้อนขั้น และเริ่มใหม่ สามารถเลือกเฉพาะภาพจำลองสำหรับโหมดฉายหรืออ่านเนื้อหาเต็มได้ ตัวเลือกบทเรียนยังแสดงเมื่อซ่อนสารบัญในโหมดฉาย ความคืบหน้า IP แยกจาก OSI และเก็บใน localStorage ของเบราว์เซอร์ ไม่มีการส่งคะแนนหรือทดสอบเครือข่ายจริง

เนื้อหา: `app/ipLessons.js` · ภาพจำลอง: `app/IPCourse.jsx` · สูตร: `app/ipMath.mjs`

### ตรวจสูตรคำนวณ

```sh
node --test tests/ipMath.test.mjs
```

ครอบคลุม IPv4 ที่มีบิตสูง, /0–/32, ตัวอย่าง /26, การข้าม Octet, เงื่อนไขเลือก Prefix และ VLSM ที่พื้นที่ไม่เพียงพอ

### สถานะการตรวจรุ่นเพิ่มบท IP Address

- Production build และ static export ผ่าน
- ชุดทดสอบคำนวณผ่าน 7 รายการ
- ยังไม่ได้ตรวจการแสดงผลและปฏิสัมพันธ์ในเบราว์เซอร์: สภาพแวดล้อมการแก้ไขปฏิเสธการ bind พอร์ต preview (`Operation not permitted`)
- ยังไม่ได้เผยแพร่รุ่นนี้ไปยังโฮสต์ภายนอก


## การออกแบบแยกหน่วย

- หน้าแรก `/#units` แสดงหน่วยที่ 1 และหน่วยที่ 2 ให้เลือกก่อนเข้าเนื้อหา
- หน่วยที่ 1: พื้นฐานเครือข่ายและ OSI ใช้โทนเขียว มีเฉพาะแท็บบทเรียน สำรวจ OSI และเส้นทางข้อมูล
- หน่วยที่ 2: IP Address และ Subnetting ใช้โทนน้ำเงิน มีสารบัญ 14 หัวข้อและภาพจำลองการคำนวณ
- ปุ่มตรารายวิชาและปุ่มหน่วยการเรียนทั้งหมดกลับหน้าเลือกหน่วยได้ รองรับ Back/Forward และ URL ตรงรายหัวข้อ
- URL เดิม `/#ip-intro` ยังคงเปิดหน่วยที่ 2 ได้โดยตรง

## หน่วยที่ 3 ปฏิบัติการ Packet Tracer

หน้าแรกมี 3 หน่วย หน่วยที่ 2 เหลือเฉพาะ IP Address 6 หัวข้อ ส่วนบท Packet Tracer ทั้ง 26 หัวข้อย้ายมาเป็นหน่วยที่ 3 ใช้โทนสีน้ำตาลส้ม และเก็บความคืบหน้าแยกใน localStorage คีย์ `nvc-pt-progress`

- `/#pt-packet-intro` รู้จัก Cisco Packet Tracer
- `/#pt-packet-setup` ดาวน์โหลดและเตรียมใช้งาน
- `/#pt-packet-overview` ภาพรวมหน้าจอและอุปกรณ์
- `/#pt-packet-lab1` Lab 1 ต่อเครือข่ายแรกและทดสอบ ping
- `/#pt-packet-simulation` ดูข้อมูลวิ่งด้วยโหมด Simulation พร้อมภาพจำลอง ARP และ ICMP ทีละขั้น
- `/#pt-packet-networks` เครื่องต่างวงและการหาจุดเสีย
- `/#pt-packet-switch-cli` พื้นฐานการใช้ CLI ของ Cisco
- `/#pt-packet-switch-manage` ตั้งค่า Switch ให้พร้อมใช้งานจริง
- `/#pt-packet-vlan-intro` รู้จัก VLAN ก่อนลงมือ (แนวคิด พร้อมอนิเมชันก่อนและหลังแบ่ง VLAN)
- `/#pt-packet-vlan` Lab 2 VLAN และ Trunk
- `/#pt-packet-intervlan` Lab 3 Inter-VLAN แบบ Router-on-a-stick
- `/#pt-packet-routing` Lab 4 Static Route และ Default Route
- `/#pt-packet-dhcp` Lab 5 DHCP Server และ DHCP Snooping
- `/#pt-packet-stp` Lab 6 STP, PortFast, BPDU Guard, Loop Guard
- `/#pt-packet-lacp` Lab 7 EtherChannel LACP
- `/#pt-packet-nat` Lab 8 NAT Overload และ Port Forward
- `/#pt-packet-acl` Lab 9 Standard / Extended ACL และ access-class
- `/#pt-packet-midterm` ทบทวนก่อนสอบกลางภาค


### บทแนวคิดก่อน Lab

ก่อน Lab ทุกเรื่องมีบทแนวคิดที่อธิบายด้วยภาษาง่าย การเปรียบเทียบ ตาราง และอนิเมชัน ส่วนบท Lab เน้นขั้นตอนลงมือทำและหน้าจอ CLI จำลอง

- `/#pt-packet-devices-intro` รู้จักอุปกรณ์เครือข่ายในองค์กร (อนิเมชัน access)
- `/#pt-packet-vlan-intro` รู้จัก VLAN ก่อนลงมือ (vlanConcept)
- `/#pt-packet-intervlan-intro` ข้าม VLAN ต้องผ่าน Gateway (gateway)
- `/#pt-packet-routing-intro` Router ส่งข้อมูลไปวงอื่นได้อย่างไร (routing)
- `/#pt-packet-dhcp-intro` DHCP แจก IP อัตโนมัติ (dhcp)
- `/#pt-packet-stp-intro` STP กันวงในเครือข่าย (stp)
- `/#pt-packet-lacp-intro` EtherChannel รวมหลายสายเป็นหนึ่ง (lacp)
- `/#pt-packet-nat-intro` NAT และ Firewall (nat)
- `/#pt-packet-acl-intro` ACL กำหนดสิทธิ์การเข้าถึง (acl)

หน้าจอ CLI จำลองแบบกดทีละขั้นอยู่ใน `app/cliScripts.js` และแสดงผลด้วย `CliDemo` ใน `app/IPCourse.jsx`

อนิเมชันแผนผังเครือข่าย (ข้อมูลวิ่งระหว่างอุปกรณ์ ติดแท็ก VLAN ค้นตาราง Routing และ DORA) อยู่ใน `app/animSpecs.js` แสดงผลด้วย `app/TopoAnim.jsx` บทเรียนเรียกใช้ผ่านฟิลด์ `anim` ใน `app/ipLessons.js` มี 12 ชุด: access, gateway, modes, vlanConcept, vlan, intervlan, routing, dhcp, stp, lacp, nat, acl

ลิงก์เดิมแบบ `/#ip-packet-...` ยังเปิดได้ และจะเปลี่ยนเป็น `/#pt-packet-...` ให้อัตโนมัติ เนื้อหาทุกบทยังอยู่ใน `app/ipLessons.js` โดยแยกด้วย export `ipLessons` และ `ptLessons`

คำศัพท์ใน Tooltip ไม่จับคำที่ตามด้วยตัวเลข เช่น PC0 จะไม่ถูกแยกเป็น PC
