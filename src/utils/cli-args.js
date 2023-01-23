const number = 'number',
    string = 'string',
    array = 'array',
    none = false,
    polygon = '[[number,number]...]',
    boolean = 'boolean'

export const comparisonOperators = Object.freeze({
    equal: '$eq',
    greaterThan: '$gt',
    greaterThanOrEqual: '$gte',
    lessThan: '$lt',
    lessThanOrEqual: '$lte'
})

const allowedArgs = {
    alpha: {
        type: string
    },
    continent: {
        type: string
    },
    coordinates: {
        type: polygon
    },
    dpi: {
        type: number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: number
        }
    },
    favorite: {
        type: boolean
    },
    filename: {
        type: string
    },
    filetype: {
        type: string
    },
    height: {
        type: number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: number
        }
    },
    hockeyTeam: {
        type: string
    },
    size: {
        type: number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: number
        }
    },
    userTags: {
        type: string
    },
    width: {
        type: number,
        min: {
            operator: comparisonOperators.greaterThanOrEqual,
            type: number
        },
        max: {
            operator: comparisonOperators.lessThanOrEqual,
            type: number
        }
    },
}

export default allowedArgs;
export const argList = Object.keys(allowedArgs)