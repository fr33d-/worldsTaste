import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faFlickr, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
    faBars,
    faBeer,
    faBook,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faDatabase,
    faEdit,
    faFlask,
    faGlobeAmericas,
    faHamburger,
    faHeart,
    faLink,
    faMugHot,
    faPlus,
    faRocket,
    faSave,
    faSmoking,
    faStar,
    faStore,
    faTimes,
    faTimesCircle,
    faTrashAlt,
    faUpload,
    faLeaf,
    faRuler,
    faClock,
    faCut,
    faCog,
    faCalendarAlt,
    faSmileBeam,
    faCarrot, 
    faSearch, 
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { appRoutes } from '../../Routes';

library.add(
    faTrashAlt,
    faChevronDown,
    faChevronUp,
    faEdit,
    faPlus,
    faSave,
    faUpload,
    faBars,
    faChevronRight,
    faMugHot,
    faSmoking,
    faHamburger,
    faBeer,
    faLink,
    faRocket,
    faBook,
    faTimes,
    faDatabase,
    faGlobeAmericas,
    faFlask,
    faStore,
    faHeart,
    faStar,
    faTimesCircle,
    faFacebook,
    faInstagram,
    faGithub,
    faFlickr,
    faLeaf,
    faRuler,
    faClock,
    faCut,
    faCog,
    faCalendarAlt,
    faSmileBeam, 
    faCarrot, 
    faSearch,
    faTrash,
);

// The App component hosts all components of our application. It does so by rendering the BrowserRouter component at
// its very root which is automatically populated by the appRoutes defined in Routes.ts.
export const App = () => (
    <>
        {/* <Navigationbar />
        <MainNavigator menu={MainMenu} /> */}
        <BrowserRouter>
            <Switch>
                {appRoutes.map((routeProps, i) => (
                    <Route {...routeProps} key={i} />
                ))}
            </Switch>
        </BrowserRouter>
    </>
);
