import Papa from 'papaparse';

export function importSponsors(event) {
    return new Promise((resolve) => {
        Papa.parse(event.target.files[0], {
            complete: function (results) {
                console.log(results);
                resolve(results);
            },
        });
    });
}
