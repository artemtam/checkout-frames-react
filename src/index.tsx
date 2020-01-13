import React, { Component } from 'react';

import { FramesInitProps } from 'types';

interface CheckoutFormProps extends FramesInitProps {
    onCardSubmitted?: () => void;
    onCardValidationChanged?: (isValid: boolean) => void;
    onCardTokenized?: (token: string) => void;
    onCardTokenizationFailed?: () => void;
}

class CheckoutForm extends Component<CheckoutFormProps> {
  componentDidMount(): void {
    const {
      publicKey,
      debug,
      namespace,
      localization,
      style,
      onCardValidationChanged,
      onCardSubmitted,
      onCardTokenized,
      onCardTokenizationFailed,
    } = this.props;

    window.Frames.init({
      publicKey,
      debug,
      namespace,
      localization,
      style,
    });

    if (onCardValidationChanged) {
      window.Frames.addEventHandler(window.Frames.Events.CARD_VALIDATION_CHANGED, (event) => {
        onCardValidationChanged(event.isValid);
      });
    }

    if (onCardSubmitted) {
      window.Frames.addEventHandler(window.Frames.Events.CARD_SUBMITTED, () => {
        onCardSubmitted();
        setTimeout(() => window.Frames.enableSubmitForm(), 300);
      });
    }

    if (onCardTokenized) {
      window.Frames.addEventHandler(window.Frames.Events.CARD_TOKENIZED, (event) => {
        onCardTokenized(event.token);
      });
    }

    if (onCardTokenizationFailed) {
      window.Frames.addEventHandler(window.Frames.Events.CARD_TOKENIZATION_FAILED, () => {
        onCardTokenizationFailed();
      });
    }
  }

  componentWillUnmount(): void {
    window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_VALIDATION_CHANGED);
    window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_SUBMITTED);
    window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZED);
    window.Frames.removeAllEventHandlers(window.Frames.Events.CARD_TOKENIZATION_FAILED);
  }

  render(): JSX.Element {
    return (
      <form
        id="payment-form"
        onSubmit={(e): void => {
          e.preventDefault();
          window.Frames.submitCard();
        }}
      >
        <div className="card-number-frame" />
        <div className="expiry-date-frame" />
        <div className="cvv-frame" />
      </form>
    );
  }
}


export default CheckoutForm;
