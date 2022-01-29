
const paginate = (totalRows, totalRowsPerPage, currentPage, wildcard) => {
  const totalPages = Math.ceil(totalRows / totalRowsPerPage) 
  const pagination = [];
  
  if (currentPage > totalPages || currentPage < 1) {
    throw new Error('invalid current page.')
  }
  
  if (totalPages <= 1) {
    return [];
  } 
  // FIRST PAGE
  currentPage == 1 || pagination.push(1);
  
  // PREV WILDCARD AND PREV
  const prev = currentPage - 1 > 1 ? currentPage - 1 : null
  if (prev) {
    prev - 1 > 1 && pagination.push(wildcard);
    pagination.push(prev)
  }
  
  // PREV WILDCARD AND PREV ELEMENT
  pagination.push(`${currentPage}`)

  // NEXT WILDCARD AND NEXT ELEMENT
  const next = currentPage + 1 < totalPages ? currentPage + 1 : null
  if (next) {
    pagination.push(next)
    next + 1 < totalPages && pagination.push(wildcard);
  }
  
  // LAST PAGE
  currentPage === totalPages || pagination.push(totalPages);
 
  return pagination;
}

// < 1 [2] >      
// < 1 [2] 3 ... 5>      
// < 1 ... 9 [10] 11 >      
// < 1 [2] 3 ... 11 >       
// < 1 ... 3 [4] 5 ... 11 > 

console.log("============ PAGINANDO ============")
paginate(50, 4, 5, '...');
console.log("===================================")

