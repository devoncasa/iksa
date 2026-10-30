const typography=require("@tailwindcss/typography");
const config={
        theme: {
          extend: {
            colors: {
              'deep-chocolate': '#3A2A22',
              'warm-terracotta': '#8B5E3C',
              'muted-gold': '#B88D4B',
              'creamy-beige': '#E0D8CC',
              'soft-sand': '#D1C0AA',
              brandAccent: {
                '50': '#FDF8F1',
                '100': '#FAF0E4',
                '200': '#F2DABF',
                '500': '#D6C4A8', // Deep Sandstone Beige
                '600': '#C1784A', // Rich Terracotta
                '700': '#B59F6C', // Burnished Gold
                '800': '#A0522D', // Sienna
              },
              stone: {
                '50': '#fafaf9',
                '100': '#f5f5f4',
                '200': '#e7e5e4',
                '300': '#d6d3d1',
                '400': '#a8a29e',
                '500': '#78716c',
                '600': '#57534e',
                '700': '#44403c',
                '800': '#292524',
                '900': '#1c1917',
              }
            }
          }
        }
      };
config.content=["./index.html","./App.tsx","./components/**/*.tsx","./pages/**/*.tsx","./constants.ts"];config.plugins=[typography];module.exports=config;
