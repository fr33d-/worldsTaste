import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import LocalStyles from './Navigationbar.module.scss';
import { navigation } from '../../navigation';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NavbarProps = RouteComponentProps; // & {
//     items: NavigationItem[]
// };

class NavigationbarBase extends Component<NavbarProps> {

    public render() {
        // console.log(this.props.history.location.pathname);
        return (
            <>
                <div className="container">
                <div className="row">
                    <div className={`col-12 ${LocalStyles.Navbar}`}>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Logo)} onClick={this.onClickButton('/')}>Logo</div>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Breadcrupm)}>
                            <ul>
                                <li>Home</li>
                                <li>Coffee</li>
                            </ul>
                        </div>
                        <div className={classnames(LocalStyles.Navbar, LocalStyles.Burger)}>
                            <FontAwesomeIcon icon="bars" size="lg" />
                        </div>
                    </div>
                    </div>
                </div>

                {/* <Navbar expand="lg" className={LocalStyles.Navbar}>
                <div className="container">
                    <Navbar.Brand href="#">Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {navigation.map((item, i) => (
                                <Nav.Link
                                    active={this.props.history.location.pathname === `/${item.link}`}
                                    onClick={this.onClickButton(item.link)}
                                    key={i}
                                >
                                    {item.name}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar> */}
            </>
        );
    }

    private readonly onClickButton = (route: string) => () => {
        this.props.history.push(`/${route}`);
    };
}

export const Navigationbar = withRouter(NavigationbarBase);
