// abstract classes
// over-riding - override

enum State {
  QUEUE = "queue",
  DONE = "done",
  CANCEL = "cancel",
  TOP_LIST = "necessary",
  UPDATED = "updated",
}

type MessageType = {
  message: string;
};

type ToDoTypes = {
  title: string;
  id: number;
  state: State;
};

type ToDoTypesDTO = {
  title: string;
  state: State;
};
type result = ToDoTypes | MessageType;
interface IToDoRepFunctions {
  message: MessageType;
  CreateToDo(obj: ToDoTypesDTO): MessageType;
  DeleteToDo(id: number): MessageType;
  UpdateToDo(id: number, data: ToDoTypesDTO): MessageType;
  GetList(): ToDoTypes[];
  GetById(id: number): result;
}

abstract class ToDoRep implements IToDoRepFunctions {
  protected ToDos: ToDoTypes[];
  message: MessageType;
  constructor() {
    this.ToDos = [];
    this.message = { message: "" };
  }
  public CreateToDo(obj: ToDoTypesDTO): MessageType {
    return { message: "you added a new todo" };
  }
  public DeleteToDo(id: number): MessageType {
    return { message: "you deleted a todo" };
  }
  public UpdateToDo(id: number, data: ToDoTypesDTO): MessageType {
    return { message: "you updated an existed todo" };
  }
  public GetList(): ToDoTypes[] {
    return this.ToDos;
  }
  public GetById(id: number): result {
    return { message: "you get a todo by an id" };
  }
}
class ToDoController extends ToDoRep {
  constructor() {
    super();
  }
  public CreateToDo(obj: ToDoTypesDTO): MessageType {
    let checking = !!this.ToDos.find((todo) => todo.title === obj.title);
    if (!checking) {
      this.ToDos.push({
        id: this.ToDos.length + 1,
        state: obj.state,
        title: obj.title,
      });
      this.message.message = "you added a new todo";
    } else {
      this.message.message = "you had already added this todo!";
    }
    return this.message;
  }
  public DeleteToDo(id: number): MessageType {
    let checking = !!this.ToDos.find((todo) => todo.id === id);
    if (checking) {
      let newToDoList = this.ToDos.filter((todo) => todo.id !== id);
      this.ToDos = newToDoList;
      this.message.message = "you deleted a todo successfuly";
    } else {
      this.message.message = "there is no todo with this id .";
    }
    return this.message;
  }
  public UpdateToDo(id: number, data: ToDoTypesDTO): MessageType {
    let checking = !!this.ToDos.find((todo) => todo.id === id);
    if (checking) {
      this.ToDos.find((todo) => {
        if (todo.id === id) {
          todo.title = data.title;
          todo.state = data.state;
        }
      });
      this.message.message = "you updated the todo successfuly!";
    } else {
      this.message.message = "there is no todo with this id!";
    }
    return this.message;
  }
  public GetById(id: number): result {
    let checking = this.ToDos.find((todo) => todo.id === id);
    if (checking) {
      return checking;
    } else {
      return (this.message = { message: "there is no todo with this id!" });
    }
  }
}
let todo = new ToDoController();

todo.CreateToDo({
  state: State.TOP_LIST,
  title: "this is my first task for today!",
});

todo.CreateToDo({
  state: State.DONE,
  title: "this is my second task for today!",
});
todo.CreateToDo({
  state: State.CANCEL,
  title: "this is my third task for today!",
});
todo.CreateToDo({
  state: State.DONE,
  title: "this is my fourth task for today!",
});

todo.DeleteToDo(1);
todo.UpdateToDo(2, {
  state: State.UPDATED,
  title: "i updated this todo!",
});
console.log(todo.GetById(5));
console.log(todo.GetById(3));
console.log(todo.GetList());
