import React from "react";
import styles from "./PopUp.css";
import s from '../../styles/style.css';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.task = this.props.task;
        this.hide = this.props.hide;
    }

    render() {
        return (
            <div className={styles.block}>
                <div className={styles.popUp}>
                    {this.renderTitle()}
                    <div className={styles.buttons}>
                        <button onClick={this.handleYes} className={`${s.button_orange} ${styles.button}`}>Да</button>
                        <button onClick={this.handleNo} className={`${s.button_orange} ${styles.button}`}>Нет</button>
                    </div>
                </div>
            </div>
        )
    }

    renderTitle() {
        let title = '';
        if (this.task === 'cancel book') {
            title = 'Вы действительно хотите отменить бронирование?';
        }
        if (this.task === 'delete place') {
            title = `Вы действительно хотите удалить ${this.data}?`;
        }
        if (this.task === 'send request') {
            title = 'Вы действительно хотите отправить заявку на менеджера?';
        }
        if (this.task === 'accept request') {
            title = `Вы действительно хотите сделать ${this.data} менеджером?`;
        }
        return (
            <div className={styles.title}>{title}</div>
        )
    }

    handleNo = () => {
        this.hide();
    }

    handleYes = () => {
        if (this.task === 'cancel book') {
            this.cancelBook(this.data)
            return;
        }
        if (this.task === 'delete place') {
            this.deletePlace(this.data)
            return;
        }
        if (this.task === 'send request') {
            this.changeRequest(this.data, true, 'resetRequest')
            return;
        }
        if (this.task === 'accept request') {
            this.acceptRequest(this.data)
                .then(() => {
                    this.changeRequest(this.data, false, 'resetRequests')
                })
            return;
        }
    }

    acceptRequest(pathname) {
        let options = {
            method: "patch",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userRole: 'manager'})
        };
        return fetch(`/api/v1/roles/${pathname}`, options)
            .catch(error => {
                console.error(error);
                this.hide();
            })
    }

    changeRequest(pathname, value, task) {
        let options = {
            method: "patch",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({isManagerRoleRequested: value})
        };
        fetch(`/api/v1/users/${pathname}`, options)
            .then(result => {
                if (result.ok) {
                    this.hide(task);
                    return;
                }
                this.hide();
            })
            .catch(error => {
                console.error(error);
                this.hide();
            })
    }

    cancelBook(pathname) {
        let options = {
            method: "patch",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({status: "Canceled"})
        };
        fetch(`/api/v1/booking/${pathname}`, options)
            .then(result => {
                if (result.ok) {
                    this.hide('resetBooks');
                    return;
                }
                this.hide();
            })
            .catch(error => {
                console.error(error);
                this.hide();
            })
    }

    deletePlace(pathname) {
        let options = {
            method: "delete",
            headers: {"Content-Type": "application/json"}
        };
        fetch(`/api/v1/places/${pathname}`, options)
            .then(result => {
                if (result.ok) {
                    this.hide('resetPlaces');
                    return;
                }
                this.hide();
            })
            .catch(error => {
                console.error(error);
                this.hide();
            })
    }
}

export default PopUp;