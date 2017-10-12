import Fuse from "fuse.js"
const content = require("../resources/content.json")
import {uniq, clone} from 'lodash'

export const getAllItems = () => {
    const items = clone(content)

    const courses = getAllCourses()

    return items.map((item, i) => {
        if(!item.index){
            item.index = i + 1
        }

        return item;
    })
}

export const getContentElementsBySearch = (searchTerm, categories = [], courses = []) => {
    let items = getAllItems()

    items = items.filter(item => {
        if (categories.length === 0) {
            return true;
        }

        if (courses.length > 0 && courses.indexOf(item.course) === -1) {
            return false;
        }

        const intersection = item.categories.filter((n) => categories.includes(n))

        return intersection.length > 0
    })

    items = items.filter(item => {
        if (courses.length === 0) {
            return true;
        }

        return courses.indexOf(item.course) !== -1
    })

    if (!searchTerm || searchTerm.length === 0) {
        return items
    }

    const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "title",
            "categories",
            "course"
        ]
    }
    const fuse = new Fuse(items, options)

    return fuse.search(searchTerm)
}

export const getAllCategories = () => {
    return uniq(content.reduce((categories, item) => {
        return categories.concat(item.categories)
    }, []))
}

export const getAllCourses = () => {
    return content
        .filter(item => item.categories.indexOf("Courses") !== -1)
        .map(item => item.title)
}