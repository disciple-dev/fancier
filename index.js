import app from './src/app.js'

app()
    .then(results => {
        console.log(results);
    })
    .catch(err => {
        console.error(err);
    })