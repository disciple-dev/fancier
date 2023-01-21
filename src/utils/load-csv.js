import { readFile } from 'node:fs/promises';
import path from 'node:path'
import { parse } from 'csv-parse';
import mapData from './map-data.js';

const columns = ['filename', 'filetype', 'size', 'width', 'height', 'dpi', 'coordinates', 'favorite', 'continent', 'bitColor', 'alpha', 'hockeyTeam', 'userTags'];

export const loadData = async function (pathString = `data/image-library.csv`) {

    const csvFilePath = path.resolve(pathString);

    const fileContents = await readFile(csvFilePath, { encoding: 'utf8' })

    return new Promise((resolve, reject) => {
        parse(fileContents, { columns, from: 2, cast: true }, (err, records) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(mapData(records));
        })
    })
};
