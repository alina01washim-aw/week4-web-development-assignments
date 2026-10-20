const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Google DNS configured for Node.js");
