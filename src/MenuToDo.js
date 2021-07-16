import React from 'react';
import { Box, Button, IconButton } from '@material-ui/core';
import {VerticalAlignBottom, VerticalAlignTop} from '@material-ui/icons';
import styles from "./myStyle";



function MenuToDo({showAllTask, showComplateTask, showUncomplateTask, sortByDate, sortByReversDate}) {
    return (
        <Box style={styles.MenuToDo.MenuTodo}>
            <Button className="all" onClick={() => showAllTask()}>All</Button>
            <Button className="done" onClick={() => showComplateTask()}>Done</Button>
            <Button className="undone" onClick={() => showUncomplateTask()} style={{ marginRight: 90  }}>Undone</Button>
            <Box component="span" className="sort">Sort by Date</Box>
            <IconButton
                id="up"
                color="primary"
                aria-label="up bottom"
                style={styles.MenuToDo.Icon}
                onClick={() => {sortByDate()}}
            >
                <VerticalAlignBottom fontSize="small" />
            </IconButton>

            <IconButton
                id="up"
                color="primary"
                aria-label="down bottom"
                style={styles.MenuToDo.Icon}
                onClick={() => {sortByReversDate()}}
            >
                <VerticalAlignTop fontSize="small" />
            </IconButton>
        </Box>
    )
}

export default MenuToDo;