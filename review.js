const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: fs.createReadStream('REVIEW.md')
  });

let review = {
    "sprint": "",
    "class": "",
    "name": "",
    "objectives-achevied": [],
    "objectives-faied": [],
    "improvements": [],
    "improvements-comments": "",
    "others-comments": ""
}

let section

rl.on('line', line => {
    if (line.includes(":")) {
        getAnswerFromQuestion(line)
    }
    if (line.includes("-")) {
        getAnswerFromChocies(line)
    }
    if (line.includes("#")) {
        if (line.includes("##")) {
            let text = getTextFromLine(line, "#")
            section = text
            console.log(section)
        } else {
            let text = getTextFromLine(line, "#")
            review['sprint'] = text
        }
    }
})
.on('close', function(){
    console.log(review)
})

const getTextFromLine = (line, character) => {
    let text = line.split(character).pop().trim();
    return text
}

const getAnswerFromQuestion = line => {
    if (line.includes('Class:')) {
        let text = getTextFromLine(line, 'Class:')
        review.class = text
    }
    if (line.includes('Name:')) {
        let text = getTextFromLine(line, 'Name:')
        review['name'] = text
    }
    if (line.includes('Comments:')) {
        if (section === 'Improvements') {
            let text = getTextFromLine(line, ':')
            review['improvements-comments'] = text
        }
        if (section === 'Others') {
            let text = getTextFromLine(line, ':')
            review['others-comments'] = text
        }
    }
}

const getAnswerFromChocies = line => {
    if (section === 'Objectives') {
        if (line.includes('- [ ]') || line.includes('- []')) {
            let text = getTextFromLine(line, ']')
            review['objectives-faied'].push(text)
        }
        if (line.includes('- [x]')) {
            let text = getTextFromLine(line, ']')
            review['objectives-achevied'].push(text)
        }
    }
    if (section === 'Improvements') {
        if (line.includes('- [x]')) {
            let text = getTextFromLine(line, ']')
            review['improvements'].push(text)
        }
    }
}