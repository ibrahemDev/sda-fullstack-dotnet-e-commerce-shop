/**
 * Represents a category of products.
 */
export interface Category {
  /**
   * Unique identifier for the category. (Potentially redundant, consider removing if not used)
   * @deprecated
   */
  _categoryId: string;

  /**
   * Unique identifier for the category.
   */
  categoryId: string;

  /**
   * Name of the category.
   */
  name: string;

  /**
   * Description of the category.
   */
  description: string;

  /**
   * List of products associated with this category. (Ideally should be Product[])
   * @deprecated
   */
  productEntityList?: any;
}

/**
 * Represents a product.
 */
export interface Product {
  /**
   * Unique identifier for the product.
   */
  productId: string;

  /**
   * Name of the product.
   */
  name: string;

  /**
   * Price of the product.
   */
  price: number;

  /**
   * Available stock of the product.
   */
  stock: number;

  /**
   * Optional description of the product.
   */
  description?: string;

  /**
   * List of categories this product belongs to.
   */
  categoryList?: Category[];

  /**
   * Potentially redundant, consider using categoryList instead. (Ideally should be Category[])
   * @deprecated 
   */
  productCategoryList?: any;
}

/**
 * Represents the response model for a single product request.
 */
export type singleProductModel = {
  /**
   * Indicates if the request was successful.
   */
  success: boolean;

  /**
   * Contains any message related to the request.
   */
  message: null | string;

  /**
   * Contains the fetched product data.
   */
  data: Product;
};

/**
 * Represents the response model for a list of products request.
 * @template T - The type of items in the product list.
 */
export interface ProductModel<T> {
  /**
   * Indicates if the request was successful.
   */
  success: boolean;

  /**
   * Contains any message related to the request.
   */
  message: null | string;

  /**
   * Contains data related to the fetched products.
   */
  data: {
    /**
     * List of fetched products.
     */
    items: T;

    /**
     * Total count of products matching the request.
     */
    totalCount: number;

    /**
     * Current page number of the fetched products.
     */
    pageNumber: number;

    /**
     * Number of items per page in the fetched products.
     */
    pageSize: number;

    /**
     * Total number of pages based on pageSize and totalCount.
     */
    totalPages: number;
  };
}

/**
 * Data transfer object for creating a new category.
 */
export type CreateCategoryDto = {
  /**
   * Name of the category.
   */
  name: string;

  /**
   * Description of the category.
   */
  description: string;
};

/**
 * Data transfer object for creating a new product.
 */
export type CreateProductDto = {
  /**
   * Name of the product.
   */
  name: string;

  /**
   * Price of the product.
   */
  price: number;

  /**
   * Available stock of the product.
   */
  stock: number;

  /**
   * Description of the product.
   */
  description: string;

  /**
   * List of categories this product belongs to.
   */
  categoryList: CreateCategoryDto[];
};
