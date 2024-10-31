import { GetCustomerDashboardUseCase } from '@domain/usecases/customers/get_dashboard';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, UseBefore } from 'routing-controllers';
import Container from 'typedi';

@JsonController('/customers')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class CustomersController {
  private getCustomerDashboardUseCase = Container.get(GetCustomerDashboardUseCase);

  @Get('/home')
  @HttpCode(200)
  getHomeData() {
    return this.getCustomerDashboardUseCase.call();
  }
}
