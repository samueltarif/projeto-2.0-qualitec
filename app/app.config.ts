export default defineAppConfig({
  theme: {
    colors: {
      // Cor primária (ações principais, botões, destaques)
      primary: {
        base: '#3B82F6',      // blue-500
        hover: '#2563EB',     // blue-600
        ring: '#93C5FD',      // blue-300
        foreground: '#FFFFFF' // texto sobre primária
      },

      // Secundária baseada em neutral (tons cinza)
      secondary: {
        base: '#6B7280',      // neutral-500
        hover: '#4B5563',     // neutral-600
        ring: '#D1D5DB',      // neutral-300
        foreground: '#FFFFFF'
      },

      // Paleta neutral completa para superfícies e texto
      neutral: {
        50:  '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827'
      }
    }
  }
});