export default function (records) {
    return records.map(record => {
        const fileMeta = {
            filename: record.filename,
            filetype: record.filetype,
            size: record.size,
            width: record.width,
            height: record.height,
            dpi: record.dpi,
            coordinates: record.coordinates.split(', ').map(coord => Number(coord)),
            favorite: record.favorite.toLowerCase() === 'yes',
            continent: record.continent,
            alpha: record.alpha,
            hockeyTeam: record.hockeyTeam,
            userTags: record.userTags.split(', ').map(item => item.replace(/\"/, ''))
        }

        if (typeof record.bitColor !== 'string') {
            fileMeta.bitColor = record.bitColor;
        }

        return fileMeta;

    })
}