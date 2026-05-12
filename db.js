/*
This is the Express equivalent of:

spring.datasource.url=...
spring.datasource.username=...
*/

const sql = require("mssql");
// import Microsoft SQL Server database driver/connector.


// this object stores database connection settings
// It is like application.properties in Spring Boot.

const config = {
    user: "ftnuser",
    password: "userftn",
    server: "192.168.16.3",
    // port: 1433,
    database: "Shopfloor",

    options: {
        encrypt: false,
        trustServerCertificate: true,
        // serverName: ""
        /*
        Think of it like overriding the default behavior.

        Without this:

        tedious automatically uses:
        server = 192.168.16.3
        ↓
        servername = 192.168.16.3
        ↓
        Node v25 rejects it

        With this:

        serverName: ""

        you force:

        servername = empty

        so Node.js no longer complains.
        */
    }
};

const poolPromise = sql.connect(config);

/*
sql.connect(config)
↓
returns Promise
↓
stored in poolPromise
↓
await poolPromise(waits for poolPromise to finish or else it will use Promise object)
↓
real connection pool obtained
↓
pool.request().query(...)
*/

/*
This starts the database connection.

pool means connection pool.

A connection pool is a reusable group of database connections.

Without pool:
every request creates a new database connection

With pool:
app reuses existing connections
faster and better
*/

module.exports = poolPromise;
// This allows other files to use the database connection.
// poolPromise means the connection may not be ready immediately,
// so it returns a Promise.
// poolPromise already USED config internally.
// but other files only receives poolPromise and not config.
// cuz we dont want to expose internal details.

/*
db.js
= create SQL Server connection config
= connect to database
= export connection pool
= allow repositories to use the database
*/




/*
In Spring Boot application.properties: 

spring.application.name=ftnlabel

spring.datasource.url=jdbc:sqlserver://192.168.16.3:1433;databaseName=Shopfloor;encrypt=false;trustServerCertificate=true;
spring.datasource.username=ftnuser
spring.datasource.password=userftn

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
*/