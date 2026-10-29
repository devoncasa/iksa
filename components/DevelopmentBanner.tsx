
import React, { useState, useEffect } from 'react';

// Language translations for the banner
const bannerTranslations = {
  en: {
    heading: "Page Under Development",
    message: "We're enhancing graphics and updating pricing to reflect recent import duty and regulation changes in many countries. Some content is already available — feel free to explore.",
    button: "Continue on this page",
    dir: "ltr",
  },
  th: {
    heading: "หน้านี้อยู่ระหว่างการพัฒนา",
    message: "เรากำลังปรับปรุงกราฟิกและอัปเดตราคาเพื่อสะท้อนการเปลี่ยนแปลงภาษีนำเข้าและกฎระเบียบล่าสุดในหลายประเทศ เนื้อหาบางส่วนพร้อมให้เข้าชมแล้ว เชิญสำรวจได้เลย",
    button: "ดำเนินการต่อในหน้านี้",
    dir: "ltr",
  },
  ar: {
    heading: "الصفحة قيد التطوير",
    message: "نعمل حاليًا على تحسين الرسومات وتحديث الأسعار لتعكس التغييرات الأخيرة في رسوم الاستيراد واللوائح في العديد من البلدان. بعض المحتوى متاح بالفعل — لا تتردد في استكشافه.",
    button: "متابعة في هذه الصفحة",
    dir: "rtl",
  },
  hi: {
    heading: "यह पेज निर्माणाधीन है",
    message: "हम कई देशों में हाल के आयात शुल्क और विनियमन परिवर्तनों को दर्शाने के लिए ग्राफिक्स बढ़ा रहे हैं और मूल्य निर्धारण को अपडेट कर रहे हैं। कुछ सामग्री पहले से ही उपलब्ध है — बेझिझक अन्वेषण करें।",
    button: "इस पेज पर जारी रखें",
    dir: "ltr",
  },
  ur: {
    heading: "صفحہ زیر تعمیر ہے",
    message: "ہم بہت سے ممالک میں حالیہ درآمدی ڈیوٹی اور ضوابط کی تبدیلیوں کی عکاسی کے لیے گرافکس کو بڑھا رہے ہیں اور قیمتوں کو اپ ڈیٹ کر رہے ہیں۔ کچھ مواد پہلے سے ہی دستیاب ہے — بلا جھجھک دریافت کریں۔",
    button: "اس صفحے پر جاری رکھیں",
    dir: "rtl",
  },
};

type LangCode = keyof typeof bannerTranslations;

const languageOptions: { code: LangCode; flag: string; name: string }[] = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'th', flag: '🇹🇭', name: 'Thai' },
    { code: 'ar', flag: '🇸🇦', name: 'Arabic' },
    { code: 'hi', flag: '🇮🇳', name: 'Hindi' },
    { code: 'ur', flag: '🇵🇰', name: 'Urdu' },
];

export const DevelopmentBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedLang, setSelectedLang] = useState<LangCode>('en');
    
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible]);

    const handleDismiss = () => {
        setIsVisible(false);
    };
    
    const currentTranslation = bannerTranslations[selectedLang];

    if (!isVisible) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="banner-heading"
        >
            <div 
                className="relative bg-[#fff3cd] p-6 rounded-lg shadow-2xl max-w-lg w-full font-sans animate-fadeInUp"
                role="document"
                dir={currentTranslation.dir}
            >
                <div className="flex justify-end mb-2 -mt-2 -mr-2">
                     <div className="relative">
                        <select 
                            value={selectedLang}
                            onChange={(e) => setSelectedLang(e.target.value as LangCode)}
                            className="bg-transparent border border-[#856404]/50 text-[#856404] text-xs rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[#856404]"
                            aria-label="Select banner language"
                        >
                            {languageOptions.map(lang => (
                                <option key={lang.code} value={lang.code} className="bg-white text-black">
                                    {lang.flag} {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h2 id="banner-heading" className="text-xl font-bold text-[#856404] text-center">
                    ⚠️ {currentTranslation.heading}
                </h2>
                <p className="text-sm text-[#856404] my-4 text-center">
                    {currentTranslation.message}
                </p>
                <div className="text-center">
                    <button
                        onClick={handleDismiss}
                        className="mt-2 inline-block bg-[#856404] text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:bg-[#664d03] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#664d03] focus:ring-offset-[#fff3cd]"
                        aria-label="Close notification and continue to page"
                    >
                        {currentTranslation.button}
                    </button>
                </div>
            </div>
        </div>
    );
};
