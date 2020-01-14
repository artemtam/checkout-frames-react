import React, { Component } from 'react';
import classNames from 'classnames';

import { FramesInitProps } from './types';

interface CheckoutFormProps extends FramesInitProps {
    onCardSubmitted?: () => void;
    onCardValidationChanged?: (isValid: boolean) => void;
    onCardTokenized?: (token: string) => void;
    onCardTokenizationFailed?: () => void;
    className?: string; // form className
}

class CheckoutForm extends Component<CheckoutFormProps> {
  componentDidMount(): void {
    const {
      publicKey,
      debug = false,
      namespace = 'Frames',
      localization = 'EN-GB',
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

        // Re-enables form after submit (helpful when submitting failed)
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
    const { children, className } = this.props;

    return (
      <form
        id="payment-form"
        onSubmit={(e): void => {
          e.preventDefault();
          window.Frames.submitCard();
        }}
        className={classNames(className)}
      >
        {children}
      </form>
    );
  }
}

export const CardNumberFrame: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames('card-number-frame', className)}
    {...props}
  />
);


export const ExpiryDateFrame: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames('expiry-date-frame', className)}
    {...props}
  />
);

export const CVVFrame: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames('cvv-frame', className)}
    {...props}
  />
);

export * from './types';
export default CheckoutForm;
