import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
      AppBar,
      Button,
      Container,
      Grid,
      IconButton,
      Paper,
      Toolbar,
      Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

export type ValuesFilterType = 'all' | 'active' | 'completed';
type TodolistType = {
      id: string;
      title: string;
      filter: ValuesFilterType;
};
type TasksStateType = {
      [key: string]: Array<TaskType>;
};

function App() {
      function removeTask(id: string, todolistId: string) {
            let tasks = tasksObj[todolistId];
            let filteredTasks = tasks.filter((t) => t.id !== id);
            tasksObj[todolistId] = filteredTasks;
            setTasks({ ...tasksObj });
      }

      function changeFilter(value: ValuesFilterType, todolistId: string) {
            let todolist = todolists.find((tl) => tl.id === todolistId);
            if (todolist) {
                  todolist.filter = value;
                  setTodolists([...todolists]);
            }
      }

      function addTask(title: string, todolistId: string) {
            let task = { id: v1(), title: title, isDone: false };
            let tasks = tasksObj[todolistId];
            let newTasks = [task, ...tasks];
            tasksObj[todolistId] = newTasks;
            setTasks({ ...tasksObj });
      }

      function changeStatus(
            taskId: string,
            isDone: boolean,
            todolistId: string
      ) {
            let tasks = tasksObj[todolistId];
            let task = tasks.find((t) => t.id === taskId);
            if (task) {
                  task.isDone = isDone;
                  setTasks({ ...tasksObj });
            }
      }

      let todolistId1 = v1();
      let todolistId2 = v1();

      let [todolists, setTodolists] = useState<Array<TodolistType>>([
            { id: todolistId1, title: 'What to do :', filter: 'all' },
            { id: todolistId2, title: 'What to learn :', filter: 'all' },
      ]);

      let [tasksObj, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                  { id: v1(), title: 'Go to school', isDone: false },
                  { id: v1(), title: 'Go to shop', isDone: true },
                  { id: v1(), title: 'Go to posyolok', isDone: true },
                  { id: v1(), title: 'Drink beer', isDone: false },
            ],
            [todolistId2]: [
                  { id: v1(), title: 'HTML', isDone: true },
                  { id: v1(), title: 'JS', isDone: false },
                  { id: v1(), title: 'React', isDone: false },
                  { id: v1(), title: 'Redux', isDone: true },
            ],
      });

      let removeTodolist = (todolistId: string) => {
            let filteredTodolist = todolists.filter(
                  (tl) => tl.id !== todolistId
            );
            setTodolists(filteredTodolist);

            delete tasksObj[todolistId];
            setTasks({ ...tasksObj });
      };

      function AddTodolist(title: string) {
            let todolist: TodolistType = {
                  id: v1(),
                  filter: 'all',
                  title: title,
            };
            setTodolists([todolist, ...todolists]);
            setTasks({ ...tasksObj, [todolist.id]: [] });
      }

      function changeTitleStatus(
            taskId: string,
            todolistId: string,
            newTitle: string
      ) {
            let tasks = tasksObj[todolistId];
            let task = tasks.find((tl) => tl.id === taskId);
            if (task) {
                  task.title = newTitle;
                  setTasks({ ...tasksObj });
            }
      }

      function changeTodolistTitle(todolistId: string, newTitle: string) {
            let changedTitleTodolist = todolists.find(
                  (tl) => tl.id === todolistId
            );
            if (changedTitleTodolist) {
                  changedTitleTodolist.title = newTitle;
                  setTodolists([...todolists]);
            }
      }

      return (
            <div className='App'>
                  <AppBar position='static'>
                        <Toolbar>
                              <IconButton
                                    size='large'
                                    edge='start'
                                    color='inherit'
                                    aria-label='menu'
                                    sx={{ mr: 2 }}
                              >
                                    <Menu />
                              </IconButton>
                              <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{ flexGrow: 1 }}
                              >
                                    News
                              </Typography>
                              <Button color='inherit'>Login</Button>
                        </Toolbar>
                  </AppBar>
                  <Container fixed style={{ padding: '20px' }}>
                        <Grid>
                              <AddItemForm addItem={AddTodolist} />
                        </Grid>
                        <Grid container spacing={5}>
                              {todolists.map((tl) => {
                                    let tasksForTodolist = tasksObj[tl.id];
                                    if (tl.filter === 'active') {
                                          tasksForTodolist =
                                                tasksForTodolist.filter(
                                                      (t) => t.isDone === false
                                                );
                                    }
                                    if (tl.filter === 'completed') {
                                          tasksForTodolist =
                                                tasksForTodolist.filter(
                                                      (t) => t.isDone === true
                                                );
                                    }
                                    return (
                                          <Grid item>
                                                <Paper elevation={3}>
                                                      <Todolist
                                                            title={tl.title}
                                                            tasks={
                                                                  tasksForTodolist
                                                            }
                                                            removeTask={
                                                                  removeTask
                                                            }
                                                            changeFilter={
                                                                  changeFilter
                                                            }
                                                            addTask={addTask}
                                                            changeTaskStatus={
                                                                  changeStatus
                                                            }
                                                            filter={tl.filter}
                                                            key={tl.id}
                                                            id={tl.id}
                                                            removeTodolist={
                                                                  removeTodolist
                                                            }
                                                            changeTitleStatus={
                                                                  changeTitleStatus
                                                            }
                                                            changeTodolistTitle={
                                                                  changeTodolistTitle
                                                            }
                                                      />
                                                </Paper>
                                          </Grid>
                                    );
                              })}
                        </Grid>
                  </Container>
            </div>
      );
}
export default App;
