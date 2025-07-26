import { FilterQuery, Query } from 'mongoose';
import { AppError } from './appError';

class APIFeatures<T> {
    constructor(
        public query: Query<T[], T>,
        private queryString: Record<string, any>
    ) { }

    filter(): this {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr) as Query<T[], T>);
        return this;
    }

    sort(): this {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // Default sorting
        }
        return this;
    }

    limitFields(): this {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); // Exclude version field by default
        }
        return this;
    }

    paginate(): this {
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 100;
        const skip = (page - 1) * limit;

        // Validate pagination parameters
        if (page < 1) {
            throw AppError.badRequest('Page number must be greater than 0');
        }
        if (limit < 1) {
            throw AppError.badRequest('Limit must be greater than 0');
        }
        if (limit > 1000) {
            throw AppError.badRequest('Limit cannot exceed 1000');
        }

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    // Advanced features
    search(fields: string[]): this {
        if (this.queryString.search) {
            const searchTerm = this.queryString.search;
            const searchQuery = {
                $or: fields.map(field => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                }))
            };
            this.query = this.query.find(searchQuery as FilterQuery<T>);
        }
        return this;
    }

    populate(options: {
        path: string;
        select?: string;
        model?: string;
        match?: Record<string, any>;
    }): this {
        this.query = this.query.populate(options);
        return this;
    }
}

export default APIFeatures;