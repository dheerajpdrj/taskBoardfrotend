import React, { useEffect, useState } from "react";
import "./style.css";
import AddListModal from "./AddListModal";
import { addTask, getAllTasks, updateTask } from "../utils";

const List = () => {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await getAllTasks();
      setLists(response);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleCreateList = async (newList) => {
    try {
      const response = await addTask(newList);
      setLists([...lists, response]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const handleItemCompletion = async (listIndex, itemIndex, id) => {
    setChecked((prevChecked) => {
      const updatedChecked = { ...prevChecked };
      delete updatedChecked[`${listIndex}-${itemIndex}`];
      return updatedChecked;
    });

    const updatedLists = [...lists];
    updatedLists[listIndex].body.splice(itemIndex, 1);

    const data = updatedLists.filter((item) => item.id === id);
    await updateTask(data[0]);

    if (updatedLists[listIndex].body.every((item) => item.completed)) {
      updatedLists.splice(listIndex, 1);
    }
    setLists(updatedLists);
  };

  const isChecked = (listIndex, itemIndex) =>
    checked[`${listIndex}-${itemIndex}`] ?? false;

  const handleDragStart = (e, listIndex, itemIndex) => {
    e.dataTransfer.setData("listIndex", listIndex);
    e.dataTransfer.setData("itemIndex", itemIndex);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (e, targetListIndex) => {
    e.preventDefault();
    const sourceListIndex = e.dataTransfer.getData("listIndex");
    const sourceItemIndex = e.dataTransfer.getData("itemIndex");

    const updatedLists = [...lists];
    const itemToMove = updatedLists[sourceListIndex].body.splice(
      sourceItemIndex,
      1
    )[0];
    updatedLists[targetListIndex].body.push(itemToMove);

    try {
      // Update the source list
      await updateTask(updatedLists[sourceListIndex]);

      // Update the target list
      await updateTask(updatedLists[targetListIndex]);
    } catch (error) {
      console.error("Error updating lists:", error);
    }

    if (updatedLists[sourceListIndex].body.every((item) => item.completed)) {
      updatedLists.splice(sourceListIndex, 1);
    }

    setLists(updatedLists);
  };

  return (
    <>
      <div className="list-container">
        {lists.map((list, listIndex) => (
          <div
            className="list"
            key={listIndex}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, listIndex)}
          >
            <div className="list-header">{list.header}</div>
            <div className="list-body">
              {list.body.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  draggable
                  onDragStart={(e) => handleDragStart(e, listIndex, itemIndex)}
                  style={{ backgroundColor: "white" }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked(listIndex, itemIndex)}
                    onChange={() =>
                      handleItemCompletion(listIndex, itemIndex, list.id)
                    }
                  />
                  <span style={{ color: "black", marginLeft: "1rem" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="button-container">
          <div className="button-header">Create New List</div>
          <button
            className="circle-button"
            onClick={() => setShowModal(true)}
          ></button>
        </div>
      </div>
      {showModal && (
        <AddListModal
          onAddList={handleCreateList}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default List;
