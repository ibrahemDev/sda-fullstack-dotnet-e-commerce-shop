// Category interface for API responses
export interface Category {
    _categoryId: string;
    categoryId: string;
    name: string;
    description: string;
}

// Pagination metadata for API responses
export interface Pagination {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

// API response for getting all categories
export interface GetAllCategoriesResponse {
    success: boolean;
    message: string | null;
    data: {
        items: Category[];
        totalCount: number;
        pageNumber: number;
        pageSize: number;
        totalPages: number;
    };
}

// DTO for creating or updating a category
export interface CreateOrUpdateCategoryDto {
    name: string;
    description: string;
}

// API response for creating or updating a category
export interface CreateOrUpdateCategoryResponse {
    _categoryId: string;
    categoryId: string;
    name: string;
    description: string;
}
