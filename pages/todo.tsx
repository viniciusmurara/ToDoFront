import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import CustomModal from "../components/CustomModal";

// Tipagem das colunas e itens
interface Item {
  id: string;
  content: string;
  status : string;

}

interface Column {
  name: string;
  items: Item[];
}

interface Columns {
  [key: string]: Column;
}

const TodoPage: React.FC = () => {
  const [columns, setColumns] = useState<Columns>({
    todo: {
      name: "A Fazer",
      items: [],
    },
    inProgress: {
      name: "Em Progresso",
      items: [],
    },
    done: {
      name: "Concluído",
      items: [],
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedTodo, setSelectedTodo] = useState<Item | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [todoContent, setTodoContent] = useState("");

  // Abrir modal para adicionar
  const handleOpenAddModal = () => {
    setModalType("add");
    setTodoContent("");
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEditModal = (item: Item, columnId: string) => {
    setModalType("edit");
    setSelectedTodo(item);
    setSelectedColumnId(columnId);
    setTodoContent(item.content);
    setIsModalOpen(true);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedColumnId(null);
    setTodoContent("");
  };

  // Adicionar novo To-Do
  const handleAddTodo = async () => {
    if (todoContent.trim() === "") return;

    try {
      const newItem: Item = { id: newId, content: todoContent,status : "A Fazer" };

      const response = await fetch(`http://localhost:8081/todos`,{
        method:"POST",
        headers:{
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
            texto : todoContent,
            status : "A Fazer",
            usuario : usuario
        })
      } )

      
      
    } catch (error) {
      
    }


    // const newId = (Math.random() * 1000).toFixed(0);

    // setColumns({
    //   ...columns,
    //   todo: {
    //     ...columns.todo,
    //     items: [...columns.todo.items, newItem],
    //   },
    // });

    handleCloseModal();
  };

  // Atualizar To-Do
  const handleUpdateTodo = () => {
    if (selectedTodo && selectedColumnId) {
      const updatedItems = columns[selectedColumnId].items.map((item) =>
        item.id === selectedTodo.id ? { ...item, content: todoContent } : item
      );

      setColumns({
        ...columns,
        [selectedColumnId]: {
          ...columns[selectedColumnId],
          items: updatedItems,
        },
      });
    }

    handleCloseModal();
  };

  // Remover To-Do
  const handleDeleteTodo = (columnId: string, itemId: string) => {
    const updatedItems = columns[columnId].items.filter((item) => item.id !== itemId);

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: updatedItems,
      },
    });

    handleCloseModal();
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center p-4 bg-gray-100 h-screen" style={{ height: "calc(100vh - 12.1vh)" }}>
        <h1 className="mb-20 text-2xl">KanBan To-Do</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-6">
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="bg-white rounded-lg shadow-md p-4 w-64">
                <h2 className="text-lg font-bold mb-4">{column.name}</h2>
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-2 rounded-lg ${snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"}`}
                    >
                      {column.items.length === 0 ? (
                        <p className="text-gray-400">Nenhum To-Do criado</p>
                      ) : (
                        column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-2 mb-2 bg-white rounded-lg shadow flex justify-between items-center ${snapshot.isDragging ? "bg-blue-100" : ""}`}
                                onClick={() => handleOpenEditModal(item, columnId)}
                              >
                                <span>{item.content}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTodo(columnId, item.id);
                                  }}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        {/* Botão de adicionar um To-Do */}
        <Button variant="contained" color="primary" onClick={handleOpenAddModal} sx={{ mt: 4 }}>
          Adicionar To-Do
        </Button>

        {/* Modal para adicionar/editar To-Do */}
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalType === "add" ? "Adicionar To-Do" : "Editar To-Do"}
          actions={
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={modalType === "add" ? handleAddTodo : handleUpdateTodo}
              >
                {modalType === "add" ? "Adicionar" : "Salvar"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={
                  modalType === "add"
                    ? handleCloseModal
                    : () => selectedTodo && selectedColumnId && handleDeleteTodo(selectedColumnId, selectedTodo.id)
                }
              >
                {modalType === "add" ? "Cancelar" : "Excluir"}
              </Button>
            </>
          }
        >
          <TextField
            fullWidth
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
            label="Conteúdo do To-Do"
            variant="outlined"
          />
        </CustomModal>
      </div>
    </>
  );
};

export default TodoPage;