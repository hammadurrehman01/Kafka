import { Service } from 'typedi';
import database from '@config/database';

@Service()
export class DocumentsService {
  private gymDocuments = database.instance.gymDocuments;

  getDocumentsByGyym(gym_id: string) {
    return this.gymDocuments.findMany({
      where: { gym_id },
    });
  }
}
