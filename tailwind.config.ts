import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
      colors: {
        '1a1a': '#1a1a1a',
        orangeOpacited: 'rgba(255, 123, 0, 0.5)',
        orange: '#f27318',
        orangeOpacited15: '#fe6a0015',
        darkOrange: '#d66819',
        dark0f0f: '#0f0f0f',
        dark121212: '#121212',
        gray2222: '#222222',
        gray3232: '#323232',
        gray4040: '#404040',
        gray5050: '#505050',
        gray6161: '#616161',
        gray9999: '#999999',
        green: '#00b894',
        red: '#ed4c67',
        lightEee: '#eee',
        lightGrayD5d5: '#d5d5d5',
        lightGrayDdd: '#ddd',
        lightGrayD0d0: '#d0d0d0',
        lightGrayEee: '#eee',
        btnOpacitedHoverBg: '#4d4d4d50',
        brown: '#37271c',
      }
		},
	},
	plugins: [],
};
export default config;
