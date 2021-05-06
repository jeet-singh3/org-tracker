import app from './app';

const getPort = (): number => {
    let port: string | number | undefined;
    port = process.env.PORT;
    if (!port) {
        port = 8080;
    }
    if (typeof port === 'string') {
        port = parseInt(port, 10);
    }
    return port;
};

(() => {
    const port: number = getPort();
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`App listening on port ${port}`);
    });
})();
