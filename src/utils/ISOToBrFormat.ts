export const ISOtoBrFormat =(date: Date): string => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero, então somamos 1
  const ano = date.getFullYear();
  
  const hora = String(date.getHours()).padStart(2, '0');
  const minuto = String(date.getMinutes()).padStart(2, '0');
  const segundo = String(date.getSeconds()).padStart(2, '0');
  
  return `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;
}