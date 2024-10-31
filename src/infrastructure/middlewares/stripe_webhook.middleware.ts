// import Container from 'typedi';
// import { HttpError } from 'routing-controllers';
// import { NextFunction, Response } from 'express';
// import { StripeService } from '@data/services/stripe.service';
// import { RequestWithStripeEvent } from '@data/interfaces/request.interface';
// import { STRIPE_CHECKOUT_COMPLETE_BILLING_SIGNING_SECRET } from '@config/environments';

// export const StripeWebhookMiddleware = async (req: RequestWithStripeEvent, _: Response, next: NextFunction) => {
//   const payload = req.rawBody;
//   const sig = req.headers['stripe-signature'].toString();

//   try {
//     const stripe = Container.get(StripeService);
//     const event = stripe.createWebhookEventConstruct(payload, sig, STRIPE_CHECKOUT_COMPLETE_BILLING_SIGNING_SECRET);
//     req.event = event;
//     next();
//   } catch (err) {
//     next(new HttpError(400, `Webhook Error: ${err.message}`));
//   }
// };
