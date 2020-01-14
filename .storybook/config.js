import { configure, addDecorator } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

function loadStories() {
  require('../src/example/index.story');
}

addDecorator(withInfo);
addDecorator(withKnobs);

configure(loadStories, module);
