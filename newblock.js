const _ = require('lodash')
const fs = require('fs')

const sha256 = require('./sha256')
const blockFiles = require('./block-files')

const data = process.argv[2]
const timestamp = Date.now()

const newBlock = {
    data,
    timestamp
}

const newestBlock = getNewestBlock()
if (newestBlock !== undefined) {
    newBlock.previousHash = sha256(getNewestBlock().text)
}

writeBlock(newBlock)

function writeBlock(block) {
    const blockText = JSON.stringify(block)
    fs.writeFileSync(`./blocks/${sha256(blockText)}`, blockText)
}

function getNewestBlock() {
    let blocks = blockFiles.map(block => {
        let blockText = fs.readFileSync(`./blocks/${block}`).toString()
        return {
            ...JSON.parse(blockText),
            text: blockText
        }
    })

    return _.maxBy(blocks, block => block.timestamp)
}

