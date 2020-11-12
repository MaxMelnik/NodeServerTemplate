db.createUser(
    {
        user: "streamportaltest",
        pwd: "qawsedrf131",
        roles: [
            { role: "readWrite", db: "streamportaltest" }
        ]
    }
)