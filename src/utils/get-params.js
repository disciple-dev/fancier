import allowedArgs, { argList } from './cli-args.js';
import getPropertyByPath from './get-property-by-path.js';

const printArgs = (argList, path = '', spacer = 8) => {
    let space = ''.padStart(spacer);
    Object.keys(argList).forEach(arg => {
        console.info(`${space}${path}${arg}: <${argList[arg].type}>`)
        if (allowedArgs[arg] && Object.keys(allowedArgs[arg]).some(key => key != 'type')) {
            const subList = structuredClone(allowedArgs[arg]);
            delete subList.type;
            printArgs(subList, `${path}${arg}.`, spacer + 4)
        }
    });
}

export const getSearchParams = function () {
    const [proc, path, ...args] = process.argv;

    // pass empty params if no params :)
    if (!args.length) return {};

    if (['-h', '--help'].includes(args[0])) {
        console.log(`
    Usage:  
        node index.js [arguments]
        search.sh [arguments]

    Example:
        ./search.sh userTags=Dusk,Urban filetype=tiff
    
    Options
        -h, --help          Display this message.
        --coordinates       Takes an array of coordinate pairs, [[x,y],[x.y]...]

    Available arguments:
    `)
        printArgs(allowedArgs);

        process.exit();
    }

    const searchParameters = args.reduce((params, item) => {

        const [key, parameterValues] = item.split('=');

        if (!getPropertyByPath(allowedArgs, key)) {
            console.error(`Argument '${key}' is not allowed.`)
            process.exit();
        }


        let values;

        if (key === 'coordinates') {
            values = JSON.parse(parameterValues);
            console.log(typeof values, values)
        } else {
            values = parameterValues.split(',')
        }
        return {
            ...params, [key.replace('--', '')]: values,
        }
    }, {})

    return searchParameters;
}