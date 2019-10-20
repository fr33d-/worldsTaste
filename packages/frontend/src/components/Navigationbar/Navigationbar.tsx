import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as classnames, default as classNames } from 'classnames';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { black, grayDark } from '../../style/colors';
import { useJwt } from '../User';
import LocalStyles from './Navigationbar.module.scss';

type NavbarProps = RouteComponentProps & {
    // items: NavigationItem[];
    light?: boolean;
};

class NavigationbarBase extends Component<NavbarProps> {
    public render() {
        // const { location: { pathname: path } } = this.props;
        const { light } = this.props;
        const { pathname } = this.props.location;
        const path = pathname.split('/').filter(Boolean);

        const gotoUser = () => {
            this.props.history.push('/user');
        };

        const user = useJwt();

        return (
            <div className={LocalStyles.Container}>
                <div className={classNames('container', light && LocalStyles.ContainerLight)}>
                    <div className="row">
                        <div className={classNames('col-12', LocalStyles.Navbar)}>
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Breadcrupm)}>
                                <ul>
                                    <li>
                                        Home
                                        <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg} />
                                    </li>
                                    {path.map((item, i) => {
                                        if (path.length === i + 1) {
                                            return <li>{item}</li>;
                                        } else {
                                            return (
                                                <li>
                                                    {item}
                                                    <FontAwesomeIcon icon="chevron-right" className={LocalStyles.svg} />
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Burger)}>
                                <button className={LocalStyles.User} onClick={gotoUser}>
                                    {user && <FontAwesomeIcon icon="user" color={black} />}
                                    {!user && <FontAwesomeIcon icon="user" color={grayDark} />}
                                </button>
                                <FontAwesomeIcon icon="bars" size="lg" />
                            </div>
                            <div className={classnames(LocalStyles.Navbar, LocalStyles.Logo)} onClick={this.goHome()}>
                                Logo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private readonly goHome = () => () => {
        this.props.history.push(`/`);
    };
}

export const Navigationbar = withRouter(NavigationbarBase);

// type Props = {
//     header: string;
//   };

//   const ComponentWithChildren = ({
//     children,
//     header
//   }: PropsWithChildren<Props>) => (
//     <>
//       <h2>{header}</h2>
//       {children}
//     </>
//   );

//   const Foo = () => (
//     <>
//       <ComponentWithChildren header="Lala">
//         <b>Test</b>
//       </ComponentWithChildren>
//     </>
//   );
