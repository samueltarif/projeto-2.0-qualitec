import { onMounted, ref } from 'vue';

type Theme = 'light' | 'dark';

const storageKey = 'theme-preference';

const currentTheme = ref<Theme>('light');

function getSystemPreference(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function applyTheme(theme: Theme) {
  currentTheme.value = theme;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.setAttribute('data-theme', theme);
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(storageKey, theme);
  }
}

export function useTheme() {
  const setTheme = (theme: Theme) => applyTheme(theme);
  const toggleTheme = () => applyTheme(currentTheme.value === 'dark' ? 'light' : 'dark');

  onMounted(() => {
    const saved = (typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null) as Theme | null;
    const initial = saved || getSystemPreference();
    applyTheme(initial);
  });

  return {
    currentTheme,
    setTheme,
    toggleTheme,
  };
}