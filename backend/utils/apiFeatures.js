class APIFeatures {
    constructor(query, queryString) {
        this.query = query; // Mongoose query object
        this.queryString = queryString; // req.query object
    }

    filter() {
        const queryObj = { ...this.queryString }; // Create a copy of req.query
        const excludedFields = ['page', 'sort', 'limit', 'fields']; // Fields to exclude from filtering
        excludedFields.forEach(el => delete queryObj[el]); // Remove excluded fields

        // Advanced filtering (e.g., gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // Replace with MongoDB operators

        this.query = this.query.find(JSON.parse(queryStr)); // Apply the filter
        return this; // Return the APIFeatures object for chaining
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' '); // Handle multiple sort fields
            this.query = this.query.sort(sortBy); // Apply the sort
        } else {
            this.query = this.query.sort('-createdAt'); // Default sort by createdAt (descending)
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' '); // Handle multiple fields
            this.query = this.query.select(fields); // Apply the field limiting
        } else {
            this.query = this.query.select('-__v'); // Exclude the __v field by default
        }
        return this;
    }

    paginate() {
        const page = parseInt(this.queryString.page) || 1; // Default page is 1
        const limit = parseInt(this.queryString.limit) || 10; // Default limit is 10
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        this.query = this.query.skip(skip).limit(limit); // Apply pagination

        this.page = page;
        this.limit = limit;
        return this;
    }
}

module.exports = APIFeatures;