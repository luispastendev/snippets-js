
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

const registros = 50
const registrosPorPagina = 3
const paginaActual = 13
const separador = '...'
paginate(registros, registrosPorPagina, paginaActual, separador);

console.log("===================================")
console.log("===================================")
console.log("===================================")

