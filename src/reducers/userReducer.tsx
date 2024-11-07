import { UserInterface } from "../interfaces/User";

type State = {
  users: UserInterface[];
};
type Action =
  | { type: "SET_USERS"; payload: UserInterface[] }

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
   
    default:
      return state;
  }
};

export default userReducer;
