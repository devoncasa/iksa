import React from 'react';
import { Link } from 'react-router-dom';
import { ContentBlock } from '../components/ContentBlock';
import { useLanguage } from '../hooks/useLanguage';

const content = {
 privacy: {
  en: ['Privacy', 'Your cart and language preference are stored in your browser. You can remove them by clearing site data. The website uses Google Analytics and loads resources from external image, font and map providers. When you choose to open an enquiry in email, the details you enter are passed to your email application; you control whether to send them. For privacy questions, contact sales@iksa-textiles.com.'],
  ar: ['الخصوصية', 'تُحفظ سلة التسوق واللغة في متصفحك ويمكن حذفهما بمسح بيانات الموقع. يستخدم الموقع Google Analytics وموارد خارجية للصور والخطوط والخرائط. عند فتح استفسار بالبريد، تُنقل البيانات إلى تطبيق بريدك وتختار أنت إرسالها. للاستفسارات: sales@iksa-textiles.com.']
 },
 terms: {
  en: ['Enquiries and ordering', 'Use the catalogue and calculators to prepare an enquiry. Calculator results are estimates; cutting layout, shrinkage and garment measurements affect actual yield. Opening an email draft does not place a confirmed order or process payment. Request written confirmation of fabric specification, colour, availability, final price and delivery before making payment. Editorial garment images show styling inspiration; request a physical swatch to assess the actual fabric and colour.'],
  ar: ['الاستفسارات والطلبات', 'استخدم الكتالوج والحاسبات لإعداد استفسار. نتائج الحاسبات تقديرية؛ يتأثر الإنتاج بالتخطيط والانكماش والمقاسات. فتح مسودة بريد لا يؤكد طلباً ولا ينفذ دفعاً. اطلب تأكيد المواصفات واللون والتوفر والسعر النهائي والتوصيل كتابةً قبل الدفع. صور الأزياء للإلهام؛ اطلب عينة لتقييم القماش واللون الفعليين.']
 },
 shipping: {
  en: ['Shipping enquiries', 'Delivery cost and dispatch timing require confirmation for your destination, quantity and available fabric. The pricing calculator provides an estimate, not a carrier booking or a customs assessment. Ask for a written quotation showing delivery charges, the dispatch estimate, tracking arrangements and responsibility for import duties and taxes. Returns and cancellation terms must be confirmed with your quotation before payment.'],
  ar: ['استفسارات الشحن', 'تتطلب تكلفة التوصيل وموعد الإرسال تأكيد الوجهة والكمية وتوفر القماش. حاسبة الأسعار تقديرية وليست حجز شحن أو تقديراً جمركياً معتمداً. اطلب عرضاً مكتوباً يوضح التكاليف وموعد الإرسال والتتبع والمسؤولية عن الرسوم والضرائب. يجب تأكيد شروط الإرجاع والإلغاء مع العرض قبل الدفع.']
 }
};
export const PolicyPage: React.FC<{ kind: keyof typeof content }> = ({ kind }) => {
 const { language } = useLanguage();
 const [title, text] = content[kind][language === 'ar' ? 'ar' : 'en'];
 return <><title>{`${title} | hithobe`}</title><meta name="description" content={text} /><link rel="canonical" href={`https://www.hithobe.com${language === 'ar' ? '/ar' : ''}/${kind === 'privacy' ? 'privacy' : kind === 'terms' ? 'terms' : 'shipping'}`} /><ContentBlock isHero><h1 className="font-serif-display text-4xl mb-8">{title}</h1><p className="text-start leading-relaxed whitespace-pre-line">{text}</p><Link to="/contact" className="inline-block mt-8 underline">{language === 'ar' ? 'تواصل معنا' : 'Contact us'}</Link></ContentBlock></>;
};
export const NotFoundPage = () => <><title>Page not found | hithobe</title><meta name="robots" content="noindex" /><ContentBlock isHero><h1 className="text-3xl mb-6">404</h1><Link to="/collections">Browse collections / تصفح المجموعة</Link></ContentBlock></>;
