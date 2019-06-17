import React from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./LkBlock.css";
import s from '../../styles/style.css';
import PopUp from "../PopUp/PopUp.js";
import avatar from './images/no-avatar.png';
import noImg from '../ListItems/images/no-img.png';
import clock from './images/clock.png';
import success from './images/success.png';
import error from './images/error.png';
import MyContext from '../../index.js';

class LkBlock extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.isManager = false,
        this.isAdmin = false,
        this.isOnlyUser = false,
        this.user = null;
        this.state = {
            didLoadPlaces: false,
            didLoadBooks: false,
            didLoadRequests: false,
            places: null,
            books: null,
            requests: null,
            adminMenu: false,
            requestsList: false,
            popUp: false,
            popUpData: null,
            popUpTask: null
        }
    }

    render() {
        const { adminMenu, requestsList, popUp, popUpData, popUpTask } = this.state;
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className={`${s.containerColumn} ${s.wrapper}`}>
                        {popUp && <PopUp data={popUpData} task={popUpTask} hide={this.hidePopUp} />}
                        <div className={styles.block}>
                            {context.user ? this.renderUser(context) : null}
                            {this.isAdmin && adminMenu && this.renderAdminMenu()}
                            <div className={styles.content}>
                                {this.isOnlyUser && this.renderRequest('mobile')}
                                {this.isAdmin && requestsList && this.renderRequests()}
                                {context.user ? this.renderPlaces() : null}
                                {context.user ? this.renderBooks() : null}
                            </div>
                        </div>
                    </div>
                )}
            </MyContext.Consumer>
        )
    }

    hidePopUp = (task) => {
        if (task === 'resetBooks') {
            this.setState({
                popUp: false,
                popUpData: null,
                popUpTask: null,
                didLoadBooks: false
            })
            return;
        }
        if (task === 'resetPlaces') {
            this.setState({
                popUp: false,
                popUpData: null,
                popUpTask: null,
                didLoadPlaces: false
            })
            return;
        }
        if (task === 'resetRequests') {
            this.setState({
                popUp: false,
                popUpData: null,
                popUpTask: null,
                didLoadRequests: false
            })
            return;
        }
        if (task === 'resetRequest') {
            this.user.isManagerRoleRequested = true;
        }
        this.setState({
            popUp: false,
            popUpData: null,
            popUpTask: null
        })
    }

    renderUser = (context) => {
        this.user = context.user;
        this.changeData = context.changeData;
        this.isManager = this.user.roles.indexOf('MANAGER') >= 0 ? true : false;
        this.isAdmin = this.user.roles.indexOf('ADMIN') >= 0 ? true : false;
        if (!this.isManager && !this.isAdmin && this.user) {
            this.isOnlyUser = true;
        }
        return (
            <React.Fragment>
                <div className={styles.user}>
                    <img className={styles.userAvatar} src={avatar} alt="avatar" />
                    <div className={styles.userInfo}>
                        <div className={styles.userTitle}>{this.user.userName}</div>
                        <div className={styles.userText}>{this.user.email}</div>
                        <div className={styles.userText}>{this.user.phoneNumber}</div>
                        <Link to="/change-password" className={` ${styles.password} ${s.button_orange} ${s._link}`}>
                            Изменить пароль
                        </Link>
                        {this.isAdmin ? this.renderCrown() : null}
                    </div>
                </div>
                {this.isOnlyUser && this.renderRequest()}
            </React.Fragment>
        )
    }

    renderRequest(version) {
        if (!this.user.isManagerRoleRequested) {
            return (
                <button onClick={this.toRequest} className={`${s.button_black} ${version === 'mobile' ? styles.requestM : styles.request}`}>Стать менеджером</button>
            );
        }
        return (
            <button className={version === 'mobile' ? `${styles.requestM_disabled} ${styles.requestM}` : `${styles.request_disabled} ${styles.request}`} disabled>Заявка отправлена</button>
        );
    }

    renderAdminMenu() {
        return (
            <div className={styles.adminMenu}>
                <div className={styles.adminMenu__row}>
                    <div className={styles.adminMenu__column}>
                        <div className={styles.adminMenu__title}>Кухня</div>
                        <Link to="/add-cuisine" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Добавить
                        </Link>
                        <Link to="/edit-cuisine" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Изменить
                        </Link>
                        <Link to="/delete-cuisine" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Удалить
                        </Link>
                    </div>
                    <div className={styles.adminMenu__column}>
                        <div className={styles.adminMenu__title}>Тип заведения</div>
                        <Link to="/add-type" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Добавить
                        </Link>
                        <Link to="/edit-type" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Изменить
                        </Link>
                        <Link to="/delete-type" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Удалить
                        </Link>
                    </div>
                </div>
                <div className={styles.adminMenu__row}>
                    <div className={styles.adminMenu__column}>
                        <div className={styles.adminMenu__title}>Заведение</div>
                        <Link to="/load-avatar" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Аватар
                        </Link>
                        <Link to="/edit-place" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Изменить
                        </Link>
                        <Link to="/delete-place" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Удалить
                        </Link>
                    </div>
                    <div className={styles.adminMenu__column}>
                        <div className={styles.adminMenu__title}>Пользователь</div>
                        <Link to="/edit-role" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Роль
                        </Link>
                        <Link to="/edit-user" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Изменить
                        </Link>
                        <Link to="/delete-user" className={`${styles.adminMenu__button} ${s.button_black} ${s._link}`}>
                            Удалить
                        </Link>
                    </div>
                </div>
                <div className={styles.adminMenu__bottom}>
                    <button onClick={this.changeRequestsState} className={`${s.button_black}`}>Показать заявки</button>
                </div>
            </div>
        )
    }

    renderCrown() {
        return (
            <div className={styles.crown} onClick={this.changeMenuState} />
        )
    }

    changeMenuState = (event) => {
        event.target.classList.toggle(styles.crown_active);
        const newVal = !this.state.adminMenu
        if (!newVal) {
            this.setState({
                adminMenu: newVal,
                requestsList: false
            })
            return;
        }
        this.setState({
            adminMenu: newVal
        })
    }

    changeRequestsState = (event) => {
        let message = 'Показать заявки';
        const newVal = !this.state.requestsList;
        if (newVal) {
            message = 'Скрыть заявки';
        }
        event.target.textContent = message;
        this.setState({
            requestsList: newVal
        })
    }

    routeChange(path) {
        this.props.history.push(path);
    }

    loadPlaces = () => {
        this.getPlaces()
            .then(result => {
                return result.json();
            })
            .then(result => {
                this.setState({
                    didLoadPlaces: true,
                    places: result
                });
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    renderPlaces() {
        if (!this.isManager && !this.isAdmin) {
            return null;
        }
        if (!this.state.didLoadPlaces) {
            this.loadPlaces();
            return;
        }
        const { places } = this.state;
        if (!places.length) {
            return (
                <div className={styles.itemsConteiner}>
                    <div className={styles.noItems}>Нет заведений</div>
                    <Link to='/add-place' className={`${s._link} ${s.button_orange} ${styles.addPlace}`}>
                        Добавить
                    </Link>
                </div>
            )
        }
        let renderList = [];
        for (let i = 0; i < places.length; i++) {
            renderList.push(
                <div className={styles.place} key={places[i].id}>
                    <img className={styles.placeIcon} src={places[i].avatar || noImg} alt="avatar" />
                    <div className={styles.placeInfo}>
                        <div className={`${styles.placeText} ${styles.placeName}`}>
                            <b>{places[i].name}</b>
                        </div>
                        <div className={styles.placeText}>
                            {places[i].types.join(", ")}
                        </div>
                        <div className={styles.placeText}>
                            Кухня: {places[i].cuisines.join(", ")}
                        </div>
                        <div className={styles.placeText}>
                            Телефон: {places[i].phone}
                        </div>
                        <div className={`${styles.placeText}`}>
                            Адрес: {places[i].address}
                        </div>
                        <div className={`${styles.placeText} ${styles.placeToken}`}>
                            <span>Telegram: {places[i].telegramToken}</span>
                            <button data-id={places[i].telegramToken} onClick={this.handleCopy} className={`${styles.copy}`} />
                        </div>
                    </div>
                    <button data-id={places[i].id} onClick={this.toAvatar} className={`${styles.frame}`} />
                    <button data-id={places[i].id} onClick={this.toEdit} className={`${styles.edit}`} />
                    <button data-id={places[i].id} onClick={this.toDelete} className={`${styles.delete}`} />
                </div>
            )
        }
        return (
            <div className={styles.itemsConteiner}>
                <div className={styles.title}>Заведения</div>
                {renderList}
                <Link to='/add-place' className={`${s._link} ${s.button_orange} ${styles.addPlace}`}>
                    Добавить
                </Link>
            </div>
        );
    }

    loadRequests = () => {
        this.getRequests()
            .then(result => {
                return result.json();
            })
            .then(result => {
                this.setState({
                    didLoadRequests: true,
                    requests: result
                });
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    loadBooks = () => {
        this.getBooks()
            .then(result => {
                return result.json();
            })
            .then(result => {
                this.setState({
                    didLoadBooks: true,
                    books: result
                });
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    renderBooks() {
        if (!this.state.didLoadBooks) {
            this.loadBooks();
            return;
        }
        const { books } = this.state;
        if (!books.length) {
            return (
                <div className={styles.itemsConteiner}>
                    <div className={styles.noItems}>Нет бронирований</div>
                    <Link to='/list' className={`${s._link} ${s.button_orange} ${styles.addPlace}`}>
                        Заведения
                    </Link>
                </div>
            )
        }
        let renderList = [];
        for (let i = 0; i < books.length; i++) {
            renderList.push(
                <div className={styles.book} key={books[i].id}>
                    <div className={`${styles.bookItem} ${styles.bookName}`}>
                        {books[i].placeName}
                    </div>
                    <div className={`${styles.bookDate} ${styles.bookItem}`}>
                        Дата: {books[i].orderDate}
                    </div>
                    <div className={`${styles.bookTime} ${styles.bookItem}`}>
                        Время: {books[i].orderTime}
                    </div>
                    <div className={`${styles.bookPersons} ${styles.bookItem}`}>
                        Человек: {books[i].numberOfPersons}
                    </div>
                    {this.renderStatus(books[i])}
                </div>
            )
        }
        return (
            <div className={styles.itemsConteiner}>
                <div className={styles.title}>Бронирования</div>
                {renderList}
                <Link to='/list' className={`${s._link} ${s.button_orange} ${styles.addPlace}`}>
                    Заведения
                </Link>
            </div>
        );
    }

    renderRequests() {
        if (!this.state.didLoadRequests) {
            this.loadRequests();
            return;
        }
        const { requests } = this.state;
        if (!requests.length) {
            return (
                <div className={styles.itemsConteiner}>
                    <div className={styles.noItems}>Нет заявок</div>
                </div>
            )
        }
        let renderList = [];
        for (let i = 0; i < requests.length; i++) {
            renderList.push(
                <div className={styles.book} key={requests[i].id}>
                    <div className={`${styles.requestItem} ${styles.requestName}`}>
                        {requests[i].userName}
                    </div>
                    <div className={`${styles.requestItem} ${styles.requestEmail}`}>
                        {requests[i].email}
                    </div>
                    <div className={`${styles.requestItem} ${styles.requestPhone}`}>
                        {requests[i].phoneNumber}
                    </div>
                    <button data-id={requests[i].userName} onClick={this.toAccept} className={`${styles.accept}`} />
                </div>
            )
        }
        return (
            <div className={styles.itemsConteiner}>
                <div className={styles.title}>Заявки на менеджера</div>
                {renderList}
            </div>
        );
    }

    renderStatus(book) {
        let icon = null;
        let message = "";
        let cancel = true;
        if (book.status === 'AwaitingConfirmation') {
            icon = clock;
            message = "Ожидание подтверждения";
        }
        if (book.status === 'Confirmed') {
            icon = success;
            message = "Подтверждено";
        }
        if (book.status === 'Rejected') {
            icon = error;
            message = "Отклонено";
        }
        if (book.status === 'Canceled') {
            icon = error;
            message = "Отменено";
            cancel = false;
        }
        return (
            <div className={styles.bookStatus}>
                <img src={icon} className={styles.bookIcon} alt="status" />
                {message}
                {cancel && <button data-id={book.id} onClick={this.toCancel} className={`${styles.cancel}`} />}
            </div>
        )
    }

    handleCopy = (event) => {
        const id = event.target.getAttribute('data-id');
        var copytext = document.createElement('input');
        copytext.value = id;
        document.body.appendChild(copytext);
        copytext.select();
        document.execCommand('copy');
        document.body.removeChild(copytext);
    }

    toCancel = (event) => {
        const id = event.target.getAttribute('data-id');
        this.setState({
            popUp: true,
            popUpData: id,
            popUpTask: 'cancel book'
        })
    }

    toDelete = (event) => {
        const id = event.target.getAttribute('data-id');
        this.setState({
            popUp: true,
            popUpData: id,
            popUpTask: 'delete place'
        })
    }

    toRequest = () => {
        this.setState({
            popUp: true,
            popUpData: this.user.userName,
            popUpTask: 'send request'
        })
    }

    toAccept = () => {
        const id = event.target.getAttribute('data-id');
        this.setState({
            popUp: true,
            popUpData: id,
            popUpTask: 'accept request'
        })
    }

    toEdit = (event) => {
        const id = event.target.getAttribute('data-id');
        this.routeChange(`/edit-place/${id}`);
    }

    toAvatar = (event) => {
        const id = event.target.getAttribute('data-id');
        this.routeChange(`/load-avatar/${id}`);
    }

    getPlaces() {
        const query = `?manager=${this.user.id}`;
        return fetch(`/api/v1/places${query}`);
    }

    getBooks() {
        const query = `?userId=${this.user.id}`;
        return fetch(`/api/v1/booking${query}`);
    }

    getRequests() {
        const query = '?isManagerRoleRequested=true';
        return fetch(`/api/v1/users${query}`);
    }
}

export default withRouter(LkBlock);