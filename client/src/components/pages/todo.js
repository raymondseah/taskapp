/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import taskAPI from "./../APIs/taskAPI";
import { withCookies, Cookies } from "react-cookie";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [user, setUser] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const getUserInfo = async () => {
        const token = readCookie("token");
        try {
          const res = await axios.get(
            "http://localhost:5000/api/v1/users/infor",
            {
              headers: { auth_token: token },
            }
          );
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
    getAllTasks();
    return () => (mounted = false);
  }, [tasks]);

  const getAllTasks = async () => {
    const token = readCookie("token");
    try {
      const res = await axios.get("http://localhost:5000/api/v1/tasks", {
        headers: { auth_token: token },
      });
      setTasks(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await taskAPI.editTask(id, task);
        alert(res.data.msg);
      } else {
        const res = await taskAPI.createTask(task, user);
        alert(res.data.msg);
      }
      setOnEdit(false);
    } catch (err) {
      alert(err.data.msg);
    }
  };

  const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const editTask = async (id, task) => {
    console.log(id);
    console.log(task);
    setID(id);
    setTask(task);
    setOnEdit(true);
  };

  const deleteTask = async (id) => {
    try {
      const res = await taskAPI.deleteTaskById(id);
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err);
    }
  };

  const handleCheck = async (id) => {
    const result = tasks.find((tasks) => tasks._id === id);
    result.completed = !result.completed;
    console.log(result);

    try {
      const res = await taskAPI.editTaskCompletion(id, result);

    } catch (err) {
      alert(err);
    }
  };

  return (
    <div id="create_to_do_page" className="">
      <div id="tasks_container">
        <form
          onSubmit={(e) => {
            createTask(e);
          }}
        >
          {/* <h1 htmlFor="name">{user.username}</h1> */}
          <h1 htmlFor="task">Tasks</h1>
          <input
            type="text"
            name="task"
            value={task}
            required
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        {tasks.map((task) => (
          <div
            id="todocontainer"
            className="text-dark text-center p-1 bg-light"
            key={task._id}
          >
            <input
              className="m-2 float-right"
              id={task._id}
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheck(task._id)}
            />
            <label className="strikethrough">{task.task}</label>
            <button
              className="btn btn-secondary"
              onClick={(e) => editTask(task._id, task.task)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={(e) => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(withCookies(Todo));
