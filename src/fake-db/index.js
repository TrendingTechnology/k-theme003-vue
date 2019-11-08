import mock from './mock';

import './data/card/index.js';
import './data/table/index.js';
import './data/data-list/index.js';
import './data/user/index.js';

import './data/apps/index.js';

mock.onAny().passThrough();
