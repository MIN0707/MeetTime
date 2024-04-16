/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{html,js}'],
	prefix: '',
	theme: {
		extend: {
			colors: {
				primary: 'hsl(240 5.9% 10%)',
				'primary-foreground': 'hsl(0 0% 98%)',
				background: 'hsl(0 0% 100%)',
			},
		},
	},
	plugins: [],
};
