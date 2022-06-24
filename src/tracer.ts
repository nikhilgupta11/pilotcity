import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: process.env.VUE_APP_DATADOG_APPLICATIONID,
  clientToken: process.env.VUE_APP_DATADOG_CLIENT_TOKEN,
  site: 'datadoghq.com',
  service: process.env.VUE_APP_DATADOG_SERVICE,
  sampleRate: 100,
  trackInteractions: true,
  defaultPrivacyLevel: 'mask-user-input',
  trackInteractions: 'true'
});

export default datadogRum;
