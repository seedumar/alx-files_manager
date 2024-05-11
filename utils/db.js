
import { MongoClient } from 'mongodb';
import { env } from 'process';

class DBClient {
  constructor() {
    const host = env.DB_HOST || 'localhost';
    const port = env.DB_PORT || 27017;
    const database = env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect((err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Connected -_-');
      }
    });
    this.users = this.client.db(database).collection('users');
    this.files = this.client.db(database).collection('files');
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const nbDocs = await this.users.countDocuments();
      return nbDocs;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async nbFiles() {
    try {
      const nbDocs = await this.files.countDocuments();
      return nbDocs;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;

