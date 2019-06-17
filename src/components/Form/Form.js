import React from "react";
import { withRouter } from 'react-router-dom';
import styles from "./Form.css";
import s from '../../styles/style.css';
import Loading from "../Loading/Loading.js";
import MyMap from "../Map/Map.js";
import ReCAPTCHA from "react-google-recaptcha";
import MyContext from '../../index.js';
const recaptchaRef = React.createRef();

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.id = "",
        this.changeUser = null,
        this.captcha = true;
        this.formInfo = this.props.formInfo;
        this.isOk;
        this.state = {
            dataLoad: false,
            typesData: null,
            cuisinesData: null,
            avatar: "",
            id: "",
            placeId: "",
            orderDate: "",
            orderTime: "",
            numberOfPersons: "",
            name: "", 
            description: "",
            address: "",
            coordinates: [],
            phone: "",
            types: [],
            cuisines: [],
            avgCheck: "",
            info: "",
            userName: "",
            userRole: "",
            password: "",
            phoneNumber: "",
            email: "",
            confirmPassword: "",
            oldPassword: "",
            WorkOpenHourTime: "",
            WorkOpenMinuteTime: "",
            WorkCloseHourTime: "",
            WorkCloseMinuteTime: "",
            WeekOpenHourTime: "",
            WeekOpenMinuteTime: "",
            WeekCloseHourTime: "",
            WeekCloseMinuteTime: "",
            isManagerRoleRequested: null,
            rememberMe: false
        };
    }

    render() {
        const { info } = this.state;
        return (
            <MyContext.Consumer>
                {(context) => (
                    <form className={styles.block} onSubmit={this.handleSubmit}>
                        {this.saveContext(context)}
                        <div className={styles.title}>{this.formInfo.title}</div>
                        {this.renderForm()}
                        <div className={styles.row}>
                            <input className={`${s.button_orange} ${styles.submit}`} type="submit" value="Подтвердить" />
                            <div className={styles.info}>
                                {info}
                            </div>
                        </div>
                    </form> 
                )}
            </MyContext.Consumer>
        )
    }

    saveContext = (context) => {
        if (!this.changeUser && 'changeUser' in context) {
            this.changeUser = context.changeUser;
        }
        if (context.user) {
            this.userName = context.user.userName;
        }
        if (context.data) {
            const data = context.data;
            this.changeData = context.changeData;
            if ('getPlace' in this.formInfo) {
                this.place = data;
            }
            return;
        }
        const pathName = window.location.pathname;
        const pathArr = pathName.split('/');
        const id = pathArr[pathArr.length - 1];
        if (pathArr.length > 2 && id !== "") {
            this.formInfo.inputs[0].type = "internal";
            this[this.formInfo.inputs[0].name] = id;
        }
    }

    componentDidMount() {
        if ('changeData' in this) {
            this.changeData(null);
        }
        if ('getId' in this.formInfo) {
            this.setState({
                id: this.id
            });
        }
        if ('getPlace' in this.formInfo) {
            if ('place' in this) {
                this.getReadyForBooking();
            } else {
                this.getPlace();
            }
        }
        if (!this.formInfo.loadForPlace) {
            return;
        }
        Promise.all([ this.getTypes(), this.getСuisines() ])
            .then(result => {
                return Promise.all([result[0].json(), result[1].json()]);
            })
            .then(result => {
                this.fillCheckType(result[0], 'types');
                this.fillCheckType(result[0], 'cuisines');
                this.setState({
                    dataLoad: true,
                    typesData: result[0],
                    cuisinesData: result[1]
                })
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    getReadyForBooking() {
        this.currentDate = this.getCurrentDate();
        this.maxDate = this.getMaxDate();
        const orderDate = document.getElementById('orderDate');
        this.currentDate = this.currentDate.join('-');
        this.maxDate = this.maxDate.join('-');
        orderDate.min = this.currentDate;
        orderDate.max = this.maxDate;
        this.currentTime = this.getCurrentTime();
        this.setOrderTimeGap(this.currentDate);
        this.setState({
            placeId: this.place.id,
            orderDate: this.currentDate
        });
    }

    getCurrentDate() {
        const fullDate = new Date();
        let year = +fullDate.getFullYear();
        let month = +fullDate.getMonth() + 1;
        let day = +fullDate.getDate();
        if (String(month).length === 1) {
            month = '0' + month;
        }
        if (String(day).length === 1) {
            day = '0' + day;
        }
        return [year, month, day];
    }

    getCurrentTime() {
        const fullDate = new Date();
        let hour = +fullDate.getHours();
        let minute = +fullDate.getMinutes();
        if (String(minute).length === 1) {
            minute = '0' + minute;
        }
        return `${hour}:${minute}`;
    }

    getMaxDate() {
        const maxDate = new Date(this.currentDate[0], this.currentDate[1], +this.currentDate[2] + 7)
        let year = +maxDate.getFullYear();
        let month = +maxDate.getMonth();
        let day = +maxDate.getDate();
        if (String(month).length === 1) {
            month = '0' + month;
        }
        if (String(day).length === 1) {
            day = '0' + day;
        }
        return [year, month, day];
    }

    renderForm() {
        let content = [];
        const inputs = this.formInfo.inputs;
        for (let input in inputs) {
            let row = this.renderRow(inputs[input]);
            content.push(<React.Fragment key={input}>{row}</React.Fragment>);
        }
        if ('captcha' in this.formInfo) {
            content.push(<ReCAPTCHA
                key='captcha'
                ref={recaptchaRef}
                sitekey="6LeI66QUAAAAAA-6O-ILl_K3zQDfwXgXJZkZMHnu"
                theme="dark"
                size="normal"
              />);
        }
        return content;
    }

    renderRow(input) {
        if (input.type === 'text' || input.type === 'password' || input.type === 'date'|| input.type === 'time' || input.type === 'number') {
            return this.renderInput(input);
        }
        if (input.type === 'textarea') {
            return this.renderTextArea(input.label, input.name);
        }
        if (input.type === 'checkbox') {
            return this.showCheckboxes(input);
        }
        if (input.type === 'radio') {
            return this.renderRadio(input);
        }
        if (input.type === 'file') {
            return this.renderFile(input.label, input.name, input.accept);
        }
        if (input.type === 'map') {
            return this.renderMap(input.label, input.name);
        }
        if (input.type === 'workingTime') {
            return this.renderWorkTime(input.label, input.name1, input.name2);
        }
    }

    renderInput(input) {
        return (
            <div className={styles.row}>
                <label htmlFor={input.name} className={`${styles.leftSide}`}>
                    <div id={input.type === 'time' ? 'orderLabel' : ''} className={`${styles.name} ${this.formInfo.validations[input.name].required ? styles.required : ''}`}>{input.label}</div>
                </label>
                <div className={styles.rightSide}>
                    <input type={input.type} name={input.name} value={this.state[input.name]} id={input.name}
                        className={`${styles.input} ${input.type === 'date' || input.type === 'time' ? styles.date : ''}`} onChange={this.handleChange}
                        onBlur={this.handleBlur} onFocus={this.handleFocus} 
                        min={'min' in input ? input.min : null} max={'max' in input ? input.max : null}
                        step={'step' in input ? input.step : null} />
                    <div className={`${styles.errorField} ${s._invisible}`}>Ошибка ввода</div>
                </div>
            </div>
        )
    }

    renderWorkTime(label, name1, name2) {
        return (
            <div className={styles.row}>
                <label htmlFor={name} className={`${styles.leftSide}`}>
                    <div className={`${styles.name} ${this.formInfo.method === "post" ? styles.required : ''}`}>{label}</div>
                </label>
                <div className={`${styles.flexRow} ${styles.rightSide}`}>
                    <input type='number' name={name1} value={this.state[name1]} id={name1}
                        className={styles.worktime} onChange={this.handleChange}
                        onBlur={this.handleBlur} onFocus={this.handleFocus}
                        min={0} max={23} step={1} placeholder='часы' />
                    <input type='number' name={name2} value={this.state[name2]} id={name2}
                        className={styles.worktime} onChange={this.handleChange}
                        onBlur={this.handleBlur} onFocus={this.handleFocus}
                        min={0} max={59} step={1} placeholder='минуты' />
                </div>
            </div>
        )
    }

    renderRadio(input) {
        let radios = [];
        for (let i = 0; i < input.values.length; i++) {
            radios.push(
                <div className={styles.button} key={input.values[i]} data-type={input.name}>
                    <input type="radio" name={input.name} value={input.values[i]} id={input.values[i]}
                        className={styles.checkbox} onChange={this.handleChange}
                        onBlur={this.handleBlur} />
                    <label htmlFor={input.values[i]} className={styles.button__label}>
                        {'buttons' in input ? input.buttons[i] : input.text[i]}
                    </label>
                </div>
            )
        }
        return (
            <div className={styles.row}>
                <label htmlFor={input.values[0]} className={styles.leftSide}>
                    <div className={`${styles.name} ${this.formInfo.validations[input.name].required ? styles.required : ''}`}>{input.label}</div>
                </label>
                <div className={`${styles.flexRow} ${styles.rightSide} ${styles._wrap}`}>
                    {radios}
                </div>
            </div>
        )
    }

    renderFile(label, name, accept) {
        return (
            <div className={styles.row}>
                <label htmlFor={name} className={`${styles.leftSide}`}>
                    <div className={`${styles.name} ${this.formInfo.validations[name].required ? styles.required : ''}`}>{label}</div>
                </label>
                <div className={styles.rightSide}>
                    <input type="file" name={name} id={name} accept={accept}
                        className={styles.input} onChange={this.handleFileChange}
                    />
                    <div className={`${styles.errorField} ${s._invisible}`}>Ошибка ввода</div>
                </div>
            </div>
        )
    }

    renderTextArea(label, name) {
        return (
            <div className={styles.row}>
                <label htmlFor={name} className={`${styles.leftSide}`}>
                    <div className={`${styles.name} ${this.formInfo.validations[name].required ? styles.required : ''}`}>{label}</div>
                </label>
                <div className={styles.rightSide}>
                    <textarea name={name} value={this.state[name]} id={name} rows={4}
                        className={`${styles.input} ${styles.textarea}`} onChange={this.handleChange}
                        onBlur={this.handleBlur}  onFocus={this.handleFocus} />
                    <div className={`${styles.errorField} ${s._invisible}`}>Ошибка ввода</div>
                </div>
            </div>
        )
    }

    showCheckboxes = (input) => {
        const { dataLoad } = this.state;
        return (
            <div className={styles.row}>
                <label className={`${styles.leftSide}`} htmlFor={'one' in input ? input.name : null} >
                    <div className={`${styles.name} ${this.formInfo.validations[input.name].required ? styles.required : ''}`}>
                        {input.label}
                    </div>
                </label>
                <div className={`${styles.flexRow} ${styles.rightSide} ${styles._wrap}`} data-type={input.name}>
                    {dataLoad || !this.formInfo.loadForPlace ? this.renderCheckboxes(input) : <Loading showText={true} />}
                </div>
            </div>
        )
    }

    renderCheckboxes(input) {
        let checkList = [];
        if ('one' in input) {
            checkList.push(
                <div className={styles.checkboxOne} key={input.name} data-type={input.name}>
                    <input type="checkbox" id={input.name} onChange={this.switchCheck}
                        className={styles.checkbox} />
                    <label htmlFor={input.name} className={styles.checkboxOne__label}>
                    </label>
                </div>
            );
            return checkList;
        };
        for (let checkbox of this.state[`${input.name}Data`]) {
            checkList.push(
                <div className={styles.button} key={checkbox.id} data-type={input.name}>
                    <input type="checkbox" id={checkbox.id} onChange={this.handleCheck}
                        className={styles.checkbox} />
                    <label htmlFor={checkbox.id} className={styles.button__label}>
                        {checkbox.name}
                    </label>
                </div>
            )
        }
        return checkList;
    }

    renderMap(label, name) {
        return (
            <React.Fragment>
                <div className={styles.row}>
                    <label htmlFor={name} className={`${styles.leftSide}`}>
                        <div className={`${styles.name} ${this.formInfo.validations[name].required ? styles.required : ''}`}>{label}</div>
                    </label>
                    <div className={styles.rightSide}>
                        <input type="text" name={name} value={this.state.address} id={name}
                            className={styles.input} onChange={this.handleChange}
                            onBlur={this.handleBlur} onFocus={this.handleFocus} readOnly={true} />
                        <div className={`${styles.errorField} ${s._invisible}`}>Ошибка ввода</div>
                    </div>
                </div>
                <MyMap address={this.changeAddress} mapMode='reverseGeo' />
            </React.Fragment>
        )
    }

    switchCheck = (event) => {
        const { target } = event;
        const newCheck = !this.state[target.id];
        this.setState({
            [target.id]: newCheck
        })
    }

    changeAddress = (data) => {
        const input = document.getElementById('address');
        input.classList.remove(styles.error);
        input.nextElementSibling.classList.add(s._invisible);
        this.setState({
            address: data[0],
            coordinates: data[1]
        })
    }

    handleFileChange = (event) => {
        this.handleFocus(event);
        const { target } = event;
        const file = target.files[0];
        this[`${target.name}Name`] = file.name;
        this.setState({
            [target.name]: file
        });
    }

    handleFocus = (event) => {
        const { target } = event;
        target.classList.remove(styles.error);
        if (target.type === 'number' && 'workingTime' in this.formInfo) {
            return;
        }
        target.nextElementSibling.classList.add(s._invisible);
    }

    handleBlur = (event) => {
        const { target } = event;
        if (target.type === 'number' && 'workingTime' in this.formInfo) {
            if (this.formInfo === 'post') {
                if (target.value === "" || target.value === null) {
                    target.classList.add(styles.error);
                }
            }
            return;
        }
        const value = target.value.trim();
        const valid = this.isValid(value, this.formInfo.validations[target.name]);
        if (!valid.result) {
            target.classList.add(styles.error);
            target.nextElementSibling.textContent = valid.message;
            target.nextElementSibling.classList.remove(s._invisible);
        }
        this.setState({
            [target.name]: value
        })
    }

    handleChange = (event) => {
        const { target } = event;
        if (target.type === 'radio') {
            this.toggleError(target.name, 'remove');
        }
        if (target.type === 'date') {
            this.currentTime = this.getCurrentTime();
            this.setOrderTimeGap(target.value);
            this.setState({
                [target.name]: target.value,
                orderTime: ""
            })
        }
        this.setState({
            [target.name]: target.value
        })
    }

    setOrderTimeGap(date) {
        const dateArr = date.split('-');
        const timeElem = document.getElementById('orderTime');
        const labelElem = document.getElementById('orderLabel');
        const newDate = new Date(dateArr[0], +dateArr[1] - 1, dateArr[2]);
        let index = +newDate.getDay();
        if (index === 0) {
            index = 6;
        } else {
            index--;
        }
        const timeGap = this.place.workingTime[index];
        if (date === this.currentDate) {
            const currentH = this.currentDate.split(':')[0];
            if (+currentH >= +timeGap.openHourTime) {
                const currentM = this.currentDate.split(':')[1];
                if (+currentM >= +timeGap.openMinuteTime) {
                    timeElem.min = this.currentTime;
                }
            }
        }
        if (!timeElem.hasAttribute('min')) {
            timeElem.min = `${timeGap.openHourTime}:${timeGap.openMinuteTime}`;
        }
        timeElem.max = `${timeGap.closeHourTime}:${timeGap.closeMinuteTime}`;
        labelElem.textContent = `Время (${timeElem.getAttribute('min')}-${timeElem.getAttribute('max')})`;
    }

    handleCheck = (event) => {
        const { target } = event;
        const name = target.parentElement.getAttribute('data-type');
        this[name][target.id] = target.checked;
        this.toggleError(name, 'remove');
        this.fillTypes(name);
    }

    toggleError(name, action) {
        const elements = document.querySelectorAll(`div[data-type=${name}] label`);
        for (let item of elements) {
            item.classList[action](styles.error);
        }
    }

    fillCheckType(data, name) {
        this[name] = {};
        for (let item of data) {
            this[name][item.id] = false;
        }
    }

    fillTypes(name) {
        let typesNew = [];
        for (let type in this[name]) {
            if (this[name][type]) {
                typesNew.push(type);
            }
        }
        this.setState({
            [name]: typesNew
        })
    }

    fillWorkingTime(form) {
        const { WorkOpenHourTime, WorkOpenMinuteTime, WorkCloseHourTime, WorkCloseMinuteTime,
            WeekOpenHourTime, WeekOpenMinuteTime, WeekCloseHourTime, WeekCloseMinuteTime } = this.state;
        let workingtime = [];

        if (this.formInfo.method === 'patch') {
            const sum = WorkOpenHourTime.length + WorkOpenMinuteTime.length + WorkCloseHourTime.length+ WorkCloseMinuteTime.length + WeekOpenHourTime.length + WeekOpenMinuteTime.length + WeekCloseHourTime.length + WeekCloseMinuteTime.length;
            if (!sum) {
                return form;
            }
        }

        let workDay = {};
        workDay.OpenHourTime = this.validateTime(WorkOpenHourTime, 0, 23, 'WorkOpenHourTime');
        workDay.OpenMinuteTime = this.validateTime(WorkOpenMinuteTime, 0, 59 , 'WorkOpenMinuteTime');
        workDay.CloseHourTime = this.validateTime(WorkCloseHourTime, 0, 23, 'WorkCloseHourTime');
        workDay.CloseMinuteTime = this.validateTime(WorkCloseMinuteTime, 0, 59, 'WorkCloseMinuteTime');

        let weekDay = {};
        weekDay.OpenHourTime = this.validateTime(WeekOpenHourTime, 0, 23, 'WeekOpenHourTime');
        weekDay.OpenMinuteTime = this.validateTime(WeekOpenMinuteTime, 0, 59, 'WeekOpenMinuteTime');
        weekDay.CloseHourTime = this.validateTime(WeekCloseHourTime, 0, 23, 'WeekCloseHourTime');
        weekDay.CloseMinuteTime = this.validateTime(WeekCloseMinuteTime, 0, 59, 'WeekCloseMinuteTime');

        for (let i = 0; i < 7; i++) {
            if (i < 5) {
                for (let time in workDay) {
                    if (workDay[time].length === 1) {
                        workDay[time] = "0" + workDay[time];
                    }
                }
                workingtime.push(workDay);
            } else {
                for (let time in weekDay) {
                    if (weekDay[time].length === 1) {
                        weekDay[time] = "0" + weekDay[time];
                    }
                }
                workingtime.push(weekDay);
            } 
        }
        form.workingtime = workingtime;
        return form;
    }

    validateTime(value, min, max, name) {
        if (value === "") {
            if (this.formInfo.method === 'patch') {
                return String(min);
            }
            if (this.formInfo.method === 'post') {
                const input = document.getElementById(name);
                input.classList.add(styles.error);
                this.isOk = false;
                return String(value);
            }
        }
        if (value < min || isNaN(+value)) {
            return String(min);
        }
        if (value > max) {
            return String(max);
        }
        return String(value);
    }

    fillForm() {
        let form = {};
        for (let input of this.formInfo.inputs) {
            if (input.type === 'workingTime') {
                continue;
            }
            form[input.name] = this.state[input.name];
        }
        return form;
    }

    fillFormData() {
        var formData = new FormData();
        for (let input of this.formInfo.inputs) {
            const name = input.name;
            if (input.type === 'file') {
                formData.append(name, this.state[name], this[`${input}Name`]);
            } else {
                formData.append(name, this.state[name]);
            }
        }
        return formData;
    }

    clearForm = (form) => {
        const newForm = form;
        for (let key in newForm) {
            if ('boolean' in this.formInfo) {
                if (this.formInfo.boolean === key) {
                    form[key] = form[key] === 'true' ? true : false;
                    continue;
                }
            }
            if (!form[key].length && typeof(form[key]) !== "boolean") {
                delete form[key];
            }
        }
        return newForm;
    }

    pointInputError(input, message) {
        if (input.type === 'internal') {
            return;
        }
        if (input.type === 'checkbox' || input.type === 'radio') {
            this.toggleError(input.name, 'add');
            return;
        }
        const inputElem = document.getElementById(input.name);
        inputElem.nextElementSibling.textContent = message;
        inputElem.nextElementSibling.classList.remove(s._invisible);
        inputElem.classList.add(styles.error);
    }

    isFormValid(form) {
        this.isOk = true;
        let items = {};
        const passwords = [];
        for (let input of this.formInfo.inputs) {
            const name = input.name;
            if (input.type === 'workingTime') {
                continue;
            }
            items[name] = this.isValid(form[name], this.formInfo.validations[name]);
            if (!items[name].result) {
                this.isOk = false;
                this.pointInputError(input, items[name].message);
            }
            if (name === 'password' || name === 'confirmPassword') {
                passwords.push(input);
            }
        }
        if (passwords.length === 2) {
            if (form[passwords[0].name] !== form[passwords[1].name]) {
                this.isOk = false;
                this.pointInputError(passwords[0], 'пароли должны совпадать');
                this.pointInputError(passwords[1], 'пароли должны совпадать');
            }
        }
        if ('captcha' in this.formInfo) {
            const recaptchaValue = recaptchaRef.current.getValue();
            if (!recaptchaValue) {
                this.isOk = false;
                this.captcha = false;
            }
        }
    }

    isValid(value, validation) {
        if (validation.required) {
            const min =  'size' in validation ? validation.size[0] : 1;
            if (value.length < min) {
                if (!value.length && validation.required) {
                    return {result: false, message: `Обязательное поле`};    
                }
                if (value.length && validation.required) {
                    return {result: false, message: `Меньше ${min} символов`};    
                }       
            }
            if ('size' in validation && validation.size.length === 2) {
                const max = validation.size[1];
                if (value.length > max) {
                    return {result: false, message: `Больше ${max} символов`};
                }
            }
        }
        if ('pattern' in validation) {
            const pattern = validation.pattern;
            if (!pattern.test(value)) {
                return {result: false, message: `Содержит запрещенные символы`};
            }
        }
        return {result: true};
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let form;
        if (this.formInfo.bodyType === 'form') {
            form = this.fillForm();
            this.isFormValid(form);
            form = this.clearForm(form);
        }
        if (this.formInfo.bodyType === 'formData') {
            form = this.fillForm();
            this.isFormValid(form);
            form = this.fillFormData();
        }
        if ('workingTime' in this.formInfo) {
            form = this.fillWorkingTime(form);
        }
        if (!this.isOk) {
            if (this.captcha) {
                this.setState({
                    info: 'Ошибка заполнения формы'
                });
                return;
            }
            this.setState({
                info: 'Ошибка капчи'
            });
            return;
        }
        this.setState({
            info: 'Ожидание результата'
        });
        let options = {
            method: this.formInfo.method,
            body: this.formInfo.bodyType === 'form' ? JSON.stringify(form) : form
        };
        if (this.formInfo.bodyType === 'form') {
            options.headers = {"Content-Type": "application/json"}
        }
        const pathname = this.getPathname();
        fetch(`${this.formInfo.url}${pathname}`, options)
            .then(result => {
                if (result.ok) {
                    this.setState({
                        info: this.formInfo.message
                    });
                    if ('changeUser' in this.formInfo) {
                        this.loadUser();
                    }
                    if ('redirect' in this.formInfo) {
                        setTimeout(this.routeChange(this.formInfo.redirect), 0);
                    }
                    return;
                }
                this.setState({
                    info: 'Ошибка'
                });
                return;
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    info: 'Ошибка'
                });
            })
    }

    loadUser = () => {
        return fetch('/api/v1/users/userInfo')
            .then(result => {
                if (!result.ok) {
                    return;
                }
                return result.json();
            })
            .then(result => {
                this.changeUser(result);
                return;
                
            })
            .catch(error => {
                console.error(error);
            })
    }

    getPathname() {
        if ('pathname' in this.formInfo) {
            if (this.state[this.formInfo.pathname]) {
                return this.state[this.formInfo.pathname];
            }
            return this[this.formInfo.pathname];
        }
        return "";
    }

    getTypes() {
        return fetch("/api/v1/place-types");
    }

    getСuisines() {
        return fetch("/api/v1/place-cuisines");
    }

    getPlace() {
        fetch(`/api/v1/places/${this.placeId}`)
            .then(result => {
                if (!result.ok) {
                    return;
                }
                return result.json();
            })
            .then(result => {
                this.place = result;
                this.getReadyForBooking();
                return;
                
            })
            .catch(error => {
                console.error(error);
            })
    }

    routeChange(path) {
        this.props.history.push(path);
    }
}

export default withRouter(Form);