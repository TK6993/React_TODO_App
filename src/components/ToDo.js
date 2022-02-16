import React from 'react';
import { useState } from 'react'

function ToDo({name,done, onChangeTodo, onDeleteTodo, index}) {

  return (
    <div>
        <div
            className={
            done ? "flex justify-between items-center p-2 bg-green-300"
                : "flex justify-between items-center p-2 bg-red-300"
            }
        >
            <h2 className='text-lg cursor-pointer' onClick=
                {
                    () => {onChangeTodo(index)}
                }>
                {name}
            </h2>
            <button className='text-lg bg-gray-400 p-2 text-white ' onClick=
                {
                    () => {onDeleteTodo(index)}
                }>
                Löschen
            </button>
        </div>   
    </div>
  )
}

export default ToDo