import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router , Switch } from 'react-router-dom';
import Header from "./components/Header/Header.js";
import App from "./containers/App/App.js";
import Login from "./containers/Login/Login.js";
import Registration from "./containers/Registration/Registration.js";
import List from "./containers/List/List.js";
import Lk from "./containers/Lk/Lk.js";
import Place from "./containers/Place/Place.js";
import ChangePassword from "./containers/ChangePassword/ChangePassword.js";
import AddPlace from "./containers/AddPlace/AddPlace.js";
import EditPlace from "./containers/EditPlace/EditPlace.js";
import LoadAvatar from "./containers/LoadAvatar/LoadAvatar.js";
import DeletePlace from "./containers/DeletePlace/DeletePlace.js";
import AddBook from "./containers/AddBook/AddBook.js";
import NotFound from "./containers/NotFound/NotFound.js";
import AddCuisine from "./containers/AddCuisine/AddCuisine.js";
import EditCuisine from "./containers/EditCuisine/EditCuisine.js";
import DeleteCuisine from "./containers/DeleteCuisine/DeleteCuisine.js";
import AddType from "./containers/AddType/AddType.js";
import EditType from "./containers/EditType/EditType.js";
import DeleteType from "./containers/DeleteType/DeleteType.js";
import EditRole from "./containers/EditRole/EditRole.js";
import EditUser from "./containers/EditUser/EditUser.js";
import DeleteUser from "./containers/DeleteUser/DeleteUser.js";
import s from './styles/style.css';
import normalize from './styles/normalize.css';

const MyContext = React.createContext({user: null});
export default MyContext;

class MyProvider extends React.Component {
    state = {
        user: null,
        data: null
    }

    render() {
        return(
            <MyContext.Provider value={{
                user: this.state.user,
                data: this.state.data,
                changeUser: this.changeUser,
                changeData: this.changeData,
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

    componentDidMount() {
        fetch('/api/v1/users/userInfo')
            .then(result => {
                if (!result.ok) {
                    return;
                }
                return result.json();
            })
            .then(result => {
                this.setState({
                    user: result
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    changeUser = (newUser) => {
        this.setState({
            user: newUser
        })
    }

    changeData = (newData) => {
        this.setState({
            data: newData
        })
    }
}

class Routing extends React.Component {
    render() {
        return (
            <MyProvider>
                <Router>
                <React.Fragment>
                    <Header />
                    <div className={s.main}>
                        <Switch>
                            <Route exact path="/" component={App} />
                            <Route path="/login" component={Login} />
                            <Route path="/registration" component={Registration} />
                            <Route path="/list" component={List} />
                            <Route path="/lk" component={Lk} />
                            <Route path="/nsk/places/:id" component={Place} />
                            <Route path="/change-password" component={ChangePassword} />
                            <Route path="/add-place" component={AddPlace} />
                            <Route path={"/edit-place" || "/edit-place/:id"} component={EditPlace} />
                            <Route path={"/load-avatar" || "/load-avatar/:id"} component={LoadAvatar} />
                            <Route path="/delete-place" component={DeletePlace} />
                            <Route path="/add-book/:id" component={AddBook} />
                            <Route path="/add-cuisine" component={AddCuisine} />
                            <Route path="/edit-cuisine" component={EditCuisine} />
                            <Route path="/delete-cuisine" component={DeleteCuisine} />
                            <Route path="/add-type" component={AddType} />
                            <Route path="/edit-type" component={EditType} />
                            <Route path="/delete-type" component={DeleteType} />
                            <Route path="/edit-role" component={EditRole} />
                            <Route path="/edit-user" component={EditUser} />
                            <Route path="/delete-user" component={DeleteUser} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </React.Fragment>
                </Router>
            </MyProvider>
        )
    }
}

document.getElementById('app').className = s.page;
ReactDOM.render(<Routing />, document.getElementById('app'))