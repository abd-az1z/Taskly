import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase"; 
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

// Create a context for tasks
const TasksContext = createContext();

// Provider component
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({}); // Shared state for tasks

  const tasksCollection = collection(db, "tasks");

  // Real-time data listener
  useEffect(() => {
    const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
      const tasksData = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const dateKey = data.dateKey;
        if (!tasksData[dateKey]) tasksData[dateKey] = [];
        tasksData[dateKey].push({ id: doc.id, ...data });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Add task to Firestore
  const addTask = async (dateKey, task) => {
    if (!task) return;
    await addDoc(tasksCollection, { dateKey, task, completed: false });
  };

  // Delete task from Firestore
  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  // Update task in Firestore
  const updateTask = async (id, updates) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, updates);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};

// Hook to use the tasks context
export const useTasks = () => useContext(TasksContext);