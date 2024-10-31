import { HttpResponse } from '@data/res/http_response';
import { ClassesService } from '@data/services/classes.service';
import { Inject, Service } from 'typedi';

@Service()
export class GetSponsoredClassesUseCase {
  @Inject()
  private classService: ClassesService;

  public async call() {
    const responses = await this.classService.getAllClasses();
    return new HttpResponse(responses, false);
  }
}
