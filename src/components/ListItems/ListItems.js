import React from "react";
import { withRouter } from 'react-router-dom';
import { Route, Link, BrowserRouter as Router , Switch } from 'react-router-dom';
import styles from "./ListItems.css";
import s from '../../styles/style.css';
import noImg from './images/no-img.png';
import Loading from "../Loading/Loading.js";
import MyMap from "../Map/Map.js";
import MyContext from '../../index.js';

class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.query = this.props.query;
        this.limit = 6,
        this.offset = 0,
        this.resultLength,
        this.map = false,
        this.state = {
            didLoad: false,
            items: null,
            mode: 'list'
        };
    }

    render() {
        const { didLoad, items, mode } = this.state;
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className={styles.block}>
                        {this.saveContext(context)}
                        {this.renderSwitch()}
                        {this.renderMap(items)}
                        {mode !== 'list' ? null : didLoad ? this.renderItems() : <Loading showText={true} />}
                        {this.offset && !this.map ? <button className={`${s.button_orange} ${styles.button}`} onMouseUp={this.loadElements}>Загрузить еще</button> : null}
                    </div>
                )}
            </MyContext.Consumer>
        )
    }

    saveContext = (context) => {
        if (context.user) {
            this.user = context.user;
        }
        this.changeData = context.changeData;
    }

    routeChange(path) {
        this.props.history.push(path);
    }

    renderMap(items) {
        return (
            <MyMap mapMode='pointers' pointers={items} />
        )
    }

    renderSwitch() {
        return (
            <div className={styles.switchBlock}>
                <input type='radio' name='switch' value='list' id='switchList'
                    onChange={this.handleSwitch} className={styles.switchRadio} defaultChecked />
                <label htmlFor='switchList' className={styles.switchLabel}><span>Список</span></label>
                <input type='radio' name='switch' value='map' id='switchMap'
                    onChange={this.handleSwitch} className={styles.switchRadio} />
                <label htmlFor='switchMap' className={styles.switchLabel}><span>Карта</span></label>
            </div>
        )
    }

    handleSwitch = (event) => {
        const { target } = event;
        this.showMap();
        this.map = !this.map;
        this.setState({
            mode: target.value
        });
        if (this.map) {
            this.loadElements();
        }
    }

    showMap = () => {
        const map = document.getElementById('map');
        map.classList.toggle(s._hidden);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.showMap();
        this.loadElements();
    }

    loadElements = () => {
        this.getItems()
            .then(result => {
                return result.json();
            })
            .then(result => {
                this.resultLength = result.length;
                if (!this.offset) {
                    this.setState({
                        didLoad: true,
                        items: result
                    });
                } else {
                    this.setState({
                        didLoad: true,
                        items: this.state.items.concat(result)
                    });
                }
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    componentWillReceiveProps(nextProps) {
        if (this.query !== nextProps.query) {
            this.query = nextProps.query;
            history.pushState(null, null, `${window.location.pathname}${this.query}`);
            this.offset = 0;
            this.loadElements();
        }
    }

    renderItems() {
        const { items } = this.state;
        const isMore = this.isThereMore(items.length);
        let length = items.length;
        if (isMore) {
            --length;
        }
        if (!length) {
            return (
                <div className={styles.noItems}>Нет подходящих заведений</div>
            )
        }
        let renderList = [];
        for (let i = 0; i < length; i++) {
            renderList.push(
                <div className={`${styles.item} ${'user' in this ? styles.item_guest : ''}`} key={items[i].id}>
                    <Link to={`/nsk/places/${items[i].id}`} className={styles.itemContent}>
                        <img className={styles.icon} src={items[i].avatar || noImg} alt="avatar" />
                        <div className={styles.info}>
                            <div className={`${styles.text} ${styles._link}`}>
                                <b>{items[i].name}</b>
                            </div>
                            <div className={styles.text}>
                                {items[i].types.join(", ")}
                            </div>
                            <div className={styles.text}>
                                Кухня: {items[i].cuisines.join(", ")}
                            </div>
                            <div className={styles.text}>
                                Телефон: {items[i].phone}
                            </div>
                            <div className={`${styles.text} ${styles._link}`}>
                                Адрес: {items[i].address}
                            </div>
                        </div>
                    </Link>
                    {'user' in this ? <button data-index={i} onClick={this.toBooking} className={`${s.button_black} ${styles.book}`}>Забронировать</button> : null}
                </div>
            )
        }
        return renderList;
    }

    toBooking = (event) => {
        const index = event.target.getAttribute('data-index');
        this.changeData(this.state.items[index]);
        setTimeout(this.routeChange(`/add-book/${this.state.items[index].id}`), 0);
    }

    isThereMore(length) {
        if (!this.offset) {
            if (this.resultLength > this.limit) {
                this.offset = length;
                return true;
            }
            return false;
        }
        if (this.resultLength >= this.limit) {
            this.offset = length;
            return true;
        }
        this.offset = 0;
        return false;
    }

    getItems() {
        const addQuery = this.giveOffset();
        return fetch(`/api/v1/places${this.query + addQuery}`);
    }

    giveOffset() {
        let result = "";
        if (!this.query.length) {
            result += "?";
        } else {
            result += "&";
        }
        if (!this.map) {
            result += `limit=${this.offset ? this.limit : this.limit + 1}`;
        }
        if (this.offset) {
            result += `&offset=${this.offset}`;
        }
        return result;
    }
}

export default withRouter(ListItems);