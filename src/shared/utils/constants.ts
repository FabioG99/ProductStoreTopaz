import Config from 'react-native-config';

const configuredBaseUrl = Config.API_BASE_URL?.trim();

if (!configuredBaseUrl) {
  throw new Error(
    'Falta configurar API_BASE_URL en el archivo de entorno del build.',
  );
}

export const BASE_URL = configuredBaseUrl.replace(/\/+$/, '');
