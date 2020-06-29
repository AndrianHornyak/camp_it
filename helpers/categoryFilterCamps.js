const {
    isEmpty,
    includes
} = require('lodash')

const category_Filter = async (camps, category) => {
    if (isEmpty(category)) {
        return camps
    }

    let data = []
    let promise = await Promise.all(
        camps.map(camp => {
            if (typeof (category) === "string") {
                category = category.trim().split()
            }
            category.map(item => {
                if (includes(camp.category, item)) {
                    data.push(camp),
                    filtered = data.reduce((arr, obj) => {
                        let index = arr.findIndex(({ _id }) => _id === obj._id);
                        if (index === -1) {
                            arr.push(obj);
                            return r;
                        }
                        return arr;
                    }, []);  
                }
            })
        })
    )

    if (isEmpty(filtered)) {
        return null
    } else {
        return filtered;
    }
}

module.exports = {
    category_Filter
}