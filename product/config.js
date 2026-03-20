module.exports = {
    dbConfig: {
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME || "VendorProductDB",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
            encrypt: true,
            trustServerCertificate: false
        }
    }
};
