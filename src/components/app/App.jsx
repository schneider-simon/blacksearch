import React from 'react';
import {Switch, Route} from 'react-router'
import {BrowserRouter, Link, withRouter} from 'react-router-dom'
import SearchPage from "../../pages/SearchPage"
import ContentPage from "../../pages/ContentPage"
import {getContentElementsBySearch} from "../../services/searchService"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            searchTerm: "",
            selectedCategories: [],
            selectedCourses: []
        }

        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onSearchChange(event) {
        this.props.history.push('/')

        this.setState({
            searchTerm: event.target.value
        })
    }

    setSelectedCategories(categories) {
        this.setState({
            selectedCategories: categories
        })
    }

    setSelectedCourses(courses) {
        this.setState({
            selectedCourses: courses
        })
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <a className="navbar-brand" href="#">BlackSearch</a>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="form-inline my-2 my-lg-0">
                                <div className="input-group">
                              <span className="input-group-btn">
                                <Link to="/" className="btn btn-secondary" type="button"><i className="fa fa-caret-left" aria-hidden="true"/></Link>
                              </span>
                                    <input value={this.state.searchTerm} onChange={this.onSearchChange} className="form-control mr-sm-2" type="text" placeholder="Search"/>
                                </div>
                            </form>
                        </div>
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/" component={() => {
                        return <SearchPage
                            selectedCategories={this.state.selectedCategories}
                            setSelectedCategories={this.setSelectedCategories.bind(this)}
                            selectedCourses={this.state.selectedCourses}
                            setSelectedCourses={this.setSelectedCourses.bind(this)}
                            term={this.state.searchTerm}
                            items={getContentElementsBySearch(this.state.searchTerm, this.state.selectedCategories, this.state.selectedCourses)}
                        />
                    }}/>
                    <Route path="/page/:id" component={ContentPage}/>
                </Switch>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default withRouter(App);
