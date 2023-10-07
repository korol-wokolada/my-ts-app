import "./App.sass";

import TaskPage from "./pages/taskPage/TaskPage";
import { Flex, Text } from "@chakra-ui/react";

import ModalAddTask from "./components/modal/ModalAddTask";
import TaskSearch from "./components/taskSearch/TaskSearch";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/projectPage/ProjectPage";
import { NavLink } from "react-router-dom";

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
          <NavLink to="my-ts-app/*">
            <Text fontSize={2 + "vw"}>Project</Text>
          </NavLink>
          <NavLink to="my-ts-app/taskPage">
            <Text fontSize={2 + "vw"}>Task</Text>
          </NavLink>
        </Flex>
      </header>
      <Routes>
        <Route path="/*" element={<ProjectPage />} />
        <Route path="/taskPage" element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
