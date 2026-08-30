const braintree = require('braintree');
require('dotenv').config();

let gateway;

if (
  process.env.BRAINTREE_MERCHANT_ID &&
  process.env.BRAINTREE_PUBLIC_KEY &&
  process.env.BRAINTREE_PRIVATE_KEY
) {
  gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
} else {
  gateway = null;
}

exports.generateToken = (req, res) => {
  if (!gateway) {
    return res.status(503).json({
      error: 'Braintree is not configured',
    });
  }

  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  if (!gateway) {
    return res.status(503).json({
      error: 'Braintree is not configured',
    });
  }

  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  // charge
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
