const {
    isEmpty
} = require('lodash');

const date_filter = async (camps, start_date, end_date) => {

    if (isEmpty(start_date) && isEmpty(end_date)) {
        return camps
    }

    var filtered = []

    let promise = await Promise.all(
        camps.map(camp => {

            if (start_date && isEmpty(end_date)) {
                if (Date.parse(camp.start_date) >= Date.parse(start_date)) {
                    filtered.push(camp);
                }
            }

            if (end_date && isEmpty(start_date)) {
                if (Date.parse(camp.end_date) <= Date.parse(end_date)) {
                    console.log("in")
                    filtered.push(camp);
                }
            }

            if (end_date && start_date) {
                if (Date.parse(camp.start_date) >= Date.parse(start_date) && Date.parse(camp.end_date) <= Date.parse(end_date)) {
                    filtered.push(camp);
                }
            }
        })
    )

    if (isEmpty(filtered)) {
        return null
        // return camps
    } else {
        console.log("4")
        return filtered;
    }
}

module.exports = {
    date_filter
}