import { type Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '0898d4d8-64e1-46ac-8991-c9d7ace96131',
    authority: 'https://login.microsoftonline.com/5b270d6a-3908-42aa-865c-dcb0bfba9d03',
    redirectUri: 'http://localhost:5173',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ['api://bccbacd2-6882-4087-b506-756a093ae193/access_as_user'],
};
