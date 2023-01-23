import { pointInPolygon } from "./in-polygon.js";
import getPropertyByPath from "./get-property-by-path.js";
import allowedArgs, { comparisonOperators } from "./cli-args.js";

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

            let include = true;

            if (imagePropertyKey === 'coordinates') {
                include = pointInPolygon(searchParameterValues, image[imagePropertyKey])
            }

            if (include && Array.isArray(image[imagePropertyKey])) {
                include = image[imagePropertyKey].every(value => searchParameters[imagePropertyKey].includes(value));
            }

            if (include && type === 'string') {
                include = image[imagePropertyKey].includes(searchParameterValues)
            }
            if (include && type === 'number') {
                if (Array.isArray(searchParameterValues)) {
                    let path = imagePropertyKey.split('.').shift();
                    include = searchParameterValues.every(item => compare(image[path], Number(item), operator))
                }
            }

            return include;
        })
    })

    return images;
}