// Animated topology walkthroughs for unit 3. Coordinates use the SVG viewBox of each spec.
export const vlanColor={0:'#3d5a80',10:'#2f7f73',20:'#c0672a',bad:'#b3261e',dhcp:'#3d5a80',console:'#6a4c93'};
const V10='VLAN 10 · บัญชี',V20='VLAN 20 · การตลาด';

export const animSpecs={
access:{title:'เข้าไปตั้งค่า Switch ได้อย่างไร',w:760,h:380,legend:[[vlanColor.console,'สาย Console (ต่อตรงที่ตัวเครื่อง)'],['#9aa89f','สาย LAN (ผ่านเครือข่าย)']],
nodes:[{id:'LT',x:110,y:90,label:'Laptop ช่าง',sub:'โปรแกรม PuTTY',w:72},{id:'SW',x:380,y:200,label:'SW1',sub:'ยังไม่มีชื่อและ IP',w:80},{id:'AD',x:650,y:90,label:'PC ผู้ดูแล',sub:'โต๊ะทำงาน',w:70},{id:'X',x:650,y:310,label:'เครื่องอื่น',sub:'ผู้ไม่ได้รับอนุญาต',w:76}],
links:[['LT','SW','สาย Console','console'],['SW','AD','สาย LAN'],['SW','X','สาย LAN']],
steps:[
{title:'Switch ใหม่แกะกล่อง',text:'Managed Switch ใหม่ส่งข้อมูลได้ทันที แต่ยังไม่มีชื่อ ไม่มีรหัสผ่าน และไม่มี IP สำหรับจัดการ ใครเสียบสายเข้ามาก็แก้ไขค่าได้'},
{moves:[{from:'LT',to:'SW',label:'enable'}],hl:['LT','SW'],title:'ครั้งแรก: ต่อสาย Console',text:'ช่างนำ Laptop ต่อสาย Console เข้ากับพอร์ต Console ของ Switch โดยตรง แล้วเปิดโปรแกรม Terminal เช่น PuTTY ใช้ได้แม้ Switch ยังไม่มี IP ใน Packet Tracer การคลิกแท็บ CLI ก็คือสิ่งนี้'},
{at:'SW',atLabel:'ชื่อ · รหัสผ่าน · IP',subs:{SW:'SW1 · 192.168.1.2'},hl:['SW'],title:'ตั้งค่าพื้นฐาน',text:'ตั้งชื่อ ตั้งรหัสผ่าน และกำหนด IP สำหรับจัดการ แล้วบันทึกค่า งานนี้ทำครั้งเดียวตอนติดตั้ง'},
{moves:[{from:'AD',to:'SW',label:'SSH 192.168.1.2'}],subs:{SW:'SW1 · 192.168.1.2'},hl:['AD'],title:'ครั้งต่อไป: จัดการผ่านเครือข่าย',text:'เมื่อ Switch มี IP แล้ว ผู้ดูแลเข้าจัดการจากโต๊ะทำงานได้ด้วย SSH ซึ่งเข้ารหัสข้อมูล ไม่ต้องเดินไปที่ตู้ Rack'},
{moves:[{from:'SW',to:'AD',label:'Password: · SW1#'}],subs:{SW:'SW1 · 192.168.1.2'},hl:['AD','SW'],title:'หน้าจอเหมือนต่อสาย Console',text:'ถามรหัสผ่านก่อน แล้วได้หน้าจอ CLI แบบเดียวกัน คำสั่งชุดเดียวกันทุกประการ'},
{moves:[{from:'X',to:'SW',label:'ขอเข้าจัดการ',bad:true}],drops:[{at:'SW',label:'ต้องมีรหัสผ่าน · จำกัดเครื่องที่เข้าได้',dx:-260,dy:85}],subs:{SW:'SW1 · 192.168.1.2'},hl:['X'],title:'กันคนที่ไม่ได้รับอนุญาต',text:'นี่คือเหตุผลที่ต้องตั้งรหัสผ่านทันทีตั้งแต่ครั้งแรก และจำกัดเครื่องที่เข้าจัดการได้ด้วย ACL ใน Lab 9'}
]},
gateway:{title:'PC ตัดสินใจอย่างไรว่าจะส่งตรงหรือส่งให้ Gateway',w:760,h:400,legend:[[vlanColor[10],'VLAN 10 · 192.168.10.0/24'],[vlanColor[20],'VLAN 20 · 192.168.20.0/24'],['#5b4636','Trunk']],
nodes:[{id:'R1',x:380,y:75,label:'R1 = Default Gateway',sub:'.10.1 (VLAN 10) · .20.1 (VLAN 20)',w:150},{id:'SW',x:380,y:235,label:'SW1',sub:'',w:58},{id:'A1',x:110,y:235,label:'PC-A1',sub:'192.168.10.11',v:10},{id:'A2',x:650,y:340,label:'PC-A2',sub:'192.168.10.12',v:10},{id:'M1',x:650,y:160,label:'PC-M1',sub:'192.168.20.11',v:20}],
links:[['SW','R1','Trunk','trunk'],['A1','SW','',10],['SW','A2','',10],['SW','M1','',20]],
tables:{
same:{title:'PC-A1 คิดก่อนส่ง: นำ IP มา AND กับ Subnet Mask 255.255.255.0',headers:['','IP','Network ที่ได้'],rows:[['ตัวเอง','192.168.10.11','192.168.10.0'],['ปลายทาง PC-A2','192.168.10.12','192.168.10.0 → วงเดียวกัน ส่งตรง']]},
diff:{title:'PC-A1 คิดก่อนส่ง: นำ IP มา AND กับ Subnet Mask 255.255.255.0',headers:['','IP','Network ที่ได้'],rows:[['ตัวเอง','192.168.10.11','192.168.10.0'],['ปลายทาง PC-M1','192.168.20.11','192.168.20.0 → คนละวง ส่งให้ Gateway']]}},
steps:[
{title:'Default Gateway คือประตูทางออกของวง',text:'ทุกเครื่องต้องรู้ IP ของ Default Gateway ใน VLAN ของตัวเอง ในบริษัทนี้ Gateway ของ VLAN 10 คือ 192.168.10.1 และของ VLAN 20 คือ 192.168.20.1 ซึ่งอยู่บน R1 ทั้งคู่'},
{at:'A1',atLabel:'คิดก่อนส่ง',atV:10,table:{name:'same',hl:1},hl:['A1'],title:'ส่งหาเครื่องในวงเดียวกัน',text:'ก่อนส่ง PC นำ IP ของตัวเองและของปลายทางมา AND กับ Subnet Mask ได้ Network เดียวกัน จึงส่งตรงผ่าน Switch'},
{moves:[{from:'A1',to:'SW',label:'ถึง .10.12',v:10}],table:{name:'same',hl:1},hl:['SW'],title:'ส่งตรงผ่าน Switch',text:'ใช้ ARP ถามหา MAC ของ PC-A2 แล้วส่งเฟรมตรงถึงเครื่อง'},
{moves:[{from:'SW',to:'A2',label:'ถึง .10.12',v:10}],table:{name:'same',hl:1},hl:['A2'],title:'ไม่ต้องผ่าน Router',text:'การคุยภายในวงเดียวกันไม่เกี่ยวกับ Router เลย'},
{at:'A1',atLabel:'คิดก่อนส่ง',atV:10,table:{name:'diff',hl:1},hl:['A1'],title:'ส่งหาเครื่องต่างวง',text:'Network ไม่ตรงกัน PC จึงไม่ส่งตรง แต่ส่งให้ Default Gateway 192.168.10.1 โดยใช้ MAC ของ Gateway เป็นปลายทาง ส่วน IP ปลายทางยังเป็น 192.168.20.11'},
{moves:[{from:'A1',to:'SW',label:'ถึง .20.11 ผ่าน GW',v:10}],table:{name:'diff',hl:1},hl:['SW'],title:'ส่งไปหา Gateway',text:'Switch ส่งเฟรมต่อไปทางสาย Trunk ที่ต่อกับ R1'},
{moves:[{from:'SW',to:'R1',label:'ถึง .20.11',tag:'10',v:10}],hl:['R1'],title:'R1 รับจาก VLAN 10',text:'R1 รู้ว่าข้อมูลมาจาก VLAN 10 เพราะแท็ก และดูตาราง Routing ว่าวง 192.168.20.0 อยู่ทางพอร์ตย่อยของ VLAN 20'},
{moves:[{from:'R1',to:'SW',label:'ถึง .20.11',tag:'20',v:20}],hl:['R1'],title:'R1 ส่งต่อไป VLAN 20',text:'นี่คือ Inter-VLAN Routing: Router รับจาก VLAN หนึ่งแล้วส่งออกไปอีก VLAN หนึ่ง'},
{moves:[{from:'SW',to:'M1',label:'ถึง .20.11',v:20}],hl:['A1','M1'],title:'ถึงปลายทาง',text:'สรุป: วงเดียวกันส่งตรง ต่างวงส่งให้ Gateway ถ้าไม่ได้ตั้ง Default Gateway ที่ PC เครื่องนั้นจะคุยได้เฉพาะในวงตัวเอง'}
]},
modes:{title:'เดินระหว่าง "ห้อง" ของ CLI',w:760,h:230,
nodes:[{id:'U',x:95,y:120,label:'Switch>',sub:'User EXEC',w:80},{id:'P',x:285,y:120,label:'Switch#',sub:'Privileged EXEC',w:80},{id:'G',x:475,y:120,label:'Switch(config)#',sub:'Global Config',w:86},{id:'I',x:665,y:120,label:'(config-if)#',sub:'Interface',w:80}],
links:[['U','P'],['P','G'],['G','I']],
steps:[
{at:'U',atLabel:'คุณอยู่ที่นี่',hl:['U'],title:'เริ่มที่ห้องหน้าเคาน์เตอร์',text:'เปิดแท็บ CLI แล้วกด Enter จะอยู่ที่ Switch> ดูข้อมูลได้เล็กน้อย ยังแก้ไขค่าไม่ได้'},
{moves:[{from:'U',to:'P',label:'enable'}],hl:['P'],title:'enable → ห้องผู้ดูแล',text:'Prompt เปลี่ยนจาก > เป็น # ตอนนี้ใช้คำสั่ง show ดูค่าทั้งหมด และบันทึกค่าได้'},
{moves:[{from:'P',to:'G',label:'configure terminal'}],hl:['G'],title:'configure terminal → ห้องเครื่อง',text:'มีคำว่า (config) เพิ่มขึ้น ตอนนี้แก้ไขค่าของทั้งเครื่องได้ เช่น hostname, enable secret, vlan'},
{moves:[{from:'G',to:'I',label:'interface fa0/1'}],hl:['I'],title:'interface → เข้าตู้ของพอร์ต',text:'Prompt เป็น (config-if)# คำสั่งที่พิมพ์ต่อจากนี้มีผลกับพอร์ต Fa0/1 เท่านั้น เช่น switchport access vlan 10'},
{moves:[{from:'I',to:'G',label:'exit'}],hl:['G'],title:'exit → ถอยกลับ 1 ห้อง',text:'exit ถอยออกมาทีละขั้น จากห้องพอร์ตกลับมาห้องเครื่อง'},
{moves:[{from:'G',to:'I',label:'interface fa0/2'}],hl:['I'],title:'เข้าพอร์ตอื่นต่อ',text:'ตั้งค่าพอร์ต Fa0/2 ต่อได้ทันที'},
{moves:[{from:'I',to:'P',label:'end'}],hl:['P'],title:'end → กลับห้องผู้ดูแลทันที',text:'ไม่ว่าอยู่ลึกแค่ไหน end พากลับมาที่ # ในครั้งเดียว ใช้เมื่อตั้งค่าเสร็จ แล้วต่อด้วย write memory เพื่อบันทึก'},
{moves:[{from:'P',to:'U',label:'disable'}],hl:['U'],title:'disable → กลับหน้าเคาน์เตอร์',text:'สรุป: ไปข้างหน้าด้วย enable → configure terminal → interface และถอยกลับด้วย exit, end, disable'}
]},

vlanConcept:{title:'ก่อนและหลังแบ่ง VLAN บน Switch ตัวเดียว',w:760,h:380,legend:[[vlanColor[0],'ยังไม่แบ่ง (VLAN 1 ทั้งหมด)'],[vlanColor[10],'VLAN 10 · บัญชี'],[vlanColor[20],'VLAN 20 · การตลาด']],
nodes:[{id:'SW',x:380,y:190,label:'SW1',sub:'Switch ตัวเดียว',w:70},{id:'A1',x:110,y:85,label:'บัญชี 1',sub:'Fa0/1'},{id:'A2',x:110,y:295,label:'บัญชี 2',sub:'Fa0/2'},{id:'M1',x:650,y:85,label:'การตลาด 1',sub:'Fa0/3'},{id:'M2',x:650,y:295,label:'การตลาด 2',sub:'Fa0/4'}],
links:[['A1','SW'],['A2','SW'],['M1','SW'],['M2','SW']],
steps:[
{title:'เครือข่ายแบน (Flat Network)',text:'บริษัทเสียบทั้งแผนกบัญชีและการตลาดไว้กับ Switch ตัวเดียว ทุกพอร์ตอยู่ VLAN 1 ซึ่งเป็นค่าเริ่มต้น ทุกเครื่องจึงอยู่ในเครือข่ายเดียวกันหมด'},
{moves:[{from:'A1',to:'SW',label:'Broadcast'}],hl:['A1'],title:'บัญชี 1 ส่ง Broadcast',text:'Broadcast คือข้อความที่ส่งถึงทุกเครื่อง เช่น ARP ที่ถามหา MAC หรือ DHCP ที่ถามหา Server เกิดขึ้นตลอดเวลา'},
{moves:[{from:'SW',to:'A2',label:'Broadcast'},{from:'SW',to:'M1',label:'Broadcast'},{from:'SW',to:'M2',label:'Broadcast'}],hl:['A2','M1','M2'],title:'ทุกเครื่องได้รับ',text:'Broadcast ไปถึงทุกเครื่อง รวมถึงแผนกการตลาดที่ไม่เกี่ยวข้อง ถ้าบริษัทมีหลายร้อยเครื่อง Broadcast จะท่วมจนเครือข่ายช้า และข้อมูลของแต่ละแผนกก็ไม่ได้แยกออกจากกัน'},
{nv:{A1:10,A2:10,M1:20,M2:20},lv:{0:10,1:10,2:20,3:20},title:'แบ่ง VLAN = กั้นห้องเสมือน',text:'ตั้งพอร์ตของบัญชีเป็น VLAN 10 และพอร์ตของการตลาดเป็น VLAN 20 ไม่ต้องซื้อ Switch เพิ่มหรือเดินสายใหม่ Switch ตัวเดียวทำงานเหมือนมี 2 ตัวที่ไม่ได้ต่อถึงกัน'},
{nv:{A1:10,A2:10,M1:20,M2:20},lv:{0:10,1:10,2:20,3:20},moves:[{from:'A1',to:'SW',label:'Broadcast',v:10}],hl:['A1'],title:'บัญชี 1 ส่ง Broadcast อีกครั้ง',text:'Switch ดูว่าข้อมูลเข้ามาทางพอร์ตที่อยู่ VLAN อะไร ในที่นี้คือ VLAN 10'},
{nv:{A1:10,A2:10,M1:20,M2:20},lv:{0:10,1:10,2:20,3:20},moves:[{from:'SW',to:'A2',label:'Broadcast',v:10}],drops:[{at:'M1',label:'คนละ VLAN',dx:-60,dy:52},{at:'M2',label:'คนละ VLAN',dx:-60,dy:52}],hl:['A2'],title:'ส่งเฉพาะใน VLAN เดียวกัน',text:'Switch ส่ง Broadcast ไปเฉพาะพอร์ตที่อยู่ VLAN 10 แผนกการตลาดไม่ได้รับเลย เครือข่ายเบาลงและข้อมูลแยกตามแผนก'},
{nv:{A1:10,A2:10,M1:20,M2:20},lv:{0:10,1:10,2:20,3:20},moves:[{from:'A1',to:'SW',label:'ping การตลาด',v:10}],drops:[{at:'SW',label:'ข้าม VLAN ไม่ได้',dy:52}],hl:['A1','M1'],title:'ต่าง VLAN คุยกันตรง ๆ ไม่ได้',text:'แม้อยู่ Switch ตัวเดียวกัน แต่ต่าง VLAN ก็เหมือนอยู่คนละเครือข่าย ถ้าต้องการให้คุยกันต้องส่งผ่าน Router ซึ่งตรวจและควบคุมได้ว่าใครคุยกับใครได้ (Lab 3 และ Lab 9)'}
]},
vlan:{title:'Broadcast ใน VLAN และการติดแท็กบน Trunk',w:760,h:360,legend:[[vlanColor[10],V10],[vlanColor[20],V20],['#5b4636','Trunk (ส่งได้ทุก VLAN)']],
nodes:[{id:'A1',x:90,y:90,label:'PC-A1',sub:'192.168.10.11',v:10},{id:'M1',x:90,y:280,label:'PC-M1',sub:'192.168.20.11',v:20},{id:'S1',x:290,y:185,label:'SW1',sub:'อาคาร 1',w:58},{id:'S2',x:470,y:185,label:'SW2',sub:'อาคาร 2',w:58},{id:'A2',x:670,y:90,label:'PC-A2',sub:'192.168.10.12',v:10},{id:'M2',x:670,y:280,label:'PC-M2',sub:'192.168.20.12',v:20}],
links:[['A1','S1','Fa0/1',10],['M1','S1','Fa0/2',20],['S1','S2','Gig0/1 Trunk','trunk'],['S2','A2','Fa0/1',10],['S2','M2','Fa0/2',20]],
steps:[
{title:'สองแผนก สองสี',text:'สีเขียวคือ VLAN 10 แผนกบัญชี สีส้มคือ VLAN 20 แผนกการตลาด เส้นหนาระหว่าง Switch คือ Trunk ที่ส่งได้ทุก VLAN ในสายเส้นเดียว'},
{moves:[{from:'A1',to:'S1',label:'ARP',v:10}],hl:['A1'],title:'PC-A1 ถามหา PC-A2',text:'PC-A1 ส่ง ARP แบบ Broadcast เข้าพอร์ต Fa0/1 ซึ่งอยู่ VLAN 10'},
{moves:[{from:'S1',to:'S2',label:'ARP',tag:'10',v:10}],drops:[{at:'M1',label:'คนละ VLAN ไม่ได้รับ',dx:-40,dy:56}],hl:['S1'],title:'SW1 ส่งเฉพาะ VLAN 10 และติดแท็ก',text:'SW1 ส่ง Broadcast เฉพาะพอร์ต VLAN 10 และพอร์ต Trunk ก่อนออก Trunk จะติดแท็ก 802.1Q หมายเลข 10 ส่วน PC-M1 ไม่ได้รับเลย'},
{moves:[{from:'S2',to:'A2',label:'ARP',v:10}],drops:[{at:'M2',label:'คนละ VLAN ไม่ได้รับ',dx:-120,dy:56}],hl:['S2'],title:'SW2 อ่านแท็ก แล้วถอดออก',text:'SW2 เห็นแท็ก 10 จึงส่งต่อเฉพาะพอร์ต VLAN 10 และถอดแท็กออกก่อนถึง PC-A2 เครื่องลูกข่ายจึงไม่ต้องรู้จักแท็กเลย'},
{moves:[{from:'A2',to:'S2',label:'ตอบกลับ',v:10}],hl:['A2'],title:'PC-A2 ตอบกลับ',text:'PC-A2 ตอบ MAC ของตัวเองกลับไปหา PC-A1'},
{moves:[{from:'S2',to:'S1',label:'ตอบกลับ',tag:'10',v:10}],hl:['S2'],title:'ข้าม Trunk พร้อมแท็ก 10',text:'ทุกครั้งที่ข้อมูลวิ่งบน Trunk จะมีแท็กบอก VLAN เสมอ'},
{moves:[{from:'S1',to:'A1',label:'ตอบกลับ',v:10}],hl:['A1','A2'],title:'สำเร็จ: VLAN เดียวกันข้าม Switch ได้',text:'PC-A1 และ PC-A2 อยู่คนละอาคาร แต่อยู่ VLAN เดียวกัน จึงคุยกันได้ผ่านสาย Trunk'},
{moves:[{from:'A1',to:'S1',label:'ping',v:10}],drops:[{at:'S1',label:'ไม่มี Router ไปต่อไม่ได้',dy:58}],hl:['A1','M1'],title:'ลอง ping ไป PC-M1',text:'PC-M1 อยู่ VLAN 20 และคนละวง IP ต้องส่งผ่าน Default Gateway แต่ยังไม่มี Router ข้อมูลจึงไปไม่ถึง Lab 3 จะแก้ปัญหานี้'}
]},

intervlan:{title:'Router-on-a-stick: ข้าม VLAN ด้วยสายเส้นเดียว',w:760,h:360,legend:[[vlanColor[10],V10],[vlanColor[20],V20],['#5b4636','Trunk']],
nodes:[{id:'R1',x:380,y:75,label:'R1',sub:'Gig0/0.10 = .10.1 · Gig0/0.20 = .20.1',w:170},{id:'S1',x:380,y:225,label:'SW1',sub:'',w:58},{id:'A1',x:100,y:300,label:'PC-A1',sub:'GW 192.168.10.1',v:10},{id:'M1',x:660,y:300,label:'PC-M1',sub:'GW 192.168.20.1',v:20}],
links:[['S1','R1','Trunk','trunk'],['A1','S1','Fa0/1',10],['S1','M1','Fa0/2',20]],
steps:[
{title:'Router หนึ่งตัว สายหนึ่งเส้น',text:'R1 ต่อกับ SW1 ด้วยสาย Trunk เส้นเดียว บน R1 มีพอร์ตย่อย .10 และ .20 ทำหน้าที่เป็น Default Gateway ของแต่ละ VLAN'},
{moves:[{from:'A1',to:'S1',label:'ping',v:10}],hl:['A1'],title:'PC-A1 ส่งให้ Gateway',text:'ปลายทาง 192.168.20.11 อยู่คนละวงกับตัวเอง PC-A1 จึงส่งให้ Default Gateway 192.168.10.1'},
{moves:[{from:'S1',to:'R1',label:'ping',tag:'10',v:10}],hl:['S1'],title:'ขึ้น Trunk พร้อมแท็ก 10',text:'SW1 ส่งข้อมูลขึ้นสาย Trunk พร้อมแท็ก 10 R1 รับที่พอร์ตย่อย Gig0/0.10 เพราะตั้ง encapsulation dot1Q 10 ไว้'},
{moves:[{from:'R1',to:'S1',label:'ping',tag:'20',v:20}],hl:['R1'],title:'R1 ส่งต่อไป VLAN 20',text:'R1 ดูตาราง Routing พบว่าวง 192.168.20.0 ต่อตรงอยู่ที่ Gig0/0.20 จึงส่งกลับลงสายเส้นเดิม แต่เปลี่ยนเป็นแท็ก 20'},
{moves:[{from:'S1',to:'M1',label:'ping',v:20}],hl:['M1'],title:'ถึง PC-M1',text:'SW1 อ่านแท็ก 20 ถอดแท็กออก แล้วส่งให้พอร์ต VLAN 20'},
{moves:[{from:'M1',to:'S1',label:'ตอบกลับ',v:20}],hl:['M1'],title:'PC-M1 ตอบกลับผ่าน Gateway ของตน',text:'ขากลับ PC-M1 ส่งให้ Gateway 192.168.20.1'},
{moves:[{from:'S1',to:'R1',label:'ตอบกลับ',tag:'20',v:20}],hl:['S1'],title:'ขึ้น Trunk ด้วยแท็ก 20',text:'R1 รับที่พอร์ตย่อย Gig0/0.20'},
{moves:[{from:'R1',to:'S1',label:'ตอบกลับ',tag:'10',v:10}],hl:['R1'],title:'R1 ส่งต่อไป VLAN 10',text:'R1 ส่งออก Gig0/0.10 ด้วยแท็ก 10'},
{moves:[{from:'S1',to:'A1',label:'ตอบกลับ',v:10}],hl:['A1','M1'],title:'สำเร็จ',text:'ข้อมูลวิ่งขึ้นและลงสายเส้นเดียวกันกับ Router จึงเรียกว่า Router-on-a-stick ถ้าลืม no shutdown หรือ Gateway ที่ PC ข้อมูลจะหยุดตั้งแต่ขั้นแรก'}
]},

routing:{title:'Router ค้นตาราง Routing ก่อนส่งทุกครั้ง',w:760,h:250,
nodes:[{id:'A1',x:85,y:130,label:'PC-A1',sub:'192.168.10.11',w:70},{id:'R1',x:290,y:130,label:'R1',sub:'สำนักงานใหญ่',w:62},{id:'R2',x:480,y:130,label:'R2',sub:'สาขา',w:62},{id:'B1',x:680,y:130,label:'PC-B1',sub:'192.168.30.11',w:70}],
links:[['A1','R1','ผ่าน SW1'],['R1','R2','192.168.100.0/24'],['R2','B1','ผ่าน SW3']],
tables:{
R1a:{title:'ตาราง Routing ของ R1 (ก่อนเพิ่มเส้นทาง)',headers:['รหัส','วงปลายทาง','ส่งออกทาง'],rows:[['C','192.168.10.0/24','Gig0/0.10'],['C','192.168.20.0/24','Gig0/0.20'],['C','192.168.100.0/24','Gig0/1'],['–','192.168.30.0/24 ?','ไม่มีในตาราง']]},
R1b:{title:'ตาราง Routing ของ R1 (หลังเพิ่ม Static Route)',headers:['รหัส','วงปลายทาง','ส่งออกทาง'],rows:[['C','192.168.10.0/24','Gig0/0.10'],['C','192.168.20.0/24','Gig0/0.20'],['C','192.168.100.0/24','Gig0/1'],['S','192.168.30.0/24','via 192.168.100.2 (R2)']]},
R2:{title:'ตาราง Routing ของ R2',headers:['รหัส','วงปลายทาง','ส่งออกทาง'],rows:[['C','192.168.30.0/24','Gig0/0'],['C','192.168.100.0/24','Gig0/1'],['S*','0.0.0.0/0 (ทุกวงที่ไม่รู้จัก)','via 192.168.100.1 (R1)']]}},
steps:[
{table:{name:'R1a'},title:'ส่งจากสำนักงานใหญ่ไปสาขา',text:'PC-A1 ต้องการ ping PC-B1 ที่สาขา วง 192.168.30.0/24'},
{moves:[{from:'A1',to:'R1',label:'ping'}],hl:['R1'],table:{name:'R1a',hl:3},title:'R1 ค้นตาราง',text:'R1 หาบรรทัดที่ตรงกับวง 192.168.30.0 ในตาราง Routing'},
{at:'R1',atLabel:'ping',drops:[{at:'R1',label:'ไม่รู้จักวงนี้ → ทิ้ง'}],hl:['R1'],table:{name:'R1a',hl:3},title:'ยังไม่มีเส้นทาง → ทิ้งข้อมูล',text:'R1 รู้จักเฉพาะวงที่ต่อตรง (รหัส C) จึงทิ้งข้อมูล PC-A1 เห็น Request timed out หรือ Destination host unreachable'},
{at:'R1',atLabel:'ip route ...',hl:['R1'],table:{name:'R1b',hl:3},title:'เพิ่ม Static Route บน R1',text:'ผู้ดูแลพิมพ์ ip route 192.168.30.0 255.255.255.0 192.168.100.2 ตารางมีบรรทัดรหัส S เพิ่มขึ้น'},
{moves:[{from:'R1',to:'R2',label:'ping'}],hl:['R1'],table:{name:'R1b',hl:3},title:'R1 ส่งต่อให้ R2',text:'ตอนนี้ R1 รู้แล้วว่าวง 192.168.30.0 ต้องส่งให้ 192.168.100.2'},
{moves:[{from:'R2',to:'B1',label:'ping'}],hl:['R2'],table:{name:'R2',hl:0},title:'R2 ส่งให้ PC-B1',text:'วง 192.168.30.0 ต่อตรงกับ R2 (รหัส C) จึงส่งถึงปลายทางได้'},
{moves:[{from:'B1',to:'R2',label:'ตอบกลับ'}],hl:['B1'],table:{name:'R2',hl:2},title:'ขากลับต้องมีเส้นทางด้วย',text:'คำตอบไปที่ 192.168.10.11 ซึ่ง R2 ไม่ได้ต่อตรง R2 จึงใช้ Default Route (S*)'},
{moves:[{from:'R2',to:'R1',label:'ตอบกลับ'}],hl:['R2'],table:{name:'R2',hl:2},title:'R2 ส่งตาม Default Route',text:'ทุกวงที่ R2 ไม่รู้จัก ส่งไปหา R1 ทั้งหมด'},
{moves:[{from:'R1',to:'A1',label:'ตอบกลับ'}],hl:['A1','B1'],table:{name:'R1b',hl:0},title:'สำเร็จทั้งขาไปและขากลับ',text:'ping ผ่านเมื่อมีเส้นทางครบทั้งสองทิศ ถ้าเพิ่มเส้นทางฝั่งเดียว ข้อมูลจะไปถึงแต่คำตอบกลับไม่ถึง'}
]},

dhcp:{title:'DORA และ DHCP Snooping กัน Server ปลอม',w:760,h:360,legend:[[vlanColor.dhcp,'ข้อความ DHCP'],[vlanColor.bad,'ข้อความจาก Server ปลอม']],
nodes:[{id:'PC',x:95,y:185,label:'PC-A1',sub:'ยังไม่มี IP',w:74},{id:'S1',x:340,y:185,label:'SW1',sub:'DHCP Snooping',w:72},{id:'R1',x:620,y:75,label:'R1',sub:'DHCP Server จริง',w:80},{id:'RG',x:620,y:300,label:'Server ปลอม',sub:'แจก Gateway ผิด',w:80,kind:'rogue'}],
links:[['PC','S1','Untrusted'],['S1','R1','Trusted','trunk'],['S1','RG','Untrusted','bad']],
steps:[
{title:'เครื่องใหม่ยังไม่มี IP',text:'PC-A1 ตั้งค่าเป็น DHCP มี Server จริงคือ R1 และมีคนนำ Server ปลอมมาเสียบที่ Fa0/3 พอร์ตทาง R1 ตั้งเป็น Trusted พอร์ตอื่นเป็น Untrusted'},
{moves:[{from:'PC',to:'S1',label:'D: Discover'}],hl:['PC'],title:'D – Discover',text:'PC-A1 ตะโกนถามทั้งวง (Broadcast) ว่ามี DHCP Server ไหม'},
{moves:[{from:'S1',to:'R1',label:'Discover'},{from:'S1',to:'RG',label:'Discover'}],hl:['S1'],title:'Switch กระจาย Broadcast',text:'Switch ส่ง Broadcast ไปทุกพอร์ตใน VLAN เดียวกัน ทั้ง R1 และ Server ปลอมได้ยินคำถาม'},
{moves:[{from:'R1',to:'S1',label:'O: Offer'},{from:'RG',to:'S1',label:'Offer ปลอม',bad:true}],drops:[{at:'S1',label:'ทิ้ง Offer จากพอร์ต Untrusted',dx:-210,dy:80}],hl:['S1'],title:'O – Offer และ Snooping ทำงาน',text:'ทั้งสองตอบ Offer แต่ Offer ที่มาจากพอร์ต Untrusted ถูก Switch ทิ้งทันที นี่คือหน้าที่ของ DHCP Snooping'},
{moves:[{from:'S1',to:'PC',label:'Offer .10.11'}],hl:['PC'],title:'PC ได้รับ Offer จาก R1 เท่านั้น',text:'R1 เสนอ IP 192.168.10.11 พร้อม Gateway 192.168.10.1 และ DNS'},
{moves:[{from:'PC',to:'S1',label:'R: Request'}],hl:['PC'],title:'R – Request',text:'PC-A1 ตอบว่าขอใช้ IP ที่ R1 เสนอ'},
{moves:[{from:'S1',to:'R1',label:'Request'}],hl:['S1'],title:'คำขอถึง R1',text:'R1 บันทึกว่า IP นี้ถูกใช้แล้ว ดูได้ด้วย show ip dhcp binding'},
{moves:[{from:'R1',to:'S1',label:'A: Ack'}],hl:['R1'],title:'A – Acknowledge',text:'R1 ยืนยันการใช้ IP'},
{moves:[{from:'S1',to:'PC',label:'Ack'}],hl:['PC'],subs:{PC:'192.168.10.11 · GW .1'},title:'ได้ IP ถูกต้อง',text:'PC-A1 ได้ IP, Gateway และ DNS ที่ถูกต้องจาก R1 ถ้าไม่เปิด DHCP Snooping อาจได้ค่าจาก Server ปลอมแทนและใช้งานไม่ได้'}
]},
stp:{title:'ทำไมต้องมี STP: Broadcast Storm และการปิดพอร์ตตัดวง',w:760,h:410,legend:[['#5b4636','Trunk ระหว่าง Switch'],['#e8a33d','พอร์ตที่ STP ปิด (BLK)']],
nodes:[{id:'S1',x:380,y:75,label:'SW1',sub:'Core',w:60},{id:'S2',x:170,y:235,label:'SW2',sub:'',w:60},{id:'S3',x:590,y:235,label:'SW3',sub:'',w:60},{id:'P1',x:170,y:360,label:'PC1',sub:'',w:54},{id:'P2',x:590,y:360,label:'PC2',sub:'',w:54}],
links:[['S1','S2','Gig0/1','trunk'],['S1','S3','Gig0/2','trunk'],['S2','S3','Gig0/2','trunk'],['P1','S2','Fa0/1'],['P2','S3','Fa0/1']],
steps:[
{title:'ต่อสายสำรองเป็นวงสามเหลี่ยม',text:'บริษัทต่อ Switch 3 ตัวเป็นวง เพื่อให้มีทางสำรองเมื่อสายเส้นใดเส้นหนึ่งขาด แต่ถ้าไม่มี STP การต่อเป็นวงจะทำให้เครือข่ายล่ม'},
{moves:[{from:'P1',to:'S2',label:'Broadcast',bad:true}],hl:['P1'],title:'สมมติว่าไม่มี STP',text:'PC1 ส่ง Broadcast หนึ่งครั้ง เช่น ARP'},
{moves:[{from:'S2',to:'S1',label:'Broadcast',bad:true},{from:'S2',to:'S3',label:'Broadcast',bad:true}],hl:['S2'],title:'Switch ส่ง Broadcast ออกทุกพอร์ต',text:'SW2 ส่งต่อไปทั้ง SW1 และ SW3'},
{moves:[{from:'S1',to:'S3',label:'Broadcast',bad:true},{from:'S3',to:'S1',label:'Broadcast',bad:true}],notes:[{x:380,y:205,text:'วนซ้ำไม่รู้จบ',bad:true}],hl:['S1','S3'],title:'เริ่มวน',text:'SW1 และ SW3 ต่างก็ส่งต่อให้กันอีก เฟรมเดิมวนกลับมาที่ SW2'},
{moves:[{from:'S1',to:'S2',label:'Broadcast',bad:true},{from:'S3',to:'S2',label:'Broadcast',bad:true}],notes:[{x:380,y:205,text:'Broadcast Storm',bad:true}],hl:['S1','S2','S3'],title:'Broadcast Storm',text:'Ethernet ไม่มีตัวนับอายุแบบ TTL เฟรมจึงวนและเพิ่มจำนวนเรื่อย ๆ จน Switch และทุกเครื่องทำงานไม่ไหว เครือข่ายล่มทั้งระบบภายในไม่กี่วินาที'},
{moves:[{from:'S1',to:'S2',label:'BPDU'},{from:'S1',to:'S3',label:'BPDU'}],subs:{S1:'Root Bridge'},hl:['S1'],title:'เปิด STP: เลือก Root Bridge',text:'Switch แลกข้อความ BPDU กัน ตัวที่มี Bridge ID ต่ำสุดเป็น Root Bridge (Bridge ID = Priority + MAC) เราบังคับให้ SW1 เป็น Root ด้วยคำสั่ง spanning-tree vlan 1,10,20 root primary'},
{block:[{link:2,at:'S3'}],subs:{S1:'Root Bridge'},hl:['S3'],title:'ปิดหนึ่งพอร์ตเพื่อตัดวง',text:'พอร์ตที่ไปหา Root ได้ใกล้ที่สุดเป็น Root Port พอร์ตที่ส่งออกในแต่ละสายเป็น Designated Port และมีหนึ่งพอร์ตถูกปิดเป็น Alternate (BLK) วงจึงขาด ในภาพสมมติว่า SW3 เป็นฝั่งที่ถูกปิด เครื่องจริงดูได้ด้วย show spanning-tree'},
{moves:[{from:'P1',to:'S2',label:'Broadcast'}],block:[{link:2,at:'S3'}],subs:{S1:'Root Bridge'},hl:['P1'],title:'ส่ง Broadcast อีกครั้ง',text:'PC1 ส่ง Broadcast แบบเดิม'},
{moves:[{from:'S2',to:'S1',label:'Broadcast'},{from:'S2',to:'S3',label:'Broadcast'}],drops:[{at:'S3',label:'พอร์ต BLK ไม่รับ',dx:-150,dy:-62}],block:[{link:2,at:'S3'}],subs:{S1:'Root Bridge'},hl:['S2'],title:'พอร์ต BLK ไม่รับและไม่ส่ง',text:'เฟรมที่เข้าทางพอร์ต BLK ถูกทิ้ง วงจึงไม่เกิด'},
{moves:[{from:'S1',to:'S3',label:'Broadcast'}],block:[{link:2,at:'S3'}],subs:{S1:'Root Bridge'},hl:['S1'],title:'ไปถึง SW3 ทางเดียว',text:'SW3 ได้รับผ่าน SW1 เพียงทางเดียว'},
{moves:[{from:'S3',to:'P2',label:'Broadcast'}],block:[{link:2,at:'S3'}],subs:{S1:'Root Bridge'},hl:['P2'],title:'ทุกเครื่องได้รับครั้งเดียว',text:'Broadcast ถึงทุกเครื่องเพียงครั้งเดียว ไม่วน'},
{down:[0],subs:{S1:'Root Bridge'},hl:['S2','S3'],title:'สาย SW1–SW2 ขาด',text:'STP ตรวจพบว่าโครงสร้างเปลี่ยน พอร์ตที่เคย BLK บน SW3 เปลี่ยนเป็น Forwarding อัตโนมัติ เมื่อใช้ Rapid PVST+ ใช้เวลาเพียงไม่กี่วินาที'},
{moves:[{from:'S2',to:'S3',label:'ping'}],down:[0],subs:{S1:'Root Bridge'},hl:['S2'],title:'ใช้เส้นทางสำรอง',text:'ข้อมูลจาก PC1 วิ่งผ่านสาย SW2–SW3 ที่เคยถูกปิด'},
{moves:[{from:'S3',to:'P2',label:'ping'}],down:[0],subs:{S1:'Root Bridge'},hl:['P1','P2'],title:'เครือข่ายยังใช้งานได้',text:'นี่คือประโยชน์ของ STP: มีสายสำรองได้โดยไม่เกิดวง และสลับไปใช้สายสำรองเองเมื่อสายหลักขาด'}
]},

lacp:{title:'EtherChannel: รวมสายหลายเส้นเป็นลิงก์เดียว',w:760,h:260,legend:[['#5b4636','สาย Trunk'],['#e8a33d','พอร์ตที่ STP ปิด']],
nodes:[{id:'S1',x:150,y:130,label:'SW1',sub:'',w:62},{id:'S2',x:610,y:130,label:'SW2',sub:'',w:62}],
links:[['S1','S2','Fa0/23','trunk',-22],['S1','S2','Fa0/24','trunk',22]],
steps:[
{title:'ต่อสาย 2 เส้นระหว่าง Switch',text:'บริษัทต้องการแบนด์วิดท์เพิ่มและมีสายสำรอง จึงต่อสาย 2 เส้น พอร์ต Fa0/23 และ Fa0/24'},
{block:[{link:1,at:'S2'}],hl:['S2'],title:'STP ปิดสายเส้นหนึ่ง',text:'สาย 2 เส้นระหว่าง Switch คู่เดียวกันคือวงในมุมมองของ STP จึงถูกปิด 1 เส้น ใช้งานได้จริงเพียง 100 Mbps'},
{moves:[{from:'S1',to:'S2',label:'ข้อมูล',link:0}],block:[{link:1,at:'S2'}],title:'ข้อมูลวิ่งได้เส้นเดียว',text:'สายอีกเส้นว่างอยู่เฉย ๆ เสียประโยชน์'},
{notes:[{x:380,y:70,text:'Port-channel 1 (Po1) · 2 × 100 Mbps'}],hl:['S1','S2'],title:'รวมสายด้วย LACP',text:'ตั้ง channel-group 1 mode active ที่ Fa0/23–24 ทั้งสองฝั่ง LACP ตกลงกันรวม 2 สายเป็นลิงก์เดียวชื่อ Po1 STP มองเป็นสายเดียวจึงไม่ปิดพอร์ตใดเลย'},
{moves:[{from:'S1',to:'S2',label:'ข้อมูล A',link:0},{from:'S2',to:'S1',label:'ข้อมูล B',link:1}],notes:[{x:380,y:70,text:'Port-channel 1 (Po1) · 2 × 100 Mbps'}],title:'ใช้ได้ทั้งสองเส้นพร้อมกัน',text:'ทราฟฟิกถูกกระจายไปทั้งสองสาย ได้แบนด์วิดท์รวมมากขึ้น'},
{moves:[{from:'S1',to:'S2',label:'ข้อมูล',link:0}],down:[1],notes:[{x:380,y:70,text:'Po1 เหลือ 1 สาย ยังทำงานอยู่'}],title:'สายขาดหนึ่งเส้น',text:'Po1 ยังทำงานต่อด้วยสายที่เหลือทันที ไม่ต้องรอ STP คำนวณใหม่ ผู้ใช้แทบไม่รู้สึกว่าสายขาด'}
]},

nat:{title:'NAT Overload (PAT): หลายเครื่องใช้ Public IP เดียว',w:760,h:250,
nodes:[{id:'PC',x:80,y:150,label:'PC-A1',sub:'192.168.10.11',w:70},{id:'R1',x:300,y:150,label:'R1 (NAT)',sub:'inside | outside',w:70},{id:'ISP',x:510,y:150,label:'ISP',sub:'อินเทอร์เน็ต',w:60},{id:'SV',x:690,y:150,label:'Server',sub:'8.8.8.8',w:62}],
links:[['PC','R1','inside'],['R1','ISP','outside · 203.0.113.2'],['ISP','SV','']],
tables:{
none:{title:'ตาราง NAT บน R1 (show ip nat translations)',headers:['Inside local (ภายใน)','Inside global (ที่ภายนอกเห็น)','ปลายทาง'],rows:[['–','–','–']]},
one:{title:'ตาราง NAT บน R1 (show ip nat translations)',headers:['Inside local (ภายใน)','Inside global (ที่ภายนอกเห็น)','ปลายทาง'],rows:[['192.168.10.11:1025','203.0.113.2:1025','8.8.8.8:80']]}},
steps:[
{title:'Private IP ใช้บนอินเทอร์เน็ตไม่ได้',text:'192.168.x.x เป็น Private IP ทุกบริษัทใช้ซ้ำกันได้ อินเทอร์เน็ตจึงไม่มีเส้นทางกลับมาหา IP กลุ่มนี้ ดูก่อนว่าถ้าไม่มี NAT จะเกิดอะไรขึ้น'},
{moves:[{from:'PC',to:'R1',label:'จาก 192.168.10.11'}],hl:['PC'],title:'ยังไม่เปิด NAT',text:'PC-A1 เปิดเว็บ 8.8.8.8 ส่งออกไปที่ Gateway'},
{moves:[{from:'R1',to:'ISP',label:'จาก 192.168.10.11'}],hl:['R1'],title:'R1 ส่งออกตาม Default Route',text:'ข้อมูลยังมี IP ต้นทางเป็น Private IP'},
{moves:[{from:'ISP',to:'SV',label:'จาก 192.168.10.11'}],hl:['SV'],title:'ขาไปถึง Server',text:'Server ได้รับ และต้องตอบกลับไปที่ 192.168.10.11'},
{moves:[{from:'SV',to:'ISP',label:'ถึง 192.168.10.11'}],drops:[{at:'ISP',label:'ไม่มีเส้นทางไป Private IP'}],hl:['ISP'],title:'ขากลับไปไม่ถึง',text:'ISP ไม่รู้ว่า 192.168.10.11 อยู่ที่ไหน จึงทิ้งข้อมูล ผู้ใช้เปิดเว็บไม่ได้'},
{at:'R1',atLabel:'NAT',table:{name:'none'},hl:['R1'],title:'เปิด NAT Overload บน R1',text:'กำหนดพอร์ตฝั่งใน (ip nat inside) ฝั่งนอก (ip nat outside) และสั่ง ip nat inside source list 1 interface gigabitEthernet0/2 overload'},
{moves:[{from:'PC',to:'R1',label:'จาก 192.168.10.11:1025'}],table:{name:'none'},hl:['PC'],title:'ส่งใหม่อีกครั้ง',text:'เครื่องต้นทางใช้พอร์ตต้นทางชั่วคราว เช่น 1025'},
{moves:[{from:'R1',to:'ISP',label:'จาก 203.0.113.2:1025'}],table:{name:'one',hl:0},hl:['R1'],title:'R1 เปลี่ยน IP ต้นทาง',text:'R1 เปลี่ยน IP ต้นทางเป็น IP ของพอร์ต outside และจดลงตาราง NAT หมายเลขพอร์ตใช้แยกว่าเป็นของเครื่องใด เครื่องในหลายร้อยเครื่องจึงใช้ Public IP เดียวร่วมกันได้'},
{moves:[{from:'ISP',to:'SV',label:'จาก 203.0.113.2:1025'}],table:{name:'one',hl:0},hl:['SV'],title:'Server เห็นแต่ Public IP',text:'Server ไม่รู้เลยว่าเครื่องจริงคือ 192.168.10.11'},
{moves:[{from:'SV',to:'ISP',label:'ถึง 203.0.113.2:1025'}],table:{name:'one',hl:0},hl:['ISP'],title:'ตอบกลับไปที่ Public IP',text:'ISP รู้จัก 203.0.113.2 จึงส่งกลับมาที่ R1 ได้'},
{moves:[{from:'ISP',to:'R1',label:'ถึง 203.0.113.2:1025'}],table:{name:'one',hl:0},hl:['R1'],title:'ถึง R1',text:'R1 ค้นตาราง NAT จากพอร์ต 1025'},
{moves:[{from:'R1',to:'PC',label:'ถึง 192.168.10.11:1025'}],table:{name:'one',hl:0},hl:['PC','SV'],title:'แปลงกลับและส่งถึงเครื่องจริง',text:'R1 เปลี่ยนปลายทางกลับเป็น 192.168.10.11 ผู้ใช้เปิดเว็บได้ บน MikroTik งานเดียวกันนี้คือ srcnat action=masquerade'}
]},

acl:{title:'ACL: Router ตรวจกฎทีละบรรทัดจากบนลงล่าง',w:760,h:380,legend:[[vlanColor[10],'VLAN 10 · บัญชี'],[vlanColor[20],'VLAN 20 · การตลาด'],['#9aa89f','สาขา']],
nodes:[{id:'M1',x:95,y:95,label:'PC-M1',sub:'192.168.20.11',v:20},{id:'B1',x:95,y:285,label:'PC-B1',sub:'สาขา 192.168.30.11'},{id:'R1',x:370,y:190,label:'R1',sub:'ACL',w:56},{id:'A1',x:650,y:95,label:'PC-A1',sub:'192.168.10.11',v:10},{id:'WS',x:650,y:285,label:'Web Server',sub:'192.168.10.5',v:10}],
links:[['M1','R1','Gig0/0.20',20],['B1','R1','Gig0/1 · ขาเข้า'],['R1','A1','Gig0/0.10 · ขาออก',10],['R1','WS','',10]],
tables:{
acl5:{title:'access-list 5 (Standard) ติดที่ Gig0/0.10 ขาออก',headers:['ลำดับ','กฎ','ความหมาย'],rows:[['10','deny 192.168.20.0 0.0.0.255','ห้ามการตลาด'],['20','permit any','อนุญาตที่เหลือ'],['–','deny any (ซ่อนอยู่ท้ายสุด)','–']]},
br:{title:'ip access-list extended BRANCH-IN ติดที่ Gig0/1 ขาเข้า',headers:['ลำดับ','กฎ','ความหมาย'],rows:[['10','permit tcp 192.168.30.0 0.0.0.255 host 192.168.10.5 eq 80','สาขาเปิดเว็บภายในได้'],['20','deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255','ห้ามเข้าเครื่องอื่นในวงบัญชี'],['30','permit ip any any','อนุญาตที่เหลือ'],['–','deny any (ซ่อนอยู่ท้ายสุด)','–']]}},
steps:[
{title:'นโยบายของบริษัท',text:'ข้อ 1 แผนกการตลาดห้ามเข้าเครือข่ายบัญชี ข้อ 2 สาขาเปิดเว็บภายใน 192.168.10.5 ได้ แต่ห้ามเข้าเครื่องอื่นในวงบัญชี ACL คือรายการกฎที่ Router ตรวจจากบนลงล่าง เจอบรรทัดแรกที่ตรงก็ทำตามนั้นและหยุดตรวจ'},
{moves:[{from:'M1',to:'R1',label:'ping 10.11',v:20}],table:{name:'acl5'},hl:['M1'],title:'การตลาด ping เครื่องบัญชี',text:'ข้อมูลเข้าที่ Gig0/0.20 ซึ่งไม่มี ACL ขาเข้า R1 หาเส้นทางพบว่าต้องออก Gig0/0.10'},
{at:'R1',atLabel:'ping',atV:20,drops:[{at:'R1',label:'ตรงข้อ 10 deny → ทิ้ง'}],table:{name:'acl5',hl:0},hl:['R1'],title:'ตรวจ ACL 5 ก่อนส่งออก',text:'บรรทัดแรกตรงกับต้นทาง 192.168.20.0 จึงทิ้งทันที ไม่ตรวจบรรทัดที่เหลือ Standard ACL ดูได้แค่ IP ต้นทาง จึงต้องวางใกล้ปลายทางเพื่อไม่ให้กระทบการไปที่อื่น'},
{moves:[{from:'B1',to:'R1',label:'HTTP :80'}],table:{name:'br',hl:0},hl:['B1'],title:'สาขาเปิดเว็บภายใน',text:'ข้อมูลเข้า Gig0/1 ถูกตรวจด้วย BRANCH-IN ตั้งแต่ขาเข้า บรรทัด 10 ตรงทั้งโพรโทคอล TCP ต้นทาง ปลายทาง และพอร์ต 80'},
{moves:[{from:'R1',to:'WS',label:'HTTP :80'}],table:{name:'br',hl:0},hl:['WS'],title:'ผ่าน',text:'ตรงบรรทัด permit จึงผ่าน ขาออก Gig0/0.10 ผ่าน ACL 5 บรรทัด 20 permit any เพราะต้นทางไม่ใช่การตลาด'},
{moves:[{from:'B1',to:'R1',label:'ping 10.11'}],table:{name:'br',hl:1},hl:['B1'],title:'สาขา ping เครื่องบัญชี',text:'ping เป็น ICMP ไม่ใช่ TCP พอร์ต 80 จึงไม่ตรงบรรทัด 10 ตรวจต่อบรรทัด 20'},
{at:'R1',atLabel:'ping',drops:[{at:'R1',label:'ตรงข้อ 20 deny → ทิ้ง'}],table:{name:'br',hl:1},hl:['R1'],title:'ถูกทิ้งตั้งแต่ขาเข้า',text:'Extended ACL ระบุได้ละเอียดทั้งต้นทาง ปลายทาง โพรโทคอล และพอร์ต จึงวางใกล้ต้นทาง ข้อมูลที่ไม่อนุญาตถูกทิ้งก่อนเสียแบนด์วิดท์'},
{table:{name:'br',hl:3},hl:['R1'],title:'กฎที่มองไม่เห็นท้ายทุก ACL',text:'ทุก ACL มี deny any ซ่อนอยู่ท้ายสุด ถ้าลืม permit ip any any ทราฟฟิกอื่นทั้งหมดจากสาขาจะถูกทิ้ง รวมถึงการออกอินเทอร์เน็ต'}
]}
};
