import { Stripe } from 'stripe';
import { Service } from 'typedi';
import {
  NODE_ENV,
  STRIPE_SECRET_KEY,
  STRIPE_CHECKOUT_CALLBACK_URL,
  STRIPE_PRODUCT_ID_FOR_YEARLY_SUBSCRIPTION,
  STRIPE_PRODUCT_ID_FOR_MONTHLY_SUBSCRIPTION,
  FRONTEND_APPLICATION_URL,
} from '@config/environments';

@Service()
export class StripeService {
  public stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

  public createCustomer(id: string, email: string): Promise<Stripe.Customer> {
    const params: Stripe.CustomerCreateParams = {
      email,
      description: `PaceApp customer`,
      metadata: {
        internal_id: id,
        env: NODE_ENV,
      },
    };

    return this.stripe.customers.create(params);
  }

  public async createCustomerPortalConfiguration(customer_id: string) {
    const configuration = await this.stripe.billingPortal.configurations.create({
      business_profile: {
        // privacy_policy_url: 'https://www.seekinvest.com/privacy',
        // terms_of_service_url: 'https://www.seekinvest.com/terms',
      },
      features: {
        payment_method_update: {
          enabled: true,
        },
        invoice_history: {
          enabled: true,
        },
      },
    });
    return await this.stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: STRIPE_CHECKOUT_CALLBACK_URL,
      configuration: configuration.id,
    });
  }
  catch(error) {
    console.error('Error creating customer portal configuration:', error);
  }

  public createBilling(price_id: string, customer_id: string, user: string) {
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer_id,
      allow_promotion_codes: true,
      cancel_url: `${FRONTEND_APPLICATION_URL}/price-plan`,
      success_url: STRIPE_CHECKOUT_CALLBACK_URL,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      metadata: {
        internal_user_id: user,
        env: NODE_ENV,
      },
    });
  }

  public getAllProducts() {
    return this.stripe.products.list({
      limit: 2,
      active: true,
      ids: [STRIPE_PRODUCT_ID_FOR_MONTHLY_SUBSCRIPTION, STRIPE_PRODUCT_ID_FOR_YEARLY_SUBSCRIPTION],
    });
  }

  public getPriceByProductID(product_id: string) {
    return this.stripe.prices.list({
      active: true,
      product: product_id,
    });
  }

  public getProductByID(id: string) {
    return this.stripe.products.retrieve(id);
  }

  public createWebhookEventConstruct(payload: string | Buffer, sig: string, endpoint_secret: string) {
    return this.stripe.webhooks.constructEvent(payload, sig, endpoint_secret);
  }
}
