import React from 'react';
import { Box, Button, IconButton, Grid } from '@material-ui/core';
import {VerticalAlignBottom, VerticalAlignTop} from '@material-ui/icons';
import { flexbox } from '@material-ui/system';

const styles = {
    Icon: {
      marginLeft: "auto"
    },
    Paper: {
      margin: "auto",
      padding: 10,
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      width: 500
    },
    MenuTodo: {
        padding: 10,
        margin: "0 auto",
        textAlign: "center",
        width: 500,
        "background-color": "transparent"
    }
};



function MenuToDo({showAllTask, showComplateTask, showUncomplateTask, sortByDate, sortByReversDate}) {
    return (
        <Box style={styles.MenuTodo}>
            <Button className="all" onClick={() => showAllTask()}>All</Button>
            <Button className="done" onClick={() => showComplateTask()}>Done</Button>
            <Button className="undone" onClick={() => showUncomplateTask()} style={{ marginRight: 90  }}>Undone</Button>
            <Box component="span" className="sort">Sort by Date</Box>
            <IconButton
                id="up"
                color="primary"
                aria-label="up bottom"
                style={styles.Icon}
                onClick={() => {}}
            >
                <VerticalAlignBottom fontSize="small" />
            </IconButton>

            <IconButton
                id="up"
                color="primary"
                aria-label="down bottom"
                style={styles.Icon}
                onClick={() => {}}
            >
                <VerticalAlignTop fontSize="small" />
            </IconButton>
        </Box>
    )
}

export default MenuToDo;