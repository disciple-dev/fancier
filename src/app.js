import { loadData } from "./utils/load-csv.js";
import mapImageMetaData from './utils/map-data.js';
import applyImageFilters from './utils/filter-images.js';
import { getSearchParams } from './utils/get-params.js';

const searchParameters = getSearchParams();

const app = async function () {
    return await loadData()
        .then(data => applyImageFilters(data, searchParameters))
}

export default app;