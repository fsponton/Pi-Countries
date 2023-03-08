import '../styles//Paging.css'
import React from "react";

const Paging = ({ pageNumbers, handleClick, selectedPage }) => {
    // console.log("pagging")
    // console.log(pageNumbers)
    // console.log(selectedPage)
    return (

        <>
            {pageNumbers?.map(number => {
                if (selectedPage === number) {
                    return (
                        < button className='btnPage btnActive btn btn-sm btn-outline-primary'
                            id={number}
                            key={number}
                            onClick={handleClick}
                        >
                            {number}
                        </button>
                    );
                }
                return (
                    < button className='btnPage btn btn-sm btn-outline-primary'
                        id={number}
                        key={number}
                        onClick={handleClick}
                    >
                        {number}
                    </button>
                );

            })
            }

        </>
    )
}


export default Paging;















