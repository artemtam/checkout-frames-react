import React, { useState } from 'react';
import CheckoutForm, { CardNumberFrame, CVVFrame, ExpiryDateFrame } from '../..';

import styles from './CardFormExample.module.scss';

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
          <span className={styles.label}>Card number:</span>
          <CardNumberFrame className={styles.field} />
        </label>
        <label>
          <span className={styles.label}>Expiry date:</span>
          <ExpiryDateFrame className={styles.field} />
        </label>
        <label>
          <span className={styles.label}>CVV:</span>
          <CVVFrame className={styles.field} />
        </label>

        <button
          type="submit"
          className={styles.button}
          disabled={!cardValid || loading}
        >
          {!loading ? 'Submit' : 'Loading...'}
        </button>
      </CheckoutForm>

      <hr />
      <span className={styles.label}>
        {`Card token: ${cardToken}`}
      </span>
    </>
  );
};

export default Index;
