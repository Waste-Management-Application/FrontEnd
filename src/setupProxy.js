import { createProxyMiddleware } from 'http-proxy-middleware';

// eslint-disable-next-line no-undef
export default function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://newsapi.org',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/v2',
            },
        })
    );
}