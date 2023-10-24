const TIMEOUT_ERROR = 'Request timed out.';

const withTimeout = (fn, timeout = 5000) => {
  let timer;
  const timeouter = () =>
    new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(TIMEOUT_ERROR));
      }, timeout);
    });
  return () => Promise.race([fn(), timeouter()]).finally(() => clearTimeout(timer));
};

const retryPromise = (fn, options = {}) => {
  const { retries = 3, delay = 1000 } = options;
  let triesLeft = retries;
  return new Promise((resolve, reject) => {
    const attempt = () => {
      fn()
        .then(resolve)
        .catch((err) => {
          if (triesLeft === 0) {
            reject(err);
          } else {
            setTimeout(() => {
              triesLeft--;
              attempt();
            }, delay);
          }
        });
    };
    attempt();
  });
};

module.exports = { TIMEOUT_ERROR, withTimeout, retryPromise };
