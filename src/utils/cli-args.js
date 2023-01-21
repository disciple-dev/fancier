const number = 'number',
    string = 'string',
    array = 'array',
    none = false,
    polygon = '[[number, number]...]'

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
            operator: '$gte',
            type: number
        },
        max: {
            operator: '$lte',
            type: number
        }
    },
    favorite: {
        type: string
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
            type: number
        },
        max: {
            type: number
        }
    },
    hockeyTeam: {
        type: string
    },
    size: {
        type: number,
        min: {
            type: number
        },
        max: {
            type: number
        }
    },
    userTags: {
        type: `${array}<${string}>`
    },
    width: {
        type: number,
        min: {
            type: number
        },
        max: {
            type: number
        }
    },
}

export default allowedArgs;
export const argList = Object.keys(allowedArgs)