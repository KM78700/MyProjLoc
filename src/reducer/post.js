//-- action POST
const post = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_PHOTO":
      return { ...state, photo: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };
    case "GET_POSTS":
      return { ...state, home: action.payload };
    default:
      return state;
  }
};

export default post;
