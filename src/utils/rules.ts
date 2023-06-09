export const Rules = {
  required: (value: any) => !!value || 'Este campo es requerido.',
  email: (value: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(value) || 'El correo electrónico no es válido.';
  },
  fileType: (value: File) =>
    value.type.includes('image/') || 'Solo se permiten archivos de imagen.',
  fileSize: (value: File) =>
    value.size <= 1000000 ||
    'El archivo es demasiado grande, el tamaño máximo permitido es de 1 MB.',
  minLength: (value: string, length: number) =>
    value.length >= length || `La longitud mínima es de ${length} caracteres.`,
  maxLength: (value: string) =>
    value.length <= 255 || `La longitud maxima es de 255 caracteres.`,
  orcid: (val: string) => {
    if (val && val.trim() !== '') {
      const regex = /^(?:\d{4}-){3}\d{3}[0-9X]$/;
      return regex.test(val) || 'El código ORCID no es válido';
    }
    return true; // Permitir valor vacío o nulo
  },
  optionalLinkedin: (val: string) => {
    if (val && val.trim() !== '') {
      const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
      return regex.test(val) || 'El enlace no es válido';
    }
    return true; // Permitir valor vacío o nulo
  },
};
