import { Router } from 'component/router';
import { UserContextComponent } from 'context/usercontext';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <UserContextComponent>
        <Router />
    </UserContextComponent>,
    document.getElementById('coreContainer'));
