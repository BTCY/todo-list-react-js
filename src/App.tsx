import React from "react";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Layout from "./layout/Layout";
import TodoList from "./components/todo-list/TodoList";
import BlockWrapper from "./components/common/BlockWrapper";
import Logo from "./components/logo/Logo";


export default function App() {

    return (
        <Layout>

            <Header>
                <Logo />
            </Header>

            <Body>
                <BlockWrapper title={"List of tasks"}>
                    <TodoList />
                </BlockWrapper>
            </Body>

        </Layout>
    )
} 
