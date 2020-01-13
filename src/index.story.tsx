import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import CheckoutForm from 'index';


storiesOf('Checkout', module)
  .add('default', () => (
    <CheckoutForm
      publicKey="pk_test_6ff46046-30af-41d9-bf58-929022d2cd14"
    />
  ));
