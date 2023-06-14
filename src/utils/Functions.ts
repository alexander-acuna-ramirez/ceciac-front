import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = 'es';

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
  formatTimestamp(timestamp: string) {
    const dt = DateTime.fromFormat(timestamp, 'yyyy-MM-dd HH:mm:ss');
    const fecha = dt.toFormat('d \'de\' LLLL \'de\' yyyy');
    const hora = dt.toFormat('HH:mm');
    return `${fecha}, ${hora}`;
  },
  getTimeElapsed(timestamp: string) {
    const currentTime = new Date().getTime();
    const pastTime = new Date(timestamp).getTime();
    const difference = currentTime - pastTime;

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return "Hace mucho tiempo";
    } else if (months > 0) {
      return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
    } else if (days > 0) {
      return `Hace ${days} ${days === 1 ? "dia" : "dias"}`;
    } else if (hours > 0) {
      return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else {
      return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    }
  }
};
