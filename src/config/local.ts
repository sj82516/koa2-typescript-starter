export default {
    port: 8081,
    session: {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false
    },
    db: {
        url: "mongodb://localhost/koa-stater-test"
    },
    // for redis usage
    memoryStore: {
        host: 'localhost',
        port: 6379,
        //ttl: 30 * 24 * 60 * 60 * 1000,
        db: 12,
    },
}