const { Client } = require('pg')

const dbInit = async (isTest) => {
    isTest = isTest || false
    const client = new Client({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 10001,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "postgres",
    });

    await client
        .connect()
        .then(() => console.log('connected'))
        .catch(e => console.error(e.stack));

    await client
        .query("create table if not exists organizations(name varchar(1024), createDate date, " + 
            "employees numeric, isPublic bool)")
        .then(result => {
            console.log(result)
            console.log("Step 1: Created Table Organizations")
        })
        .catch(e => console.error(e.stack));    
    await client
        .query("create unique index if not exists organizations_ux_01 on organizations(name)")
        .then(result => {
            console.log(result)
            console.log("Step 2: Created Unique Index on Organizations")
        })    
        .catch(e => console.error(e.stack));

    await client
        .query("insert into organizations (name, createDate, employees, isPublic) select 'random', '2021-02-02', " +
            "100, true on conflict(name) do update set employees = 600 where organizations.name = 'random'")
        .then(result => {
            console.log(result)
            console.log("Step 3: Inserted value into Organizations")
        })
        .catch(e => console.error(e.stack))
        .then(() => client.end())  
};

dbInit()
  