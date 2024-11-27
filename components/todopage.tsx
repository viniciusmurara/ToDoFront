import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Header from "./header";

// Tipagem das colunas e itens
interface Item {
  id: string;
  content: string;
}

interface Column {
  name: string;
  items: Item[];
}

interface Columns {
  [key: string]: Column;
}

const TodoPage: React.FC = () => {
  // Inicializando as colunas sem itens
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

  // Estados para exibir o input e armazenar o valor do novo ToDo
  const [showInput, setShowInput] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  // Lógica para adicionar um novo ToDo
  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; // Ignorar entradas vazias
    const newId = (Math.random() * 1000).toFixed(0); // Gerar ID único simples
    const newItem: Item = { id: newId, content: newTodo };

    // Adicionar o novo item à lista "todo"
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, newItem],
      },
    });

    // Limpar o input e esconder o campo
    setNewTodo("");
    setShowInput(false);
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
      <div className="flex flex-col justify-center items-center p-4 bg-gray-100 h-screen" style={{ height: 'calc(100vh - 12.1vh)' }}>
        <h1 className="mb-20 text-2xl">KanBan To-Do</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-6">
            {Object.entries(columns).map(([columnId, column], index) => (
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
                        <p className="text-gray-400">Nenhum To-Do ainda</p> // Exibe a mensagem caso não haja itens
                      ) : (
                        column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-2 mb-2 bg-white rounded-lg shadow ${snapshot.isDragging ? "bg-blue-100" : ""}`}
                              >
                                {item.content}
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
        <div className="my-6">
          {!showInput ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowInput(true)}
            >
              Adicionar To-Do
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Digite o novo To-Do"
                className="p-2 border border-gray-300 rounded w-64"
              />
              <div className="flex justify-between w-64">
                <button
                  onClick={handleAddTodo}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Adicionar
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setShowInput(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPage;