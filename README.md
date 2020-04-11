# checkout-frames-react ![Downloads](https://badgen.net/npm/dt/checkout-frames-react) ![Minified and zipped size](https://badgen.net/bundlephobia/minzip/checkout-frames-react)

A wrapper [Frames.js by Checkout.com](https://docs.checkout.com/docs/frames) covering Frames.js with types and clean API. 

- [x] Written on TypeScript
- [x] Covers 100% of Frames.js with types
- [x] Light, zero dependencies

## Example

Here is an example similar to [Checkout.com official documentation](https://docs.checkout.com/docs/frames#section-add-the-code-snippet-to-your-site) with `checkout-frames-react`:

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

