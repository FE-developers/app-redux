/***
 * 系统reduces
 */
const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.');

const ActionTypes = {
    INIT: `@quick-redux/INIT${randomString()}`,
    REPLACE: `@quick-redux/REPLACE${randomString()}`,
    PROBE_UNKNOWN_ACTION: () => `@quick-redux/PROBE_UNKNOWN_ACTION${randomString()}`
};

export default ActionTypes;