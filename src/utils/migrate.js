const { Client } = require('pg')

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))

client
    .query("create table if not exists organizations(name varchar(1024), date_started date, employees numeric, " + 
        "is_public bool)")
    .then(result => {
        console.log(result)
        console.log("Step 1: Created Table Organizations")
    })
    .catch(e => console.error(e.stack))

client
    .query("create unique index if not exists organizations_ux_01 on organizations(name)")
    .then(result => {
        console.log(result)
        console.log("Step 2: Created Unique Index on Organizations")
    })
    .catch(e => console.error(e.stack))

client
    .query("insert into organizations (name, date_started, employees, is_public) select 'random', '2021-02-02', " + 
        "100, true on conflict(name) do update set employees = 600 where organizations.name = 'random'")
    .then(result => {
        console.log(result)
        console.log("Step 3: Inserted value into Organizations")
    })
    .catch(e => console.error(e.stack))
    .then(() => client.end()) 

