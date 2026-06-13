module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#031427',
          800: '#0b1c30',
          700: '#102034',
          600: '#1b2b3f',
          500: '#213145',
          400: '#26364a',
          300: '#2a3a4f',
        },
        surface: {
          DEFAULT: '#031427',
          dim: '#031427',
          bright: '#2a3a4f',
          card: '#FFFFFF',
          'container-low': '#0b1c30',
          'container': '#102034',
          'container-high': '#1b2b3f',
          'container-highest': '#26364a',
        },
        primary: {
          DEFAULT: '#4d8eff',
          light: '#adc6ff',
          dark: '#002e6a',
        },
        'on-surface': '#d3e4fe',
        'on-surface-variant': '#c2c6d6',
        outline: { DEFAULT: '#8c909f', variant: '#424754' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-sm': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        gutter: '24px',
      },
      boxShadow: {
        card: '0px 4px 12px rgba(15, 23, 42, 0.08)',
        elevated: '0px 8px 24px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
