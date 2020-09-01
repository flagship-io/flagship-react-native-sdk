export default {
  envId: 'bn1ab7m56qolupi5sa0g',
  visitorId: 'test-visitor-reana-qa',
  visitorContext: [
    {
      key: 'isEvil',
      value: false,
      type: 'boolean',
    },
    {
      key: 'isAwesome',
      value: false,
      type: 'boolean',
    },
  ],
  fetchNow: true,
  decisionMode: 'API',
  pollingInterval: 5,
  activateNow: false,
  enableConsoleLogs: true,
  enableErrorLayout: false,
  nodeEnv: 'production',
  flagshipApi: 'https://decision-api.flagship.io/v1/',
  apiKey: null,
};
