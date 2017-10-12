import React from 'react'
import {Link} from "react-router-dom"
import {findItemById} from "./searchService"

export const renderLink = (pageId, key = null) => {
    return <Link key={key} to={`/page/${pageId}`}>{findItemById(pageId).title}</Link>
}

export const renderContentText = (text) => {
    return text.split("\n").map((line, i) => {
        return <span className="line" key={i}>
            {renderContentLine(line)}
            <br/>
        </span>
    })
}

export const renderContentLine = (text) => {
    const pieces1 = text.split("]]")

    const pieces = []

    for (let i in pieces1) {
        const piece = pieces1[i]

        if (piece.indexOf('[[') === -1) {
            pieces.push(<span key={pieces.length}>{piece}</span>)
            continue
        }

        const pieces2 = piece.split('[[')

        pieces.push(<span key={pieces.length}>{pieces2[0]}</span>)
        pieces.push(renderLink(pieces2[1], pieces.length))
    }

    return <span>
        {pieces}
    </span>
}