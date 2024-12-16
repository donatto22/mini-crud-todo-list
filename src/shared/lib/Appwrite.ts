import { Client, Databases, ID } from 'appwrite'

const client = new Client()
client.setProject('675f720700135e1cc57f')

const database = new Databases(client)

export {
    database, ID
}