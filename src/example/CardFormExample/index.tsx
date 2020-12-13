import React, { useState } from 'react';
import CheckoutForm, { CardNumberFrame, CVVFrame, ExpiryDateFrame } from '../..';

const Index: React.FC = () => {
  const [cardValid, setCardValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardToken, setCardToken] = useState('');

  const onCardValidationChanged = (valid: boolean): void => setCardValid(valid);
  const onCardSubmitted = (): void => setLoading(true);
  const onCardTokenized = (token: string): void => {
    // make a request with the token
    // ...
    setLoading(false);
    setCardToken(token);
  };

  return (
    <>
      <CheckoutForm
        publicKey="pk_test_6ff46046-30af-41d9-bf58-929022d2cd14"
        onCardValidationChanged={onCardValidationChanged}
        onCardSubmitted={onCardSubmitted}
        onCardTokenized={onCardTokenized}
        style={{
          base: {
            color: '#2b2b2b',
            letterSpacing: 0,
            padding: '12px 16px',
            fontSize: '12px',
            lineHeight: '18px',
            background: '#fafafa',
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
          },
          focus: {
            borderColor: '#5e61ff',
          },
          invalid: {
            color: '#f74028',
            borderColor: '#f74028',
          },
        }}
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

        <button
          type="submit"
          disabled={!cardValid || loading}
        >
          {!loading ? 'Submit' : 'Loading...'}
        </button>
      </CheckoutForm>

      <hr />
      <span>
        {`Card token: ${cardToken}`}
      </span>
    </>
  );
};

export default Index;
