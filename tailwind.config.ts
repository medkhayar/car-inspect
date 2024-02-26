import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme:{
    extend: {
    
      minWidth:{
        '1/2':'50%'
      },
      maxWidth:{
        '8xl':'96rem'
      },
      flex:{
        '1.5':'1.5'
      },
      width:{
        '500%':'500%',
        '380':'380px',
        '300':'300px',
        'i':'inherit',
        '22':'5.5rem'
      },
      height:{
        '600':'600px',
        'initial':'initial'
      },
      borderWidth:{
        '1':'1px'
      },
      padding:{
        '2px':'2px',
      }
      ,
      backgroundColor:{
        'light-water':'#9cc0f9',
        'dark-water':'#0e1626'
      },
      transitionProperty:{
        'width':'width'
      },
      colors:{
        'royal-blue': {
          '50': '#eff7ff',
          '100': '#dbedfe',
          '200': '#c0dffd',
          '300': '#94ccfc',
          '400': '#62b0f8',
          '500': '#3d90f4',
          '600': '#347aea',
          '700': '#1f5cd6',
          '800': '#204bad',
          '900': '#1f4389',
          '950': '#182953',
      }, 
      'pizazz': {
        '50': '#fffbec',
        '100': '#fff6d3',
        '200': '#ffe9a5',
        '300': '#ffd86d',
        '400': '#ffbb32',
        '500': '#ffa30a',
        '600': '#ff8b00',
        '700': '#cc6602',
        '800': '#a14e0b',
        '900': '#82420c',
        '950': '#461f04',
    },
    'picton-blue': {
      '50': '#f0f8ff',
      '100': '#e1f0fd',
      '200': '#bbe1fc',
      '300': '#80c9f9',
      '400': '#3baef4',
      '500': '#1394e4',
      '600': '#0676c3',
      '700': '#065d9e',
      '800': '#0a4f82',
      '900': '#0e426c',
      '950': '#092b48',
  },
  
    'steel-blue': {
      '50': '#f1f8fa',
      '100': '#dbecf2',
      '200': '#bbd9e6',
      '300': '#8cbfd4',
      '400': '#569bba',
      '500': '#3d84a7',
      '600': '#336787',
      '700': '#2f556f',
      '800': '#2d485d',
      '900': '#2a3e4f',
      '950': '#172635',
  },
  
    
      }
    }
  }
   
};
export default config;
