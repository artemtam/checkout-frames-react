# checkout-frames-react [![Build Status](https://travis-ci.org/artemtam/checkout-frames-react.svg?branch=master)](https://travis-ci.org/artemtam/checkout-frames-react)

A wrapper [Frames.js by Checkout.com](https://docs.checkout.com/docs/frames) covering Frames.js with types and clean API. 

- [x] Written on TypeScript
- [x] Covers 100% of Frames.js with types
- [x] Light, zero dependencies

## Example

Here is a Checkout.com official documentation example of the Frames.js usage:

```html
<form id="payment-form" method="POST" action="https://merchant.com/charge-card">
    <div class="one-liner">
      <div class="card-frame">
        <!-- form will be added here -->
      </div>
      <!-- add submit button -->  
      <button id="pay-button" disabled>
        PAY GBP 24.99
      </button>
    </div>
    <p class="success-payment-message"></p>
  </form>

  <script>
    var payButton = document.getElementById("pay-button");
    var form = document.getElementById("payment-form");

    Frames.init("pk_test_6ff46046-30af-41d9-bf58-929022d2cd14");

    Frames.addEventHandler(
      Frames.Events.CARD_VALIDATION_CHANGED,
      function (event) {
        console.log("CARD_VALIDATION_CHANGED: %o", event);

        payButton.disabled = !Frames.isCardValid();
      }
    );

    Frames.addEventHandler(
      Frames.Events.CARD_TOKENIZED,
      function (event) {
        var el = document.querySelector(".success-payment-message");
        el.innerHTML = "Card tokenization completed<br>" +
          "Your card token is: <span class=\"token\">" + event.token + "</span>";
      }
    );

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      Frames.submitCard();
    });
  </script>
```

Similar example on React.js with `checkout-frames-react`:

```typescript jsx
import React, { useState } from 'react';
import CheckoutForm, { CardNumberFrame, CVVFrame, ExpiryDateFrame } from 'checkout-frames-react';

const CardForm: React.FC = () => {
  const [cardToken, setCardToken] = useState('');
  const [payButtonDisabled, setPayButtonDisabled] = useState(true);

  const onCardValidationChanged = (valid: boolean): void => {
    setPayButtonDisabled(!valid);
  }

  const onCardTokenized = (token: string): void => {
    setCardToken(token);
  };

  return (
    <>
      <CheckoutForm
        publicKey="pk_test_6ff46046-30af-41d9-bf58-929022d2cd14"
        onCardValidationChanged={onCardValidationChanged}
        onCardTokenized={onCardTokenized}
      >
        <label>
          <span>Card number:</span>
          <CardNumberFrame />
        </label>
        <label>
          <span>Expiry date:</span>
          <ExpiryDateFrame />
        </label>
        <label>
          <span>CVV:</span>
          <CVVFrame />
        </label>

        <button type="submit" disabled={payButtonDisabled}>
          Pay
        </button>
      </CheckoutForm>

      {cardToken ? (
        <p>
        Card tokenization completed
        <br />
        {`Card token: ${cardToken}`}
        </p>
      ) : null}
    </>
  );
};

export default CardForm;
```

