import React from 'react';
import {Switch, Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import SearchPage from "../../pages/SearchPage"
import ContentPage from "../../pages/ContentPage"
import {getContentElementsBySearch} from "../../services/searchService"

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            isOpen: false,
            searchTerm: "",
            selectedCategories: []
        }

        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        })
    }

    setSelectedCategories(categories) {
        this.setState({
            selectedCategories: categories
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <a className="navbar-brand" href="#">BlackSearch</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0">
                            <input value={this.state.searchTerm} onChange={this.onSearchChange} className="form-control mr-sm-2" type="text" placeholder="Search"/>
                            <button className="btn btn-default my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={() => {
                            return <SearchPage
                                selectedCategories={this.state.selectedCategories}
                                setSelectedCategories={this.setSelectedCategories.bind(this)}
                                term={this.state.searchTerm}
                                items={getContentElementsBySearch(this.state.searchTerm, this.state.selectedCategories)}
                            />
                        }}/>
                        <Route path="/page/:id" component={ContentPage}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
