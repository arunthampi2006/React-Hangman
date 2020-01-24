export function validateText(value) {
    return {
        type: 'VALIDATE_TEXT',
        value
    }
}

export function levelChange(value) {
    return {
        type: 'LEVEL_CHANGE',
        value
    }
}

export function wordGenerate(value) {
    return {
        type: 'WORD_GENERATE',
        value
    }
}