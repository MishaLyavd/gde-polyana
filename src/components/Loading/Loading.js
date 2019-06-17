import React from "react";
import styles from "./Loading.css";
import loadImg from './images/loading.png';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.showText = this.props.showText;
    }

    render() {
        return (
            <div className={styles.block}>
                <div className={styles.loadWrap}>
                    <img className={styles.loadImg} src={loadImg} />
                </div>
                {this.showText && this.renderText()}
            </div>
        )
    }

    renderText() {
        return (
            <div className={styles.loadText}>
                <span>Загрузка</span>
            </div>
        )
    }
}

export default Loading;