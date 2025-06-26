module.exports = function paginatedResponse({ data, total, page, limit }) {
  const totalPages = Math.ceil(total / limit);

  return {
    page: {
      totalPages,
      totalElements: total,
      currentPage: page,
      firstPage: 1,
      nextPage: page < totalPages ? page + 1 : null,
      lastPage: totalPages,
      previousPage: page > 1 ? page - 1 : null
    },
     content: data
  };
};
