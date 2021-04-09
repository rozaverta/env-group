# env-group

Group process environment variables by prefix

```npm install env-group```

## Example:

```javascript
// DB_HOST = localhost
// DB_USER = root
// DB_PASS = pass-123

/**
 * @param {String} prefix environment prefix without _
 * @param {Object | Function} alt alternative names or key rename function
 * @param {Object} def default values
 * @returns {Object}
 */
const envGroup = require("env-group");

console.log(envGroup("db"));
// > { host: 'localhost', pass: 'pass-123', user: 'root' }

console.log(envGroup("db", {PASS: "password"}));
// > { host: 'localhost', password: 'pass-123', user: 'root' }

console.log(envGroup("db", null, {port: 123}));
// > { port: 123, host: 'localhost', pass: 'pass-123', user: 'root' }

console.log(envGroup("db", (key) => `BASE_${key}`));
// > { BASE_HOST: 'localhost', BASE_PASS: 'pass-123', BASE_USER: 'root' }

```

Default key rename function for `SOME_` prefix transform value `SOME_VALUE_NAME` to `valueName`