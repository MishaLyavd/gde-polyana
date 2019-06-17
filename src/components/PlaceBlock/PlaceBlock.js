import React from "react";
import { withRouter } from 'react-router-dom';
import Loading from "../Loading/Loading.js";
import noImg from '../ListItems/images/no-img.png';
import MyMap from "../Map/Map.js";
import styles from "./PlaceBlock.css";
import s from '../../styles/style.css';
import MyContext from '../../index.js';

class PlaceBlock extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            didLoad: false,
            place: null,
        };
    }

    render() {
        const { didLoad } = this.state;
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className={`${s.containerColumn} ${s.wrapper}`}>
                        {this.saveContext(context)}
                        {didLoad ? this.rederPlace() : <Loading showText={true} />}
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

    rederPlace() {
        const { place } = this.state;
        return (
            <div className={styles.block}>
                <div className={styles.header}>
                    <img className={styles.avatar} src={place.avatar || noImg} alt="avatar" />
                    <div className={styles.info}>
                        <div className={styles.title}>{place.name}</div>
                        <div className={styles.text}>{place.phone}</div>
                        <div className={styles.text}>{place.address}</div>
                        <div className={styles.text}>Пн–Пт: {place.workingTime[0].openHourTime}:{place.workingTime[0].openMinuteTime}–{place.workingTime[0].closeHourTime}:{place.workingTime[0].closeMinuteTime}</div>
                        <div className={styles.text}>Сб–Вс: {place.workingTime[6].openHourTime}:{place.workingTime[6].openMinuteTime}–{place.workingTime[6].closeHourTime}:{place.workingTime[6].closeMinuteTime}</div>
                        {'user' in this ? <div onClick={this.toBooking} className={`${s.button_orange} ${styles.book}`}>Забронировать</div> : null}
                    </div>
                </div>
                <div className={styles.description}>
                    {place.description}
                </div>
                <MyMap mapMode='pointers' pointers={[place]} center={place.coordinates} />
            </div>
        );
    }

    toBooking = () => {
        this.changeData(this.state.place);
        setTimeout(this.routeChange(`/add-book/${this.state.place.id}`), 0);
    }

    componentDidMount() {
        this.getPlace()
            .then(result => {
                if (!result.ok) {
                    setTimeout(this.routeChange("/"), 0);
                    return;
                }
                return result.json();
            })
            .then(result => {
                this.setState({
                    didLoad: true,
                    place: result
                })
                return;
            })
            .catch(error => {
                setTimeout(this.routeChange("/"), 0);
                return;
            })
    }

    routeChange(path) {
        this.props.history.push(path);
    }

    getPlace() {
        const pathName = window.location.pathname;
        const id = pathName.split('/').pop();
        return fetch(`/api/v1/places/${id}`);
    }
}

export default withRouter(PlaceBlock);