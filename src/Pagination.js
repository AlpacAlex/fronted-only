import React from "react";
import { useEffect } from "react";

function Pagination({page, getTodo, countTodoOnPage}) {

    // const todoShow = getTodo().filter( (todo) => todo.isShow === true)
    // const lenTodoShow = todoShow.length
    // function rangeShow() {
    //     const range = []
    //     let count = Math.trunc(lenTodoShow/countTodoOnPage)
    //     if (lenTodoShow % countTodoOnPage) 
    //     { 
    //         count += 1; 
    //     }
            
        
    //     for (let i = 0; i < count; i++) {
    //         const insiderange = []
    //         for (let j = i * countTodoOnPage; j < ((i+1) * countTodoOnPage); j++) {
    //             if (lenTodoShow <= j) break;
    //             insiderange.push(j)
    //         }
    //         range.push(insiderange)
    //     }
    //     return range
    // }
    
    return (
        <button>{page}</button>
    )
    
}

export default Pagination;