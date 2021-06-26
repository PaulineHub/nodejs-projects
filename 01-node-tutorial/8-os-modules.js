//os : The os module provides operating system-related utility methods and properties. It can be accessed using:
const os = require('os');

// info about current user
const user = os.userInfo()

// method returns the system uptime in seconds
console.log(`the systeme uptime is ${os.uptime()}seconds`);

const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem:os.freemem()
}

console.log(currentOS);