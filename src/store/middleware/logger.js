const logger = params => store => next => action => {
    console.log(params)
    next(action)
}

export default logger