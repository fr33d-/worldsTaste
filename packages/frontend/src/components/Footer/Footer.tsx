import { faFacebook, faFlickr, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { grayDark } from '../../styles/colors';
// import LocalStyles from './Footer.module.scss';

type FooterProps = {
    year: string;
    version: string;
};

export const Footer = ({ year, version }: FooterProps) => (
    <div className={'Footer'}>
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
