import React from 'react';

// Generic Icon Props
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

// Fabric Feature Icons
export const BreathableIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.091 1.209-.138 2.43-.138 3.662m14.964 0A48.672 48.672 0 0112 12.75c-2.705 0-5.31-.44-7.812-1.225M19.5 12v3.25A48.663 48.663 0 0112 18.75c-2.705 0-5.31-.44-7.812-1.225V12m15.624 0c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.091 1.209-.138 2.43-.138 3.662m0 0V12m14.964 0A48.672 48.672 0 0012 11.25c-2.705 0-5.31.44-7.812 1.225m0 0H4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0zm-3 8.25a3 3 0 11-6 0 3 3 0 016 0zm6-8.25a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const UVProtectionIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.165 7.857L1.5 6.192m19 .001l-1.665 1.665M16.142 20.835L17.808 22.5m-13.616.001l1.666-1.665" />
 </svg>
);

export const AntiYellowingIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75M17 13.75L15.75 12M17 13.75L18.25 15.5M17 13.75L19.25 12.25" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-1.344 0-2.637-.264-3.824-.766m7.648 0c-1.187.502-2.48.766-3.824.766m7.648 0A9.753 9.753 0 0012 2.25C6.343 2.25 1.75 6.343 1.75 12c0 1.702.423 3.308 1.18 4.75" />
  </svg>
);


export const CrispIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h18M3 15.75h18" />
  </svg>
);

export const SoftDrapeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5C3.75 4.5 5.625 9 12 9s8.25-4.5 8.25-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9C3.75 9 5.625 13.5 12 13.5s8.25-4.5 8.25-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5C3.75 13.5 5.625 18 12 18s8.25-4.5 8.25-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 18v1.5m16.5-1.5v1.5" />
  </svg>
);


export const SilkShineIcon: React.FC<IconProps> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.25 12L17 13.75M17 13.75L15.75 12M17 13.75L18.25 15.5M17 13.75L19.25 12.25M12 2.25l1.125 1.125M12 21.75l1.125-1.125m-2.25 0L9.75 21.75M12 21.75l-1.125-1.125m9.375-6.375l1.125 1.125M2.25 12l1.125 1.125m0-2.25L2.25 12m9.375-9.375l1.125 1.125" />
  </svg>
);

export const LightweightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
 </svg>
);

export const CoolTouchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v2.25m-3.75-.75L6 8.25m12-2.25L18 8.25M12 19.5v-2.25m3.75.75L18 15.75m-12 2.25L6 15.75M4.5 12H6.75m10.5 0H19.5M9 6.75L6.75 9M15 6.75L17.25 9M9 17.25L6.75 15M15 17.25L17.25 15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

export const AntiStaticIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 12h17.25" />
  </svg>
);

export const CreaseResistantIcon: React.FC<IconProps> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 3v3m0 3v3m0 3v3" /> 
 </svg>
);

export const EasyCareIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
 </svg>
);

// Standard UI Icons
export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = (props) => ( // For WhatsApp/Landline
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const MobilePhoneIcon: React.FC<IconProps> = (props) => ( // For Mobile
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21v-10.5m16.5 10.5v-10.5m0 0L12 3m0 0L3.75 10.5M12 3v18m0 0H3.75m8.25 0H20.25M3.75 10.5h16.5" />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a15.07 15.07 0 01-4.5 0m4.5 0v-.334c0-.621-.503-1.125-1.125-1.125h-1.5c-.622 0-1.125.504-1.125 1.125v.334m0 0M12 6.75S10.875 5.625 9 5.625 6.75 6.75 6.75 6.75S5.625 7.875 5.625 9.75c0 1.875.938 3.728 3.728 5.603m3.545-5.603c.253.18.473.4.65.65m3.728-5.603S13.125 5.625 15 5.625s2.25 1.125 2.25 1.125S18.375 7.875 18.375 9.75c0 1.875-.938 3.728-3.728 5.603m-3.545-5.603c-.253.18-.473.4-.65.65m0 0a6.002 6.002 0 01-3.697 0" />
  </svg>
);

export const GemIcon: React.FC<IconProps> = (props) => ( // Premium Quality / Luxury
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.518a.562.562 0 01.329.89l-4.203 3.06a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.882a.563.563 0 00-.652 0l-4.725 3.882a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.06a.562.562 0 01.33-.89h5.518a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

export const TruckIcon: React.FC<IconProps> = (props) => ( // Reliable Supply / Delivery
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

export const MicroscopeIcon: React.FC<IconProps> = (props) => ( // Technical Expertise / Innovation
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.375c0-1.121.904-2.036 2.025-2.036h3.9c1.121 0 2.025.915 2.025 2.036V7.5M10.5 16.875v2.625c0 .512-.413.938-.925.938h-1.15c-.512 0-.925-.426-.925-.938V10.5m3.75 9.75H12v-2.625m0 0v-2.25m0 2.25H15M12 12.75V15m2.625-2.625A2.625 2.625 0 0012 7.5H7.5a2.625 2.625 0 00-2.625 2.625m10.5 0A2.625 2.625 0 0012 7.5H7.5a2.625 2.625 0 000 5.25h4.5A2.625 2.625 0 0014.625 10.125z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 21a1.5 1.5 0 001.5-1.5V18a1.5 1.5 0 00-3 0v1.5a1.5 1.5 0 001.5 1.5z" />
  </svg>
);

export const HandshakeIcon: React.FC<IconProps> = (props) => ( // Partnership / Collaboration
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 15.75L19.5 18m-10.5-2.25L4.5 18m10.5-10.5L19.5 3m-10.5 2.25L4.5 3" />
  </svg>
);

export const SEOOptimizationIcon: React.FC<IconProps> = (props) => ( // SEO / Online Visibility
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m-3.75 3.75L21 12m-8.25 3.75L9 12m3.75 3.75L9 12m0-3.75L12.75 12" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.093-.828l2.857-9.589a.75.75 0 00-.713-.928H4.871M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {props.title && <title>{props.title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);