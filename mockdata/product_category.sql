INSERT INTO product_category (category_id, product_id)
SELECT
    category_id,
    product_id
FROM
    (SELECT
        category_id,
        product_id,
        ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY RANDOM()) AS rn
    FROM
        category
    CROSS JOIN
        product) AS sub
WHERE
    rn <= 1 
ON CONFLICT DO NOTHING; 