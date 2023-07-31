const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++ ){
    pages.push(i);
  }

  console.log(pages);

    return (
      <>
      {
          pages.map((page, index) => {
            return (
              <button
                key={index}
                className={page === currentPage ? "join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded active" : "join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
         })
      
      }
      </>
    );
}

export default Pagination;