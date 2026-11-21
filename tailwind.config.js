/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0F4C5C',
                    primary: '#146B82',
                    light: '#E6F4F8',
                    accent: '#10B981',
                    accentHover: '#059669',
                },
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
