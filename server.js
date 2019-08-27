const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/a/:title', async (ctx) => {
        console.log(ctx.params)
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: {
                title: ctx.params.id
            }
        })
        ctx.respond = false
    })
    server.use(router.routes())
    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listening on 3000')
    })
})