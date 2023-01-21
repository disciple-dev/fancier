import assert from 'node:assert/strict';
import { loadData } from '../utils/load-csv.js';

loadData().then(results => {
    assert.equal(results.length, 5);
})