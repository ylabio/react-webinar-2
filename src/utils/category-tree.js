
export function categoryTree(categories) {
    return categoriesTreeToLabels(categoriesToTree(categories));
}

function categoriesToTree(categories) {
    const tree = Object.fromEntries(
        categories.map((item) => [
            item._id,
            { ...item, parent_id: item.parent?._id, children: [] },
        ])
    );
    return Object.values(tree).filter(
        (item) => !tree[item.parent_id]?.children.push(item)
    );
}

function categoriesTreeToLabels(categories, prefix = "") {
    let res = [];
    categories.forEach((item) => {
        res = [
            ...res,
            { value: item._id, title: prefix + item.title },
            ...(item.children
                ? categoriesTreeToLabels(item.children, prefix + "- ")
                : {}),
        ];
    });
    return res;
}