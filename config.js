var config = {
  development: {
    env: 'development',
    hostName: 'http://localhost',
    port: 8080,
    apiPrefix: "/api",
    dbURI: 'mongodb://admin1:admin1@ds017231.mlab.com:17231/truongvu2106',
    origins: ['*'],
    secret: 'tru0ng.vu2106',
    oauthPublicKey: 'PKl7wLlml1vCjJ9M_VY-vkLJ_Zo',
    oauthSecretKey: 'DwcOv94EP9zv0hkhZcsJhLkMu7Y'
  }
};

/**
 * Return configuration for the current environment.
 * @returns {Object}
 */
module.exports = (function() {
  return config['development'];
})();