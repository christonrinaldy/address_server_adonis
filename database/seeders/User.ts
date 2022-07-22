import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database
    .table('users')
    .multiInsert([
      {username: "admin", password: "password", created_at: new Date(), updated_at: new Date()}
    ])

  }
}
