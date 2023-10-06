import "./App.sass";

import TaskPage from "./pages/taskPage/TaskPage";
import { Flex, Text } from "@chakra-ui/react";

import ModalAddTask from "./components/modal/ModalAddTask";
import TaskSearch from "./components/taskSearch/TaskSearch";

function App() {
  return (
    <div className="App">
      <header className="app-Header">
        <Flex
          h={20}
          bg={"#32cd7b96"}
          color={"white"}
          fontSize={3 + "vw"}
          alignItems="center"
          w={"99%"}
          m={"5px auto"}
          border={"1px solid darkGreen"}
          borderRadius={30}
          width={100 + "%"}
          justifyContent="space-around">
          <Text mr={10}>Helper for project</Text>
          <TaskSearch />
          <ModalAddTask />
        </Flex>
      </header>
      <TaskPage />
    </div>
  );
}

export default App;

{
  /* <nav className="navigation">
        <ul className="list">
          <li className="list-item">
            <NavLink
              className={(navData) =>
                navData.isActive ? "list-item-active" : "list-item"
              }
              to="/ProJectPage">
              Projects
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink
              className={(navData) =>
                navData.isActive ? "list-item-active" : "list-item"
              }
              to="/TaskPage">
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <Routes>
          <Route path="/ProJectPage" element={<ProjectPage />} />
          <Route path="/TaskPage" element={<TaskPage />} />
        </Routes>
      </div> */
}

{
  /* <Box>
                  <List spacing={3}>
                                        
                  </List>
                  <Button>Add subtask</Button>
                </Box> */
}
