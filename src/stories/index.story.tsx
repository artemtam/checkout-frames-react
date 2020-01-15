import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import CardFormExample from '../example/CardFormExample';


storiesOf('Checkout', module)
  .add('default', () => (
    <CardFormExample />
  ));
