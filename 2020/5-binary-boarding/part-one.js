
const readline = require('readline')

const fs = require('fs')

const BOARDING_PASSES_FILE = 'input.txt'

const ROWS = 128 - 1

const COLUMNS = 8 - 1

const seatIds = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(BOARDING_PASSES_FILE),
    console: false
})

readInterface.on('line', (line) => {
    const rowIndicators = line.substr(0, 7).split('')

    const columnIndicators = line.substr(7, 3).split('')

    // Calculate Row
    const row = binarySearch(ROWS, rowIndicators, 'F', 'B', true)

    // Calculate Column
    const column = binarySearch(COLUMNS, columnIndicators, 'L', 'R', false)

    // Calculate ID
    const id = calculateId(row, column)
    
    seatIds.push(id)
})

readInterface.on('close', () => {

    const max = Math.max.apply(null, seatIds)

    console.log(`Highest seat id: ${max}`)

})

const calculateId = (row, column) => row * 8 + column

const calculateMiddle = (total, index) => {
    return Math.floor(total / (Math.pow(2, index + 1)))
}

const binarySearch = (initialUpperBound, indicators, lowerHalfIndicator, upperHalfIndicator, selectLowerHalf) => {
    let lowerBound = 0
    let upperBound = initialUpperBound

    indicators.forEach((indicator, index) => {
        const middleBound = calculateMiddle(initialUpperBound, index)

        if(indicator === lowerHalfIndicator) {
            upperBound = lowerBound + middleBound
        }

        if(indicator === upperHalfIndicator) {
            lowerBound += middleBound + 1
        }
    })

    return selectLowerHalf ? lowerBound : upperBound
}