import React from "react";
import styles from "./Checkbox.css";

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.filter = this.props.filter;
        this.label = this.props.label;
        this.changeValue = this.props.onChange;
        this.state = {
            checked: false
        }
    }

    render() {
        const { checked } = this.state;
        return (
            <div className={styles.block}>
                <input className={styles.checkbox} type="checkbox" id={this.id}
                    onChange={this.handleChange} checked={checked} />
				<label className={styles.label} htmlFor={this.id}>
					{this.label}
				</label>
            </div>
        )
    }

    componentDidMount() {
        this.checkJqvery();
    }

    checkJqvery() {
        let path = window.location.search;
        if (!path.length) {
            return;
        }
        if (path.indexOf(this.id) > 0) {
            this.handleChange();
        }
    }

    handleChange = () => {
        const newCheck = !this.state.checked;
        this.changeValue(newCheck, this.filter, this.id);
        this.setState({
            checked: !this.state.checked,
            value: newCheck
        })
    }
}

export default Checkbox;