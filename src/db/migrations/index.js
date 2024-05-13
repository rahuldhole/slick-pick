// require all modules on the path and with the pattern defined
const req = require.context('./', true, /\.js$/);

const modules = req.keys().map(key => req(key));

// Export all modules
module.exports = modules; //.filter(module => module !== undefined);

