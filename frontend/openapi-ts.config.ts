import { defaultPlugins } from '@hey-api/openapi-ts';

export default {
  input: 'http://127.0.0.1:8000/openapi.json',
  output: 'src/client',
  plugins: [
    ...defaultPlugins,
    '@hey-api/client-axios',
    {
      asClass: false, // default 
      name: '@hey-api/sdk',
    },
  ],
};