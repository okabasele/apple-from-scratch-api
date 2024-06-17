import { Request, Response } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createStripeCheckoutSession = async (req: Request, res: Response) => {
  try  {
  const { products } = req.body;

  if (!products || products.length === 0) {
    throw new Error('Products are required');
  }

    const line_items = products.map((product: any) => {
        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        };
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/order/success`,
        cancel_url: `${process.env.FRONTEND_URL}/order/cancel`,
    });
    res.json({success:true, session: {id:session.id, url: session.url} });

  } catch (error) {
    res.json({success:false, error});
  }
}