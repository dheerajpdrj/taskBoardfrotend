import axios from "axios";

export const getAllTasks = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}task/gettasks`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (newTask) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}task/addtask`,
      newTask
    );
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (updatedTask) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}task/update-task`, {
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
