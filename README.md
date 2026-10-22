# การจัดการระบบเครือข่าย — เว็บประกอบการสอน

เว็บหลักใช้ Next.js โดยนำบทเรียนสัปดาห์ที่ 1 จาก network-week1 มาใช้: เนื้อหา OSI 8 หัวข้อ (บทเดิม 03–10), แผนผัง OSI และเส้นทางข้อมูล

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
