import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { green, red, grayDark, white } from '../../style/colors';
import classNames from 'classnames';
import LocalStyles from './Footer.module.scss';
import { Row, Container } from 'react-bootstrap';
import { faFacebook, faGithub, faInstagram, faFlickr } from '@fortawesome/free-brands-svg-icons';

type FooterProps = {
    year: string;
    version: string;
};

export const Footer = ({ year, version }: FooterProps) => (
    <div className={LocalStyles.Footer}>
        <Container>
            <Row>
                <div className="col-3">Frederic Wollinger, {year}</div>
                <div className="col-3">
                    <a href="https://www.facebook.com/frederic.wollinger">
                        <FontAwesomeIcon icon={faFacebook} color={grayDark} />
                    </a>
                    <a href="https://github.com/fr33d-">
                    <FontAwesomeIcon icon={faGithub} color={grayDark} />
                    </a>
                    <a href="https://www.instagram.com/fr33d/">
                    <FontAwesomeIcon icon={faInstagram} color={grayDark} />
                    </a>
                    <a href="https://www.flickr.com/photos/fredericw">
                    <FontAwesomeIcon icon={faFlickr} color={grayDark} />
                    </a>
                </div>
                <div className="col-5">
                    {' '}
                    <a href="#">Impressum</a>
                </div>
                <div className="col-1 pull-right"> v {version}</div>
            </Row>
        </Container>
    </div>
);
