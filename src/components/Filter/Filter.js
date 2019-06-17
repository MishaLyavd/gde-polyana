import React from "react";
import Checkbox from "../Checkbox/Checkbox.js";
import styles from "./Filter.css";

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.name = this.props.name;
        this.changeParent = this.props.onChange;
        this.checkboxes = this.props.checkboxes;
        this.state = {};
    }

    render() {
        return (
            <div className={`${styles.block} ${this.checkLight() ? styles._active : ""}`}>
                <span className={styles.title}>{this.props.name}</span>
                {this.renderCheckboxes()}
            </div>
        )
    }

    checkLight() {
        for (let box in this.state) {
            if (this.state[box]) {
                return true;
            }
        }
        return false;
    }

    componentDidMount() {
        for (let checkbox of this.checkboxes) {
            this.state[checkbox.id] = false;
        }
    }

    renderCheckboxes() {
        const checkboxes = this.checkboxes;
        const items = checkboxes.map((item) => {
            return (
                <Checkbox label={item.name} filter={this.id} id={item.id} key={item.id} onChange={this.handleChange} />
            )
        })
        return items;
    }

    handleChange = (value, filter, name) => {
        this.changeParent(value, filter, name);
        this.setState({
            [name]: value
        });
    }
}

export default Filter;