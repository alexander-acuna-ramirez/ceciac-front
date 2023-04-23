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
};
