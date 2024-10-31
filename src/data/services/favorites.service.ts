import database from '@config/database';
import { Service } from 'typedi';

@Service()
export class FavoritesService {
  private favorites = database.instance.favorites;

  getAllFavoritesByUserID(id: string) {
    return this.favorites.findMany({
      where: {
        user_id: id,
      },
      include: {
        class: true,
      },
    });
  }
}
