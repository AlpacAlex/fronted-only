import React from 'react';

function MenuToDo({showAllTask, showComplateTask, showUncomplateTask, sortByDate, sortByReversDate}) {
    return (
        <div id="buttons_and_sort">
            <button className="all" onClick={() => showAllTask()}>All</button>
            <button className="done" onClick={() => showComplateTask()}>Done</button>
            <button className="undone" onClick={() => showUncomplateTask()}>Undone</button>
            <span className="sort">Sort by Date</span>
            <img id="up" onClick={() => sortByDate()} src="https://img.icons8.com/ios-glyphs/30/000000/arrow.png"/>
            <img id="down" onClick={() => sortByReversDate()} src="https://img.icons8.com/ios-glyphs/30/000000/arrow.png"/>
        </div>
    )
}

export default MenuToDo;