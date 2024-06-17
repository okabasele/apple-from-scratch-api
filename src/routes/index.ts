import { Router } from "express";

import * as stripeController from "../controllers/stripe.controller";
import sendMail from "../webhook/mailer";

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Apple from scratch API');
});

router.post('/checkout-session', stripeController.createStripeCheckoutSession);

module.exports = router;