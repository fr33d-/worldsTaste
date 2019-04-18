import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import LocalStyles from './Navigationbar.module.scss';
import { navigation } from '../../navigation';

type NavbarProps = RouteComponentProps; // & {
//     items: NavigationItem[]
// };

class NavigationbarBase extends Component<NavbarProps> {
    public render() {
        console.log(this.props.history.location.pathname);
        return (
            <Navbar expand="lg" className={LocalStyles.Navbar}>
                <div className="container">
                    <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
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
            </Navbar>
        );
    }

    private readonly onClickButton = (route: string) => () => {
        this.props.history.push(`/${route}`);
    };
}

export const Navigationbar = withRouter(NavigationbarBase);
