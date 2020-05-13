const fs = require('fs')
const sha256 = require('./sha256')

const path = require('path')
const testDir = __dirname
const blockPath = path.join(testDir, 'blocks')

jest.useFakeTimers('modern')

function getBlockFiles() {
    return fs.readdirSync(blockPath)
}

function read(blockFile) {
    return fs.readFileSync(path.join(blockPath, blockFile)).toString()
}

function getBlocks() {
    return getBlockFiles().map(blockFile => {
        let blockText = fs.readFileSync(path.join(blockPath, blockFile)).toString()
        return JSON.parse(blockText)
    })
}

describe(`new-block`, () => {
    const subject = require('../new-block')

    jest.setSystemTime(100)

    beforeEach(() => {
        fs.mkdirSync(blockPath)
    })

    afterEach(() => {
        fs.rmdirSync(blockPath)
    })

    describe(`when creating the first block`, () => {

        beforeEach(() => {
            subject("test data")
        })

        test(`creates a block file`, () => {
            expect(getBlockFiles()).toHaveLength(1)
        })

        test(`uses the block's hash as its file name`, () => {
            // const blockText = read(getBlockFiles()[0])
            // const hash = sha256(blockText)

            // expect(getBlockFiles()).toEqual([hash])
        })
    })
})