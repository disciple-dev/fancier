export const CLIArgumentTypes = Object.freeze({
    number: 'number',
    string: 'string',
    polygon: '[[number,number]...]',
    boolean: 'boolean'
})

export const comparisonOperators = Object.freeze({
    equal: '$eq',
    greaterThan: '$gt',
    greaterThanOrEqual: '$gte',
    lessThan: '$lt',
    lessThanOrEqual: '$lte'
})

const allowedArgs = {
    alpha: {
        type: CLIArgumentTypes.string
    },
    continent: {
        type: CLIArgumentTypes.string
    },
    coordinates: {
        type: CLIArgumentTypes.polygon
    },
    dpi: {
        type: CLIArgumentTypes.number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: CLIArgumentTypes.number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: CLIArgumentTypes.number
        }
    },
    favorite: {
        type: CLIArgumentTypes.boolean
    },
    filename: {
        type: CLIArgumentTypes.string
    },
    filetype: {
        type: CLIArgumentTypes.string
    },
    height: {
        type: CLIArgumentTypes.number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: CLIArgumentTypes.number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: CLIArgumentTypes.number
        }
    },
    hockeyTeam: {
        type: CLIArgumentTypes.string
    },
    size: {
        type: CLIArgumentTypes.number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: CLIArgumentTypes.number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: CLIArgumentTypes.number
        }
    },
    userTags: {
        type: CLIArgumentTypes.string
    },
    width: {
        type: CLIArgumentTypes.number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: CLIArgumentTypes.number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: CLIArgumentTypes.number
        }
    },
}

export default allowedArgs;
export const argList = Object.keys(allowedArgs)