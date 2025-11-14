import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  safelist: [
    // Garante que o ícone do botão de remover sempre seja gerado
    'i-heroicons-x-mark-20-solid',
    // Alternativas comuns caso você troque o ícone
    'i-heroicons-x-mark',
    'i-lucide-x',
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      scale: 1,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '1em',
        height: '1em',
      },
    }),
  ],
})