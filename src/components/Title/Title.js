import React from "react";
import { Link } from 'react-router-dom';
import styles from "./Title.css";
import coffee from './images/coffee.png';

class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.block}>
                <div className={styles.title}>
                    Не знаешь где провести время? 
                </div>
                <div className={styles.text}>
                    Мы поможем найти столик в соседнем доме
                </div>
                <Link to="/list" className={styles.button}>
                    Найти место
                </Link>
                <img className={styles.coffee} src={coffee}></img>
            </div>
        )
    }
}

export default Title;