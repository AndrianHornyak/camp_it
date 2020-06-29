const {
    isEmpty
} = require('lodash');
const moment = require('moment');

const date_filter = async (camps, start_date, end_date) => {
    if (isEmpty(start_date) && isEmpty(end_date)) {
        return camps
    }

    var filtered = []

    let promise = await Promise.all(
        camps.map(camp => {
            
            if (start_date && isEmpty(end_date)) {
                if (Date.parse(camp.start_date) >= moment(start_date, "DD.MM.YYYY").toDate()) {
                    filtered.push(camp);
                }
            }

            if (end_date && isEmpty(start_date)) {
                if (Date.parse(camp.end_date) <= moment(end_date, "DD.MM.YYYY").toDate()) {
                    filtered.push(camp);
                }
            }

            if (end_date && start_date) {
                if (Date.parse(camp.start_date) >= moment(start_date, "DD.MM.YYYY").toDate() 
                    && Date.parse(camp.end_date) <= moment(end_date, "DD.MM.YYYY").toDate()) {
                    filtered.push(camp);
                }
            }
        })
    )

    if (isEmpty(filtered)) {
        return null
    } else {
        return filtered;
    }
}

module.exports = {
    date_filter
}