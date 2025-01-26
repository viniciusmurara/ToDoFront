import React, { use, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import CustomModal from "../components/CustomModal";
import { getCookie, setCookie } from "cookies-next";


const BASE_URL = 'http://localhost:8081/'

// Tipagem das colunas e itens
interface Item {
  id: string;
  text: string;
  status: string;

}

interface Column {
  name: string;
  items: Item[];
}

interface Columns {
  [key: string]: Column;
}
type User = {
  id: number;
  nome: string;
  email: string;
  role: string;
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
  const [user, setUser] = useState<User>();


  useEffect(() => {
    try {
      const usuarioCookie = getCookie("Usuario")
      if (typeof usuarioCookie === 'string') {
        const usuario: User = JSON.parse(usuarioCookie)
        setUser(usuario);
      }


    } catch (err) {
      console.log(err);

    }
  }, [])
  useEffect(() => {
    if (user) {
      showTodo()
    }
  }, [user])


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
    setTodoContent(item.text);
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
      // const newItem: Item = { id: newId, content: todoContent,status : "A Fazer" };
      if (typeof user !== 'undefined') {

        const response = await fetch(`http://localhost:8081/todos`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            texto: todoContent,
            status: "todo",
            idUsuario: user.id
          })
        })
        const data: Item = await response.json();

        setColumns((prevColumns) => ({
          ...prevColumns,
          todo: {
            ...prevColumns.todo,
            items: [...prevColumns.todo.items, data]
          }
        }))

      }
    }
    catch (error) {
      console.log(error);

    }

    handleCloseModal();
  };
  const handleLoadingTasks = async () => {

    try {

      const response = await fetch(`http://localhost:8081/todos/${user?.id}`)

      const data: Item[] = await response.json();

      return data;

    }
    catch (error) {
      console.log(error);
    }

  }


  const showTodo = async () => {


    const tasks = await handleLoadingTasks();

    if (Array.isArray(tasks)) {
      tasks?.forEach(task => {

        if (task.status === 'todo') {
          setColumns((prevColumns) => ({
            ...prevColumns,
            todo: {
              ...prevColumns.todo,
              items: [...prevColumns.todo.items, task],
            },
          }));
        }
        else if (task.status === 'inProgress') {
          setColumns( (prevColumns) => ({
            ...prevColumns,
            inProgress: {
              ...prevColumns.inProgress,
              items: [...prevColumns.inProgress.items, task],
            },
          }));
        }
        else if (task.status === 'done') {
          setColumns( (prevColumns) => ({
            ...prevColumns,
            done: {
              ...prevColumns.done,
              items: [...prevColumns.done.items, task],
            },
          }));
        }
      })


    }
  }

  // Atualizar To-Do
  const handleUpdateTodo = () => {
    if (selectedTodo && selectedColumnId) {
      const updatedItems = columns[selectedColumnId].items.map((item) =>
        item.id === selectedTodo.id ? { ...item, text: todoContent } : item
      );

      atualizarTextoTodo(selectedTodo,todoContent)

      setColumns( (prevColumns) => ({
        ...prevColumns,
        [selectedColumnId]: {
          ...prevColumns[selectedColumnId],
          items: updatedItems,
        },
      }));
    }

    handleCloseModal();
  };
  const atualizarTextoTodo = async (todo : Item, todoContent : string) => {

    try {

      await fetch(`${BASE_URL}todos`, {
        method : 'PUT',
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id : todo.id,
          status : todo.status,
          texto : todoContent,
          usuario : user
        })
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  // Remover To-Do
  const handleDeleteTodo = async (columnId: string, itemId: string) => {

    try {
      await fetch(`${BASE_URL}todos/${itemId}`, {
        method: 'Delete'
      })


      const updatedItems = columns[columnId].items.filter((item) => item.id !== itemId);

      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          items: updatedItems,
        },
      });

    } catch (error) {
      console.log(error)
    }



    handleCloseModal();
  };






  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);



      removed.status = destination.droppableId;


      destItems.splice(destination.index, 0, removed);

      console.log(removed)

      await updateStatus(removed)

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

  const updateStatus = async (item: Item) => {

    try {


      await fetch(`${BASE_URL}todos`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: item.id,
          texto: item.text,
          status: item.status,
          usuario: user
        })
      })

    } catch (error) {
      console.log(error)
    }

  }

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
                          <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-2 mb-2 bg-white rounded-lg shadow flex justify-between items-center ${snapshot.isDragging ? "bg-blue-100" : ""}`}
                                onClick={() => handleOpenEditModal(item, columnId)}
                              >
                                <span className="text-black">{item.text}</span>
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