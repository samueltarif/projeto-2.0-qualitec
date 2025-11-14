import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', {
    mounted(el, binding) {
      const input = el instanceof HTMLInputElement ? el : (el.querySelector('input') as HTMLInputElement | null);
      if (!input) return;

      const pattern = String(binding.value || '');
      if (!pattern || !pattern.includes('#')) {
        return;
      }

      const formatWithPattern = (raw: string) => {
        const digits = String(raw || '').replace(/\D/g, '');
        let out = '';
        let di = 0;
        for (let i = 0; i < pattern.length; i++) {
          const ch = pattern[i];
          if (ch === '#') {
            if (di < digits.length) {
              out += digits[di++];
            } else {
              break;
            }
          } else {
            out += ch;
          }
        }
        return out;
      };

      let updating = false;
      const handler = (e: Event | { target: HTMLInputElement }) => {
        const target = (e as any).target as HTMLInputElement;
        if (!target || updating) return;
        updating = true;
        const formatted = formatWithPattern(target.value || '');
        target.value = formatted;
        const ev = new Event('input', { bubbles: true });
        target.dispatchEvent(ev);
        updating = false;
      };

      input.addEventListener('input', handler);
      input.addEventListener('blur', handler);

      handler({ target: input } as any);

      (input as any).__maskCleanup = () => {
        input.removeEventListener('input', handler);
        input.removeEventListener('blur', handler);
      };
    },
    beforeUnmount(el) {
      const input = el instanceof HTMLInputElement ? el : (el.querySelector('input') as HTMLInputElement | null);
      if (input && (input as any).__maskCleanup) (input as any).__maskCleanup();
    }
  });
});