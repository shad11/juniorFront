import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button';

const scrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

const Footer = () => (
    <div className={styles.footer}>
        <Button action={scrollTop} classList='btn footer__btnUp' children='&#x2303;' />
        <div className={`container ${styles.footerWrap}`}>
            <div>
                <div className={styles.logo}>
                    <Link to='/'><img src='/assets/logo.png' alt='' /></Link>
                </div>
                <Link to='/about' className={styles.footerLink}>О нас</Link>
                <Link to='/questions' className={styles.footerLink}>Вопросы и ответы</Link>
                <Link to='/contacts' className={styles.footerLink}>Контакты</Link>
            </div>
            <div className={styles.copyright}>
                &copy; 2021 Amigos. Все права защищены.
            </div>
        </div>
    </div>
);

export default Footer;