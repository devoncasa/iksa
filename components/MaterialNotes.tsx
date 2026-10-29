import React from 'react';
import {useLanguage} from '../hooks/useLanguage';
const terms=[
 ['Fibre ≠ trade name','เส้นใยไม่เท่ากับชื่อการค้า','الألياف ليست الاسم التجاري',
 'Ask for the exact fibre percentages. A trade name, place name or silk-like touch alone does not establish cotton, silk or any particular blend.',
 'ขอสัดส่วนเส้นใยที่แน่นอน ชื่อการค้า ชื่อประเทศ หรือสัมผัสคล้ายไหม ไม่ได้ยืนยันว่าเป็นฝ้าย ไหม หรือส่วนผสมใด',
 'اطلب نسب الألياف الدقيقة. الاسم التجاري أو اسم البلد أو الملمس الشبيه بالحرير لا يثبت تركيب الألياف.'],
 ['Spun / filament / blend','สปัน / ฟิลาเมนต์ / ผ้าผสม','مغزول / خيوط مستمرة / مزيج',
 'Record yarn construction separately from fibre composition. Ask whether the warp and weft use different yarns, and confirm the specification on the technical sheet.',
 'บันทึกโครงสร้างเส้นด้ายแยกจากชนิดเส้นใย สอบถามว่าเส้นยืนและเส้นพุ่งใช้ด้ายต่างกันหรือไม่ และยืนยันจากเอกสารเทคนิค',
 'سجّل تركيب الخيوط منفصلاً عن تركيب الألياف. اسأل عن اختلاف السدى واللحمة وأكّد المواصفات بورقة البيانات.'],
 ['Waqif → Tah-yeh','อยู่ทรง → ทิ้งตัวพลิ้ว','واقف ← طايح',
 'The supplied reference uses Waqif, Nisf Waqif, Rub’ Waqif and Tah-yeh/Munsadil as a drape vocabulary. Treat these as descriptions to discuss, not universal laboratory grades; agree a physical reference sample.',
 'ข้อมูลต้นฉบับใช้ Waqif, Nisf Waqif, Rub’ Waqif และ Tah-yeh/Munsadil เพื่ออธิบายระดับการอยู่ทรง คำเหล่านี้ใช้สื่อสารความต้องการ ไม่ใช่เกรดแล็บสากล ควรตกลงโดยเทียบตัวอย่างจริง',
 'يستخدم المرجع واقف ونصف واقف وربع واقف وطايح/منسدل لوصف الانسدال. ليست درجات مختبرية موحدة؛ اتفق على عينة فعلية.'],
 ['GSM / usable width / opacity','GSM / หน้ากว้างใช้ได้ / ความทึบ','الوزن / العرض الفعلي / العتامة',
 'Compare GSM and usable width together. Do not infer opacity, cooling or UV protection from weight alone. Request tests or assess the physical sample under the intended lighting and underlayer.',
 'พิจารณา GSM ร่วมกับหน้ากว้างที่ใช้ได้ อย่าสรุปความทึบ ความเย็น หรือการป้องกัน UV จากน้ำหนักเพียงอย่างเดียว ขอผลทดสอบหรือดูตัวอย่างจริงกับแสงและชั้นในที่จะใช้',
 'قارن الوزن والعرض الفعلي معاً. لا تستنتج العتامة أو التبريد أو الحماية من الأشعة من الوزن وحده؛ اطلب الاختبارات وافحص العينة.'],
 ['Finish / care / repeat performance','การตกแต่งสำเร็จ / การดูแล / ความคงทน','التشطيب / العناية / ثبات الأداء',
 'For anti-static, crease-resistant or repellent claims, ask which test was used, the result, and whether performance was measured after repeated washing. Follow the supplier’s care instructions.',
 'สำหรับคุณสมบัติลดไฟฟ้าสถิต ต้านรอยยับ หรือสะท้อนน้ำ ควรถามวิธีทดสอบ ผล และการทดสอบหลังซักซ้ำ พร้อมปฏิบัติตามวิธีดูแลของผู้ผลิต',
 'لخصائص مقاومة الكهرباء الساكنة أو التجعد أو السوائل، اطلب طريقة الاختبار والنتيجة وثبات الأداء بعد الغسيل المتكرر وتعليمات العناية.'],
 ['Article / lot / traceability','รุ่นผ้า / ล็อต / การตรวจสอบย้อนกลับ','الصنف / الدفعة / التتبع',
 'Match the supplier’s article number, dye lot, invoice and test report. Neither a printed selvedge nor a fabric sound or photograph is proof of origin or certification.',
 'เทียบรหัสรุ่น ล็อตย้อม ใบแจ้งหนี้ และผลทดสอบให้ตรงกัน ตัวอักษรบนริมผ้า เสียงสัมผัส หรือภาพถ่ายเพียงอย่างเดียวไม่ใช่หลักฐานแหล่งผลิตหรือใบรับรอง',
 'طابق رقم الصنف ودفعة الصباغة والفاتورة وتقرير الاختبار. الكتابة على الحاشية أو صوت القماش أو الصورة وحدها لا تثبت المنشأ أو الاعتماد.']
];
export function MaterialNotes(){const {language}=useLanguage();const i=language==='th'?1:language==='ar'?2:0;return <section className="material-notes"><span className="eyebrow">hithobe / MATERIAL NOTES</span><h2>{['Read beyond the fabric name.','อ่านผ้าให้ลึกกว่าชื่อรุ่น','اقرأ ما وراء اسم القماش.'][i]}</h2><p>{['Questions adapted from the supplied raw research to help you verify a supplier’s specification.','ประเด็นจากข้อมูลดิบที่ได้รับ ปรับเป็นคำถามเพื่อช่วยตรวจสอบสเปกกับผู้ผลิต','أسئلة مستمدة من البحث المقدم لمساعدتك في التحقق من مواصفات المورد.'][i]}</p>{terms.map(row=><details key={row[0]} className="guide-detail"><summary>{row[i]}</summary><p>{row[3+i]}</p></details>)}</section>}
