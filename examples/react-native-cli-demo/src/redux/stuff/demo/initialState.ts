import hit from '../../../mock/hit';

export default {
  getModifications: {
    params: [
      {
        key: 'color',
        defaultValue: 'green',
        activate: false,
      },
    ],
  },
  sendHit: {
    ...hit,
    selected: null,
  },
  safeMode: {
    triggerTest: false,
  },
};
