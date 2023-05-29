export const Functions = {
  formatDate: (date: string) => {
    const fecha = new Date(date);
    const fechaFormateada = fecha.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return fechaFormateada;
  },
};
