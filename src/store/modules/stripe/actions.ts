import { ActionContext, ActionTree } from 'vuex';
import { StripeError } from '@stripe/stripe-js';
import { RootState } from '../../state';
import stripeState from './state';
// eslint-disable-next-line no-shadow
export enum ActionTypes {
  createCheckoutSession = 'createCheckoutSession'
}
type StripeActionCtx = ActionContext<typeof stripeState, RootState>;
export interface StripeActions extends ActionTree<typeof stripeState, RootState> {
  createCheckoutSession: (
    ctx: StripeActionCtx,
    payload: {
      lineItems: { priceId: string; quantity: number }[];
      successUrl?: string;
      cancelUrl: string;
      metadata?: Record<string, string>;
    }
  ) => Promise<{
    error: StripeError;
  }>;
  createInvoice: (
    ctx: StripeActionCtx,
    payload: { lineItems: { priceId: string; quantity: number }[] }
  ) => Promise<any>;
}
export const actions: StripeActions = {
  async createCheckoutSession(
    { state, rootState },
    { lineItems, successUrl, cancelUrl, metadata }
  ) {
    return fetch(process.env.VUE_APP_STRIPE_CHECKOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lineItems: lineItems.map(item => ({
          price: item.priceId,
          quantity: item.quantity
        })),
        successUrl,
        cancelUrl,
        customerId: rootState.db.user?.stripeId,
        metadata
      })
    })
      .then(async response => {
        console.log(response);
        const session = await response.json();
        if (response.status === 400) throw session.error.raw.message;
        return (await state.stripePromise)!.redirectToCheckout({ sessionId: session.id });
      })
      .catch(err => {
        console.log(err);
      });
  },
  async createInvoice({ rootState }, { lineItems }) {
    return fetch(process.env.VUE_APP_STRIPE_INVOICE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lineItems: lineItems.map(item => ({
          price: item.priceId,
          quantity: item.quantity
        })),
        customerId: rootState.db.user?.stripeId
      })
    }).then(async response => {
      return response.json();
    });
  }
};
