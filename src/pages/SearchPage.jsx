import React from 'react';
import {getAllCategories, getAllCourses} from "../services/searchService"
import {clone} from "lodash"
import {Link} from "react-router-dom"
import {searchIsEnabled} from "../services/optionsService"

class SearchPage extends React.Component {
    renderCategories(item) {
        return item.categories.map((category) => {
            return <span key={category} className="badge badge-default">{category}</span>
        })
    }

    renderCourse(item) {
        if (item.categories.indexOf('Courses') !== -1) {
            return null
        }

        return <span> &middot; {item.course}</span>
    }

    renderItems() {
        return this.props.items
            .filter(item => {
                if (!searchIsEnabled() && item.categories[0] !== 'Courses') {
                    return false
                }

                return true
            })
            .map((item, i) => {
                return <div key={i} className="card">
                    <div className="card-block">
                        {item.title} {this.renderCourse(item)}
                        <br/>
                        {this.renderCategories(item)}
                    </div>
                    <div className="card-footer text-right">
                        <Link to={`/page/${item.id}`} className="btn btn-sm btn-secondary">Read more</Link>
                    </div>
                </div>
            })
    }

    onChangeCategoryFilter(category) {
        const isSelected = this.props.selectedCategories.indexOf(category) !== -1

        if (isSelected) {
            this.props.setSelectedCategories(this.props.selectedCategories.filter(_category => _category !== category))
        } else {
            const newCategories = clone(this.props.selectedCategories)
            newCategories.push(category)

            this.props.setSelectedCategories(newCategories)
        }
    }

    onChangeCourseCheckbox(course) {
        const isSelected = this.props.selectedCourses.indexOf(course) !== -1

        if (isSelected) {
            this.props.setSelectedCourses(this.props.selectedCourses.filter(_course => _course !== course))
        } else {
            const newCourses = clone(this.props.selectedCourses)
            newCourses.push(course)

            this.props.setSelectedCourses(newCourses)
        }
    }

    renderCategoryCheckboxes() {
        return getAllCategories().map(category => {
            return <li key={category} className="list-group-item">
                <div className="form-check">
                    <label className="form-check-label">
                        <input checked={this.props.selectedCategories.indexOf(category) !== -1}
                               className="form-check-input" type="checkbox" onChange={() => this.onChangeCategoryFilter(category)} value=""/>
                        {' '}
                        {category}
                    </label>
                </div>
            </li>
        })
    }

    renderCourseCheckboxes() {
        return getAllCourses().map(course => {
            return <li key={course} className="list-group-item">
                <div className="form-check">
                    <label className="form-check-label">
                        <input checked={this.props.selectedCourses.indexOf(course) !== -1}
                               className="form-check-input" type="checkbox" onChange={() => this.onChangeCourseCheckbox(course)} value=""/>
                        {' '}
                        {course}
                    </label>
                </div>
            </li>
        })
    }

    renderWithSearch() {
        return <div className="container">
            <div className="row">
                <div className="col-md-4">
                    Categories
                    <ul className="list-group">
                        {this.renderCategoryCheckboxes()}
                    </ul>
                    <hr/>
                    Your courses
                    <ul className="list-group">
                        {this.renderCourseCheckboxes()}
                    </ul>
                </div>
                <div className="col-md-8">
                    <div className="search-result-items">
                        {this.renderItems()}
                    </div>
                </div>
            </div>
        </div>
    }

    render() {
        if (searchIsEnabled()) {
            return this.renderWithSearch()
        }

        return <div className="container">
            <div className="col-md-8">
                <div className="search-result-items">
                    {this.renderItems()}
                </div>
            </div>
        </div>
    }
}

SearchPage.propTypes = {};
SearchPage.defaultProps = {};

export default SearchPage;
