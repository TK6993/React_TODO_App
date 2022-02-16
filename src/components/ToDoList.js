import React from 'react'
import ToDo from './ToDo'
import { useState, useEffect } from 'react'


const ToDoList = () => {

    const [opencount, countOpenTodos] = useState(0);
    const [stateTodo, setTodos] = useState(()=>{
        const items = localStorage.getItem("toDoItems");
        const parsed = JSON.parse(items);
        return parsed || [];
    });

    const [getTodoInput, setTodoInput] = useState("");

    const changeInputText =(e) =>{
        setTodoInput(e.target.value);
    }

    const countOpen =() =>{
        const notdonetodos = stateTodo.filter((item) =>{
            return !item.done
        })
        countOpenTodos(notdonetodos.length)
    }

    const changeTodo = (index) =>{
        const newTodoState = [...stateTodo];
        if(newTodoState[index].done){
            newTodoState[index].done = false;
        }else{
            newTodoState[index].done =true;
        }
        setTodos(newTodoState);
    }

    const deleteTodo = (index) =>{
        const newTodoState = [...stateTodo];
        newTodoState.splice(index,1);
        setTodos(newTodoState);
    }



    const submitForm = (e) =>{
        const newTodoState = [...stateTodo, {name: getTodoInput, done: false }];
        e.preventDefault();
        setTodos(newTodoState);
        setTodoInput("");

    }

    useEffect(() =>{
      countOpen(); 
      localStorage.setItem("toDoItems",JSON.stringify(stateTodo)); 
    }, [stateTodo]);

  return (
    <div className='shadow-sm hover:shadow-lg'>

        <h1 className='text-center bg-gray-900 text-white text-3xl py-2 font-semibold'>Things to do:</h1>
        <h2 className='text-center bg-gray-900 text-white  '>Offene Todos: {opencount}</h2>
        <form className='grid grid-cols-3 py-2 px-2 bg-gray-400'>
            <input onChange={changeInputText} value={getTodoInput} type="text" placeholder='New Todo' className='col-span-2 py-2 text-gray-900'  ></input>
            <input onClick={submitForm} type="submit" value="Add Dodo" className='col-span-1 text-gray-800 cursor-pointer'></input>
        </form>
        {stateTodo.map((item, index) =>{
            return <ToDo
                name={item.name}
                done={item.done} 
                key ={index} 
                index ={index}
                onChangeTodo={changeTodo} 
                onDeleteTodo={deleteTodo}>
                 </ToDo>
        })}
    </div>
  )
}

export default ToDoList