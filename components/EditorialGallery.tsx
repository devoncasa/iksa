import React,{useState,useRef,useEffect} from 'react';
import {Link} from 'react-router-dom';
import shots from '../data/editorial-images.json';
import {useCopy} from '../lib/copy';
import {imageMetadata} from '../lib/imageMetadata';
import {useEditorialCaption} from '../lib/editorial';
import {track} from '../lib/analytics';
export const EditorialGallery=({compact=false}:{compact?:boolean})=>{
 const Heading=compact?'h2':'h1';const c=useCopy();const caption=useEditorialCaption();const [filter,setFilter]=useState('All');const [isOpen,setIsOpen]=useState(false);const [selected,setSelected]=useState(0);const dialog=useRef<HTMLDialogElement>(null);const start=useRef(0);const opener=useRef<HTMLButtonElement|null>(null);
 const categories=['All','Texture','Drape','Styling','Coordination','Care','Sourcing'];
 const category=(en:string)=>c(en,{'All':'الكل','Texture':'الملمس','Drape':'الانسدال','Styling':'التنسيق','Coordination':'الألوان','Care':'العناية','Sourcing':'اختيار العينات'}[en],{'All':'ทั้งหมด','Texture':'พื้นผิว','Drape':'การทิ้งตัว','Styling':'สไตล์','Coordination':'การจับคู่สี','Care':'การดูแล','Sourcing':'เลือกตัวอย่าง'}[en]);
 const visible=compact?['plain-weave-ivory','drape-taupe','thobe-saudi','palette-cool','care-storage','sample-inspection'].map(id=>shots.find(s=>s.id===id)!):(filter==='All'?shots:shots.filter(s=>s.category===filter));
 const shot=visible[selected];
 const rtl=()=>document.documentElement.dir==='rtl';
 const change=(offset:number)=>setSelected(i=>(i+offset+visible.length)%visible.length);
 useEffect(()=>{if(!dialog.current?.open)setSelected(0)},[filter]);
 const open=(i:number,target:HTMLButtonElement)=>{opener.current=target;setSelected(i);setIsOpen(true);dialog.current?.showModal();track('gallery_open',{image:visible[i].id});};
 const close=()=>{dialog.current?.close();setIsOpen(false);opener.current?.focus();};
 return <section className={`gallery-wrap ${compact ? 'gallery-compact' : 'gallery-page'}`}><div className="gallery-intro"><Heading>{c('A closer look at cloth','نظرة أقرب إلى القماش','มองผ้าให้ใกล้ขึ้น')}</Heading><div><p>{c('Explore texture, drape and styling before choosing a physical sample.','اكتشف الملمس والانسدال والتنسيق قبل اختيار عينة فعلية.','สำรวจเนื้อผ้า การทิ้งตัว และสไตล์ ก่อนเลือกตัวอย่างจริง')}</p><p className="mt-4 text-sm">{c('AI-created styling imagery. Garments are inspiration; hithobe sells fabric rolls. Colour and construction must be confirmed with a swatch and tailor.','صور إلهامية مولدة بالذكاء الاصطناعي. تبيع هيثوب لفات القماش؛ أكّد اللون والقصة بعينة ومع الخياط.')}</p></div></div>
 {!compact&&<div className="gallery-filters" aria-label={c('Editorial gallery','معرض الصور','แกลเลอรีภาพ')}>
 {categories.map(name=><button key={name} aria-pressed={filter===name} onClick={()=>{setFilter(name);track('gallery_filter',{category:name})}}>{category(name)}</button>)}</div>}
 <p aria-live="polite" className="mb-4">{visible.length} / {compact?6:30}</p><div className="gallery-grid">{visible.map((s,i)=><figure key={s.id} className={s.category==='Styling'?'gallery-styling':undefined}><button onClick={e=>open(i,e.currentTarget)} aria-label={caption(s)}><img src={`/images/hithobe/editorial/${s.id}-800.webp`} {...imageMetadata(`/images/hithobe/editorial/${s.id}-800.webp`)} sizes="(max-width:540px) 90vw, (max-width:900px) 45vw, 410px" loading={i===0?'eager':'lazy'} decoding="async" alt={caption(s)}/></button><figcaption>{caption(s)}</figcaption></figure>)}</div>
 <div className="mt-10 flex gap-6"><Link to={compact?'/gallery':'/collections'} className="underline">{compact?c('Editorial gallery','معرض الصور','แกลเลอรีภาพ'):c('Enquire about fabrics','استفسر عن الأقمشة','สอบถามข้อมูลผ้า')} ↗</Link></div>
 <dialog ref={dialog} className="gallery-lightbox" aria-label={c('Editorial gallery','معرض الصور','แกลเลอรีภาพ')} onClick={e=>{if(e.target===dialog.current)close()}} onCancel={e=>{e.preventDefault();close()}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();change(rtl()?-1:1)}if(e.key==='ArrowLeft'){e.preventDefault();change(rtl()?1:-1)}}}>
 <div className="gallery-controls"><span aria-live="polite">{selected+1} / {visible.length}</span><button onClick={close}>{c('Close','إغلاق','ปิด')} ×</button></div>{isOpen&&shot&&<img {...imageMetadata(`/images/hithobe/editorial/${shot.id}-1280.webp`)} src={`/images/hithobe/editorial/${shot.id}-1280.webp`} alt={caption(shot)} onTouchStart={e=>start.current=e.touches[0].clientX} onTouchEnd={e=>{const distance=e.changedTouches[0].clientX-start.current;if(Math.abs(distance)>40)change((distance<0?1:-1)*(rtl()?-1:1))}}/>}<div className="gallery-controls"><button onClick={()=>change(-1)} aria-label={c('Previous image','الصورة السابقة','ภาพก่อนหน้า')}><span aria-hidden="true" className="gallery-arrow">←</span></button><p>{shot&&caption(shot)}</p><button onClick={()=>change(1)} aria-label={c('Next image','الصورة التالية','ภาพถัดไป')}><span aria-hidden="true" className="gallery-arrow">→</span></button></div></dialog>
 </section>;
};
