import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
    faChevronDown,
    faChevronUp,
    faEdit,
    faPlus,
    faSave,
    faTrashAlt,
    faUpload,
    faBars,
    faChevronRight,
    faMugHot,
    faSmoking,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { appRoutes } from '../../Routes';

library.add(faTrashAlt, faChevronDown, faChevronUp, faEdit, faPlus, faSave, faUpload, faBars, faChevronRight, faMugHot, faSmoking);

// The App component hosts all components of our application. It does so by rendering the BrowserRouter component at
// its very root which is automatically populated by the appRoutes defined in Routes.ts.
export const App = () => (
    <BrowserRouter>
        <Switch>
            {appRoutes.map((routeProps, i) => (
                <Route {...routeProps} key={i} />
            ))}
        </Switch>
    </BrowserRouter>
);
