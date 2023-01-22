// Regex to split on optional spaces followed by a comma followed by optional
//   spaces, e.g. "hello     ,    world" returns ["hello", "world"]
// we can use this both for coordinates and for tags
const commaSeparatedValueRegex = / *, */;

// Regex to replace anything but full-stops, numbers, and dashes. Don't worry
//   about malformed numebrs, for now.
const charactersNotAllowedInNumberCast = /[^\.-\d-]/gi;

export default function (records) {
    return records.map(record => {
        const fileMeta = {
            filename: record.filename,
            filetype: record.filetype,
            size: record.size,
            width: record.width,
            height: record.height,
            dpi: record.dpi,
            coordinates: record.coordinates
                // coords come in as a single string from src, split into pairs
                .split(commaSeparatedValueRegex)
                // some images don't have location data, they should be empty strings from csv-parse cast
                .filter(coord => coord != '')
                // coords come in as strings, since we split them as a string. Convert them to numbers.
                .map(coord => {
                    const value = coord.replace('°', '.').replace(charactersNotAllowedInNumberCast, '');
                    return Number(value)
                }),
            favorite: record.favorite.toLowerCase() === 'yes',
            continent: record.continent,
            alpha: record.alpha,
            hockeyTeam: record.hockeyTeam,
            userTags: record.userTags
                .split(commaSeparatedValueRegex)
                .map(item => item.replace(/\"/, '')) // for some reason there is an extra set of parenthesis in the CSV file where 
                .filter(tag => tag.length)
        }

        if (typeof record.bitColor !== 'string') {
            fileMeta.bitColor = record.bitColor;
        }

        return fileMeta;

    })
}