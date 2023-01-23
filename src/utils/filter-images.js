import { pointInPolygon } from "./in-polygon.js";
import getPropertyByPath from "./get-property-by-path.js";
import allowedArgs, { CLIArgumentTypes, comparisonOperators } from "./cli-args.js";

const compare = (a, b, comparator = comparisonOperators.equal) => {
    switch (comparator) {
        case comparisonOperators.lessThan:
            return a < b;
        case comparisonOperators.lessThanOrEqual:
            return a <= b;
        case comparisonOperators.greaterThan:
            return a > b;
        case comparisonOperators.greaterThanOrEqual:
            return a >= b;
        case comparisonOperators.equal:
            return a === b;
        default:
            return a === b;
    }
}

export default function (imageData, searchParameters) {

    const searchKeys = Object.keys(searchParameters);

    let images = structuredClone(imageData);

    searchKeys.forEach(imagePropertyKey => {
        const { operator, type } = getPropertyByPath(allowedArgs, imagePropertyKey);
        const searchParameterValues = searchParameters[imagePropertyKey];

        images = images.filter(image => {

            if (type === CLIArgumentTypes.boolean) {
                return image[imagePropertyKey] === searchParameterValues;
            }

            if (type === CLIArgumentTypes.polygon) {
                return pointInPolygon(searchParameterValues, image[imagePropertyKey])
            }

            if (Array.isArray(image[imagePropertyKey])) {
                return image[imagePropertyKey].every(value => searchParameters[imagePropertyKey].includes(value));
            }

            if (type === CLIArgumentTypes.string) {
                return searchParameterValues.every(value => {
                    const search = new RegExp(value, 'i')
                    return image[imagePropertyKey].match(search) !== null
                })
            }

            if (type === CLIArgumentTypes.number) {
                if (Array.isArray(searchParameterValues)) {
                    const path = imagePropertyKey.split('.').shift();
                    return searchParameterValues.every(item => compare(image[path], Number(item), operator))
                }
            }

            return false
        })
    })

    return images;
}