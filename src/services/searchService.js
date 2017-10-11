import Fuse from "fuse.js"
const content = require("../resources/content.json")
import {uniq} from 'lodash'

export const getContentElementsBySearch = (searchTerm, categories = []) => {
    let items = content

    items = items.filter(item => {
        if (categories.length === 0) {
            return true;
        }

        const intersection = item.categories.filter((n) => categories.includes(n))

        return intersection.length > 0
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