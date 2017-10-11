import React from 'react';
import {getAllCategories} from "../services/searchService"
import {clone} from "lodash"
import {Link} from "react-router-dom"

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
        return this.props.items.map((item, i) => {
            return <div key={i} className="card">
                <div className="card-block">
                    {item.title} {this.renderCourse(item)}
                    <br/>
                    {this.renderCategories(item)}
                </div>
                <div className="card-footer text-right">
                    <Link className="btn btn-sm btn-secondary">Read more</Link>
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

    renderCategoryCheckboxes() {
        return getAllCategories().map(category => {
            return <li key={category} className="list-group-item">
                <label className="form-check-label">
                    <input checked={this.props.selectedCategories.indexOf(category) !== -1}
                           className="form-check-input" type="checkbox" onChange={() => this.onChangeCategoryFilter(category)} value=""/>
                    {category}
                </label>
            </li>
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <ul className="list-group">
                        {this.renderCategoryCheckboxes()}
                    </ul>
                </div>
                <div className="col-md-8">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {};
SearchPage.defaultProps = {};

export default SearchPage;
