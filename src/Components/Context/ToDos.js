import React from "react";
const todosContext = React.createContext({

add : () => {},
delete : () => {},
done : () => {},
edit : () => {}

})

export default todosContext;