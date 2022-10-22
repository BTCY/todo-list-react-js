import React from "react";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Layout from "./layout/Layout";
import TodoList from "./components/todo-list/TodoList";
import BlockWrapper from "./components/common/BlockWrapper";
import Logo from "./components/logo/Logo";
import Footer from "./layout/Footer";
import Copyright from "./components/copyright/Copyright";


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

            <Footer>
                <Copyright />
            </Footer>

        </Layout>
    )
} 
