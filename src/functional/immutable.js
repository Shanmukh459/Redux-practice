import { Map } from 'immutable'

let book  = Map({ title: "Harry Porter"})

function publish(book) {
    book.isPublish = true
}

publish(book)
console.log(book)