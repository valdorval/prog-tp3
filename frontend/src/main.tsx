import { Router } from 'component/router';
import { UserContext } from 'contexte/usercontext';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<UserContext><Router /></UserContext>, document.getElementById('coreContainer'));
