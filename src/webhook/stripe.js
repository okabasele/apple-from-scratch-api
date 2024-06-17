import Stripe from 'stripe';
const sendMail = require('./mailer');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhook = async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const sig = request.headers['stripe-signature'];
    
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      console.log("💰 Payment received!");
      const checkoutSession = event.data.object;
      console.log({eventData: event.data, checkoutSession});
      if (!checkoutSession.customer_details?.name || !checkoutSession.customer_details?.email) {
        return response.status(400).send('Bad request');
      }
      console.log({checkoutSession})
      await sendMail(checkoutSession.customer_details?.email,`${checkoutSession.customer_details?.name }`,'Confirmation du paiement de la commande',`Votre commande a bien été enregistrée. Votre numéro de commande est le ${checkoutSession.payment_intent}.`);
      break;

    default:
    // Unexpected event type
    console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

export default stripeWebhook;