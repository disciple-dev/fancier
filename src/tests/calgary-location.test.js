import { calgary } from './fixtures/known-coords.js'
import assert from 'node:assert/strict';
import { loadData } from '../utils/load-csv.js';
import filterImages from '../utils/filter-images.js';

loadData().then(result => filterImages(result, { coordinates: calgary.boundary }))
    .then(results => {
        console.log(results)
        assert.strictEqual(results.length, 1)
    })