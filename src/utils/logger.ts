import * as bunyan from "bunyan";

export default bunyan.createLogger({
    name: "Server", 
    streams: [
        {
            level: 'info',
            path: './log/info.log',  // log ERROR and above to a file
            period: "1w",
            count: 30,
        },
        {
            level: 'error',
            type: "rotating-file",
            path: './log/error.log',  // log ERROR and above to a file
            period: "1w",
            count: 52,
        }
    ],
    serializers: {
        req: reqSerializer
    }
});

function reqSerializer(req: any) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}