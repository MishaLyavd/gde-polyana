import React from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./Header.css";
import s from '../../styles/style.css';
import logo from './images/logo.png';
import point from './images/point.png';
import MyContext from '../../index.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            mobileMenuOpen: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.block}>
                    <div className={`${styles.content} ${s.wrapper}`}>
                        <div className={`${styles.menuBlock} ${styles.gdePolyana}`}>
                            <div className={styles.menuItem}>
                                <Link to="/" className={`${styles.menuLink} ${s._link}`}>
                                    <img className={styles.logoImg} src={logo}></img>
                                    <span className={styles.logoText}>ГдеПоляна</span>
                                </Link>
                            </div>
                            <div className={styles.menuItem}>
                                <Link to="/" className={`${styles.menuLink} ${s._link}`}>
                                    <img className={styles.logoImg} src={point}></img>
                                    <span className={styles.pointText}>Новосибирск</span>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.menuBlock}>
                            <div className={`${styles.menuItem} ${styles.menuDesktop}`}>
                                {this.renderButtons()}
                            </div>
                            <button className={`${styles.menuMobileButton} ${this.state.mobileMenuOpen ? styles.menuMobileButton_active : ""}`} onClick={this.handleMenu} />
                        </div>
                    </div>
                </div>
                {this.state.mobileMenuOpen && this.renderMobileMenu()}
            </React.Fragment>
        )
    }

    renderMobileMenu() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className={styles.mobileMenu}>
                        {context.user ? this.renderLkM(context.changeUser) : this.renderGuestM()}
                    </div>
                )}
            </MyContext.Consumer>
        )
    }

    renderGuestM() {
        return (
            <React.Fragment>
                <div onClick={this.redirect} data-link={'/'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Главная
                </div>
                <div onClick={this.redirect} data-link={'/list'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Заведения
                </div>
                <div onClick={this.redirect} data-link={'/login'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Вход
                </div>
                <div onClick={this.redirect} data-link={'/registration'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Регистрация
                </div>
            </React.Fragment>
        )
    }

    renderLkM(changeUser) {
        this.changeUser = changeUser;
        return (
            <React.Fragment>
                <div onClick={this.redirect} data-link={'/'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Главная
                </div>
                <div onClick={this.redirect} data-link={'/list'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Заведения
                </div>
                <div onClick={this.redirect} data-link={'/lk'} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Личный кабинет
                </div>
                <div onClick={this.logout} className={`${styles.menuLinkMobile} ${s._link}`}>
                    Выход
                </div>
            </React.Fragment>
        )
    }

    handleMenu = () => {
        this.setState({
            mobileMenuOpen: !this.state.mobileMenuOpen
        })
    }

    renderButtons() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        {context.user ? this.renderLk(context.user, context.changeUser) : this.renderGuest()}
                    </React.Fragment>
                )} 
            </MyContext.Consumer>
        )
    }

    renderGuest() {
        return (
            <React.Fragment>
                <Link to="/login" className={`${styles.menuLink} ${s._link} ${styles.menuAuth}`} >
                    Вход
                </Link>
                <Link to="/registration" className={`${styles.menuLink} ${s._link} ${styles.menuAuth}`}>
                    Регистрация
                </Link>
            </React.Fragment>
        )
    }

    redirect = (event) => {
        const link = event.target.getAttribute('data-link');
        this.routeChange(link);
        this.setState({
            mobileMenuOpen: false
        })      
    }

    logout = () => {
        fetch('/api/v1/logout', {method: 'post'})
            .then(() => {
                this.changeUser(null);
                setTimeout(this.routeChange("/"), 0);
                if (this.state.mobileMenuOpen) {
                    this.setState({
                        mobileMenuOpen: false
                    })
                }
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    routeChange(path) {
        this.props.history.push(path);
    }

    renderLk(user, changeUser) {
        this.changeUser = changeUser;
        return (
            <React.Fragment>
                <Link to="/lk" className={`${styles.menuLink} ${s._link} ${styles.menuAuth}`}>
                    <div className={styles.lk}>{user.userName}</div>
                </Link>
                <div onClick={this.logout} className={`${styles.menuLink} ${s._link} ${styles.menuAuth}`}>
                    Выход
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Header);