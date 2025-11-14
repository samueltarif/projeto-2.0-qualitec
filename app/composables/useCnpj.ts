export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const formatCnpjMask = (digits: string) => {
  const d = onlyDigits(digits).padEnd(14, '');
  if (d.length !== 14) return digits; // retorna original se incompleto
  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12,14)}`;
};

export const normalizeCnpjForSend = (value: string) => onlyDigits(value);

export const normalizeCnpjForSave = (value: string) => formatCnpjMask(value);