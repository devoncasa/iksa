import React from 'react';
import { ContentBlock } from './ContentBlock';
import { ManagedImage } from './ManagedImage';
import { useLanguage } from '../hooks/useLanguage';
export const EditorialGallery = () => {
 const { language } = useLanguage(); const ar = language === 'ar';
 const shots = [
 ['kandura-courtyard', 'Full-length ivory kandura in a limestone courtyard', 'كندورة عاجية بطول كامل في فناء حجري'],
 ['kandura-window-portrait', 'Collarless neckline and soft fabric folds in window light', 'ياقة مستديرة وثنيات القماش بضوء النافذة'],
 ['abaya-courtyard', 'Black abaya and shayla in reflected daylight', 'عباءة وشيلة سوداء بضوء النهار المنعكس']
 ];
 return <ContentBlock><h2 className="font-serif-display text-3xl mb-6">{ar ? 'القصّة والضوء وحركة القماش' : 'Silhouette, light and drape'}</h2><p className="mb-8 text-stone-600">{ar ? 'إلهام لتنسيق الملابس. لا تمثل هذه الصور عينة قماش أو منتجاً محدداً.' : 'Garment styling inspiration. These editorial images do not represent a specific fabric sample or SKU.'}</p><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{shots.map(([name,en,arabic]) => <figure key={name}><div className="aspect-[4/5] rounded-lg overflow-hidden border border-muted-gold/50"><ManagedImage src={`/images/hithobe/${name}-1120.webp`} alt={ar ? arabic : en} pageName="Thobe Guide" sectionTitle="Editorial" className="w-full h-full object-cover" sizes="(max-width: 767px) 90vw, 30vw" /></div><figcaption className="mt-3 text-sm text-stone-600">{ar ? arabic : en}</figcaption></figure>)}</div></ContentBlock>;
};
