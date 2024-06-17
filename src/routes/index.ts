import { Router } from "express";

import * as stripeController from "../controllers/stripe.controller";
import sendMail from "../webhook/mailer";

const router = Router();

router.post('/checkout-session', stripeController.createStripeCheckoutSession);
router.post('/email', async (req, res) =>{
  try {
    
    await sendMail('oceane.kabasele@ynov.com', 'test', 'test', 'test');
  return res.json({success:true});
    } catch (error) {
      return res.status(400).json({success:false, error});
    }
});

module.exports = router;