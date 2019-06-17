import React from "react";
import Filter from "../Filter/Filter.js";
import ListItems from "../ListItems/ListItems.js";
import Loading from "../Loading/Loading.js";
import s from '../../styles/style.css';

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOpened: false,
            query: window.location.search,
            filterLoad: false,
            categories: null,
            cuisines: null,
            avgcheck: [
                {
                    id: 'onedollar',
                    name: '500 — 1 500 руб.'
                },
                {
                    id: 'twodollars',
                    name: '1 500 — 2 500 руб.'
                },
                {
                    id: 'threedollars',
                    name: 'от 2 500 руб.'
                }
            ]
        };
    }

    render() {
        const { filterLoad, filterOpened } = this.state;
        return (
            <div className={`${s.containerRow} ${s.wrapper}`}>
                <button className={`${s.button_black} ${s.filterButton}`} onMouseUp={this.handleFilter}>
                    {!filterOpened ? 'Открыть фильтры' : 'Закрыть фильтры'}
                </button>
                <div className={`${s.leftSide} ${filterOpened ? s.leftSide_active : ''}`}>
                    {filterLoad ? this.renderFilter('categories', 'Тип')
                        : <Loading showText={false} />}
                    {filterLoad && this.renderFilter('cuisines', 'Кухня')}
                    {filterLoad && this.renderFilter('avgcheck', 'Средний чек')}
                    <button className={`${s.button_orange} ${s.filterSubmit}`} onMouseUp={this.submit}>Найти</button>
                </div>
                <div className={s.rightSide}>
                    <ListItems query={this.state.query} />
                </div>
            </div>
        )
    }

    handleFilter = () => {
        this.setState({
            filterOpened: !this.state.filterOpened
        })
    }

    componentDidMount() {
        Promise.all([ this.getCategories(), this.getСuisines() ])
            .then(result => {
                return Promise.all([result[0].json(), result[1].json()]);
            })
            .then(result => {
                this.fillFilter(result[0], 'categories');
                this.fillFilter(result[0], 'cuisines');
                this.fillFilter(this.state.avgcheck, 'avgcheck');
                this.setState({
                    filterLoad: true,
                    categories: result[0],
                    cuisines: result[1]
                })
                return;
            })
            .catch(error => {
                console.error(error);
            })
    }

    getCategories() {
        return fetch("/api/v1/place-types");
    }

    getСuisines() {
        return fetch("/api/v1/place-cuisines");
    }

    renderFilter(id, name) {
        let checkList = [];
        for (let checkbox of this.state[id]) {
            checkList.push({
                id: checkbox.id,
                name: checkbox.name
            })
        }
        return (
            <Filter id={id} name={name} checkboxes={checkList} onChange={this.handleChange} />
        )
    }

    fillFilter(data, name) {
        this[name] = {};
        for (let item of data) {
            this[name][item.id] = false;
        }
    }

    handleChange = (value, filter, name) => {
        this[filter][name] = value;
    }

    submit = () => {
        let parametrs = [];
        for (let type in this.categories) {
            if (this.categories[type]) {
                parametrs.push(`type=${type}`);
            }
        }
        for (let type in this.cuisines) {
            if (this.cuisines[type]) {
                parametrs.push(`cuisine=${type}`);
            }
        }
        for (let type in this.avgcheck) {
            if (this.avgcheck[type]) {
                parametrs.push(`avgcheck=${type}`);
            }
        }
        if (!parametrs.length) {
            this.setState({
                query: "",
                filterOpened: false
            })
            return;
        }
        let result = "?";
        result += parametrs.join('&');
        this.setState({
            query: result,
            filterOpened: false
        })
    }
}

export default ListContainer;