import xior from 'xior';
import dedupePlugin from 'xior/plugins/dedupe';
// import errorCachePlugin from 'xior/plugins/error-cache';
import throttlePlugin from 'xior/plugins/throttle';

export const http0 = xior.create({ baseURL: process.env.HOST + '/wp-json' });
// http0.plugins.use(errorCachePlugin());
http0.plugins.use(dedupePlugin()); // Prevent same GET requests from occurring simultaneously.
http0.plugins.use(throttlePlugin()); // Throttle same `GET` request in 1000ms
