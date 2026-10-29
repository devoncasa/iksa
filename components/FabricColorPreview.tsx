import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { COLOR_PALETTE } from '../constants';
export const FabricColorPreview: React.FC<{ color: string; name: string; women?: boolean }> = ({ color, name, women = false }) => {
 const { translate, language } = useLanguage();
 const [model, setModel] = useState(women ? 'female' : 'male');
 const ar = language === 'ar';
 const shade = COLOR_PALETTE[color] ? color : 'white';
 const label = translate(COLOR_PALETTE[shade].nameKey);
 return <figure className="relative w-full h-full flex flex-col bg-stone-100 rounded-md overflow-hidden">
  <div className="absolute top-2 start-2 z-10 flex gap-1 bg-white/90 rounded-full p-1 shadow-sm" role="group" aria-label={ar ? 'اختر العارض' : 'Choose model'}>
   {['male','female'].map(gender => <button type="button" key={gender} aria-pressed={model === gender} onClick={() => setModel(gender)} className={`px-3 py-1 rounded-full text-xs ${model === gender ? 'bg-stone-800 text-white' : 'text-stone-700'}`}>{gender === 'male' ? (ar ? 'رجال' : 'Men') : (ar ? 'نساء' : 'Women')}</button>)}
  </div>
  <img src={`/images/hithobe/models/${model}-${shade}.webp`} width="800" height="1000" loading="lazy" decoding="async" alt={`${name} — ${model === 'male' ? 'kandura' : 'abaya'} — ${label}`} className="w-full min-h-0 object-contain flex-1" />
  <figcaption className="text-xs text-stone-600 text-center py-2 bg-white/80" aria-live="polite">{label} · {ar ? 'تصوّر للون؛ اطلب عينة فعلية' : 'Colour illustration · request a physical swatch'}</figcaption>
 </figure>;
};
