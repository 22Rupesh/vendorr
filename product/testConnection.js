const sql = require("mssql/msnodesqlv8");

const config = {
    server: "localhost",
    database: "VendorProductDB",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

async function test() {
    try {
        let pool = await sql.connect(config);
        console.log("SQL Connected Successfully!");
    } catch (err) {
        console.log("Connection Failed:", err);
    }
}

test();
