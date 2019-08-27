async function test() {

    const Redis = require('ioredis')

    const redis = new Redis({
        port: 6377,
        password: '123456'

    })

    const keys = await redis.keys('*')
    await redis.set('val', '123')
    console.log(await redis.get('b'))
}
test()