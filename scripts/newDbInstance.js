const {User} = require('../source/schema');
const db = require('../source/schema');

db.connectDb().then(async () => {
    await main();
})

async function main() {
    console.log('log1');
    let user = await User.findById(1);
    console.log('log2');
    if (!user) {
        user = await new User();
    }
    console.log('main:', user);
    return user;
}