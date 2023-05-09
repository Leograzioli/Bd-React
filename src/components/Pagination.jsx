import React from 'react'

export default function Pagination({ handleNextPage, handlePrevPage, currentPage, firstPage, lastPage }) {
    return (
        <div>
            <div className="flex justify-center items-center mt-8 pb-5" >
                <button disabled={currentPage === firstPage} onClick={() => handlePrevPage()} className={ currentPage === firstPage ? 'text-white bg-blue-200 py-1 px-3 rounded-md ml-3 mr-3' : 'ml-3 mr-3 cursor-pointer hover:scale-105 text-white bg-blue-500 py-1 px-3 rounded-md' }>Previous</button>
                {currentPage > firstPage && <div className="cursor-pointer hover:scale-125" onClick={() => handlePrevPage}>{currentPage - 1}</div>}
                <div className={currentPage === currentPage ? 'bg-blue-200 mx-2 px-1' : ''}>{currentPage}</div>
                {currentPage < lastPage && <div className="cursor-pointer hover:scale-125" onClick={() => handleNextPage()}>{currentPage + 1}</div>}
                <button disabled={currentPage == lastPage} onClick={() => handleNextPage()} className={ currentPage === lastPage ? ' text-white bg-blue-200 py-1 px-3 rounded-md ml-3' : 'ml-3 cursor-pointer hover:scale-105 text-white bg-blue-500 py-1 px-3 rounded-md' }>Next</button>
            </div >
        </div>
    )
}
