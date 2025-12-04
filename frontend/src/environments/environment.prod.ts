export const environment = {
  production: true,
  apiUrl: window['env']['apiUrl'] || 'http://localhost:8080',
  googleClientId:
    window['env']['googleClientId'] ||
    '508578685200-vdgduvkc3ef3vb90jgsvju9ekf56acfr.apps.googleusercontent.com',
};
