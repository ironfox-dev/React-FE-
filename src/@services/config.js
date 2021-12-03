class Config {
    constructor(config) {
        this.config = config;
    }

    getConfig() {
        return this.config;
    }

    get(key) {
        if (this.getConfig()[key] === 'undefined') {
            throw new Error('Missing required config key value');
        }

        return this.getConfig()[key];
    }
}

export default new Config(process.env);
