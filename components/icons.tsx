
import React from 'react';

// Generic Icon Props
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

// Fabric Feature Icons
export const BreathableIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5M7.5 6.75A2.25 2.25 0 015.25 9v5.25a2.25 2.25 0 01-4.5 0V9a2.25 2.25 0 014.5 0zm13.5 0a2.25 2.25 0 01-2.25 2.25v5.25a2.25 2.25 0 01-4.5 0V9a2.25 2.25 0 014.5 0z" />
  </svg>
);

export const UVProtectionIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636m7.528 14.318l-12-12" />
  </svg>
);

export const AntiYellowingIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-7.5-7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
  </svg>
);

export const CrispIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M3.75 6.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
  </svg>
);

export const SoftDrapeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-13C4.67 6 4 5.33 4 4.5zM4 9.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-13C4.67 11 4 10.33 4 9.5zM4 14.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-13C4.67 16 4 15.33 4 14.5zM4 19.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-13C4.67 21 4 20.33 4 19.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3s-1 4.5 1.5 18" />
  </svg>
);

export const SilkShineIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L21.75 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09L15 12l2.846.813a4.5 4.5 0 003.09 3.09L21.75 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09z" />
  </svg>
);

export const LightweightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a9.75 9.75 0 009.613-8.875 9.75 9.75 0 00-19.226 0A9.75 9.75 0 0012 18.375zM12 3v15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.375 12.375L12 15.75l-3.375-3.375" />
  </svg>
);

export const CoolTouchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l8.25-8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l8.25 8.25" />
  </svg>
);

export const AntiStaticIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5l-3.75-3.75L7.5 9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5l3.75-3.75L16.5 9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3.75m0 10.5V21" />
  </svg>
);

export const CreaseResistantIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M3 9h18M3 13.5h18M3 18h18" />
  </svg>
);

export const EasyCareIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 00-9-9 .5.5 0 000 1h.008a8 8 0 11-7.294 11.258.5.5 0 00.315.894" />
  </svg>
);

// UI Icons
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
  
export const ArrowUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      {props.title && <title>{props.title}</title>}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.103-.84l3.15-8.25a.532.532 0 00-.455-.66h-11.58a.532.532 0 00-.455.66l-3.15 8.25a1.125 1.125 0 001.103.84zM7.5 14.25L5.106 5.165" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.title && <title>{props.title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09.92-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {props.title && <title>{props.title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);

export const EmailIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {props.title && <title>{props.title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export const BuildingIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {props.title && <title>{props.title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5v-4.5" />
    </svg>
);
  
export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      {props.title && <title>{props.title}</title>}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {props.title && <title>{props.title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.451 0-2.733-.52-3.75-1.342a12.06 12.06 0 013.75-1.342m3.75 1.342a12.06 12.06 0 014.5 0m-4.5-2.311a7.5 7.5 0 007.5 0c1.451 0 2.733.52 3.75 1.342a12.06 12.06 0 00-3.75 1.342" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.933 0-3.5 1.567-3.5 3.5S10.067 10 12 10s3.5-1.567 3.5-3.5S13.933 3 12 3z" />
    </svg>
);
