import {SEOMetadata} from '../components/SEOMetadata';
import {useCopy} from '../lib/copy';
import {LANGUAGES} from '../constants';
import {localePrefix} from '../lib/language';
import React from 'react';
import { Link } from 'react-router-dom';
import { ContentBlock } from '../components/ContentBlock';
import { useLanguage } from '../hooks/useLanguage';

const content = {
 privacy: {
  th: ['ความเป็นส่วนตัว', 'ตะกร้าและภาษาที่เลือกเก็บในเบราว์เซอร์และลบได้ด้วยการล้างข้อมูลเว็บไซต์ เว็บไซต์ใช้ Google Analytics และทรัพยากรภาพ แบบอักษร และแผนที่จากภายนอก เมื่อส่งคำสอบถาม ชื่อ อีเมลสำหรับตอบกลับ และข้อความจะจัดเก็บผ่าน Netlify Forms เพื่อให้ hithobe ตอบกลับ ข้อมูลแบบฟอร์มจะไม่ส่งเข้า Analytics สอบถามเรื่องข้อมูลส่วนบุคคลได้ที่ +66 81 851 9922'],
  en: ['Privacy', 'Your cart and language preference are stored in your browser. You can remove them by clearing site data. The website uses Google Analytics and loads resources from external image, font and map providers. When you submit an enquiry, your name, reply address and message are processed and stored by Netlify Forms for hithobe to respond. Form details are not sent to analytics. For privacy questions, contact +66 81 851 9922.'],
  ar: ['الخصوصية', 'تُحفظ سلة التسوق واللغة في متصفحك ويمكن حذفهما بمسح بيانات الموقع. يستخدم الموقع Google Analytics وموارد خارجية للصور والخطوط والخرائط. عند إرسال استفسار، يُحفظ اسمك وعنوان الرد ورسالتك عبر Netlify Forms ليرد عليك hithobe. لا تُرسل بيانات النموذج إلى التحليلات. للاستفسارات: +66 81 851 9922.']
 },
 terms: {
  th: ['การสอบถามและสั่งซื้อ', 'ใช้แคตตาล็อกและเครื่องคำนวณเพื่อเตรียมคำขอ ผลคำนวณเป็นค่าประมาณซึ่งขึ้นอยู่กับการวางแพตเทิร์น การหดตัว และขนาดชุด การส่งคำสอบถามยังไม่ยืนยันคำสั่งซื้อหรือชำระเงิน กรุณาขอยืนยันสเปก สี สินค้าที่มี ราคาสุทธิ และการจัดส่งเป็นลายลักษณ์อักษรก่อนชำระเงิน ภาพแฟชั่นเป็นแรงบันดาลใจ ควรขอตัวอย่างจริงเพื่อตรวจเนื้อผ้าและสี'],
  en: ['Enquiries and ordering', 'Use the catalogue and calculators to prepare an enquiry. Calculator results are estimates; cutting layout, shrinkage and garment measurements affect actual yield. Submitting an enquiry does not place a confirmed order or process payment. Request written confirmation of fabric specification, colour, availability, final price and delivery before making payment. Editorial garment images show styling inspiration; request a physical swatch to assess the actual fabric and colour.'],
  ar: ['الاستفسارات والطلبات', 'استخدم الكتالوج والحاسبات لإعداد استفسار. نتائج الحاسبات تقديرية؛ يتأثر الإنتاج بالتخطيط والانكماش والمقاسات. إرسال استفسار لا يؤكد طلباً ولا ينفذ دفعاً. اطلب تأكيد المواصفات واللون والتوفر والسعر النهائي والتوصيل كتابةً قبل الدفع. صور الأزياء للإلهام؛ اطلب عينة لتقييم القماش واللون الفعليين.']
 },
 shipping: {
  th: ['การสอบถามการจัดส่ง', 'ค่าขนส่งและกำหนดส่งต้องยืนยันตามปลายทาง จำนวน และผ้าที่มี เครื่องคำนวณราคาเป็นค่าประมาณ ไม่ใช่การจองขนส่งหรือการประเมินศุลกากร กรุณาขอใบเสนอราคาที่ระบุค่าขนส่ง กำหนดส่ง การติดตาม และผู้รับผิดชอบอากรกับภาษีนำเข้า พร้อมยืนยันเงื่อนไขคืนสินค้าและยกเลิกก่อนชำระเงิน'],
  en: ['Shipping enquiries', 'Delivery cost and dispatch timing require confirmation for your destination, quantity and available fabric. The pricing calculator provides an estimate, not a carrier booking or a customs assessment. Ask for a written quotation showing delivery charges, the dispatch estimate, tracking arrangements and responsibility for import duties and taxes. Returns and cancellation terms must be confirmed with your quotation before payment.'],
  ar: ['استفسارات الشحن', 'تتطلب تكلفة التوصيل وموعد الإرسال تأكيد الوجهة والكمية وتوفر القماش. حاسبة الأسعار تقديرية وليست حجز شحن أو تقديراً جمركياً معتمداً. اطلب عرضاً مكتوباً يوضح التكاليف وموعد الإرسال والتتبع والمسؤولية عن الرسوم والضرائب. يجب تأكيد شروط الإرجاع والإلغاء مع العرض قبل الدفع.']
 }
};
export const PolicyPage: React.FC<{ kind: keyof typeof content }> = ({ kind }) => {
 const { language } = useLanguage();const c=useCopy();
 const base=content[kind][language] || content[kind].en;
 const [title,text]=base.map(value=>c(value));
 return <><SEOMetadata titleKey="" descriptionKey="" titleText={`${title} | hithobe`} descriptionText={text} pagePath={`/${kind}`}/>
 <ContentBlock isHero><h1 className="font-serif-display text-4xl mb-8">{title}</h1><p className="text-start leading-relaxed whitespace-pre-line">{text}</p><Link to="/contact" className="inline-block mt-8 underline">{language === 'th' ? 'ติดต่อเรา' : language === 'ar' ? 'تواصل معنا' : c('Contact us')}</Link></ContentBlock></>;
};
export const NotFoundPage = () => { const {translate}=useLanguage();return <><title>{`${translate('notFoundTitle')} | hithobe`}</title><meta name="robots" content="noindex" /><ContentBlock isHero><h1 className="text-3xl mb-6">404</h1><Link to="/collections">{translate('browseCollections')}</Link></ContentBlock></>;};
