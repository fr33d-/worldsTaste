import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faFlickr, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
    faBars,
    faBeer,
    faBook,
    faCalendar,
    faCalendarAlt,
    faCarrot,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faClock,
    faCog,
    faCut,
    faDatabase,
    faEdit,
    faEnvelopeOpen,
    faFlask,
    faGlobeAmericas,
    faHamburger,
    faHeart,
    faLeaf,
    faLink,
    faMugHot,
    faPlus,
    faRocket,
    faRuler,
    faSave,
    faSearch,
    faSmileBeam,
    faSmoking,
    faStar,
    faStore,
    faTimes,
    faTimesCircle,
    faTrash,
    faTrashAlt,
    faUpload,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Blog } from './pages/Blog';
import { Cigars } from './pages/Cigars';
import { Coffee } from './pages/Coffee/Coffee';
import { Home } from './pages/Home';
import { UserPage } from './pages/User';
import { CoffeeContextProvider } from './Contexts/CoffeeContext';

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
    faCalendar,
    faUser,
    faEnvelopeOpen,
    faChevronRight
);

// The App component hosts all components of our application. It does so by rendering the BrowserRouter component at
// its very root which is automatically populated by the appRoutes defined in Routes.ts.
export const App = () => (
    <>
        {/* <Navigationbar />
        <MainNavigator menu={MainMenu} /> */}
        <BrowserRouter>
            <Switch>
                <Route path="/user/:extention?">
                    <CoffeeContextProvider>
                        <UserPage />
                    </CoffeeContextProvider>
                </Route>
                <Route path="/coffee/:extention?">
                    <CoffeeContextProvider>
                        <Coffee />
                    </CoffeeContextProvider>
                </Route>
                <Route path="/cigars/:id?">
                    <Cigars />
                </Route>
                <Route path="/blog/:id?">
                    <Blog />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    </>
);
