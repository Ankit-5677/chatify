import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext()
    
export const ChatContextProvider = ({children}) => {
    
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                };
            default:
                return state;
        };

    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

// const chatReducer = (state, action) => { ... }: Defines a reducer function to handle state updates based on actions.
// CHANGE_USER action: Updates the user and chatId based on the new user information. The chatId is calculated by concatenating the UIDs of the current user and the new user, ensuring a unique identifier.
// const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE): Creates a state using the useReducer hook with the defined reducer and initial state.
// This code establishes a context for managing chat-related state within a React application. 
// It uses a reducer to handle state updates based on actions. The chatId is calculated based 
// on the UIDs of the involved users to uniquely identify the chat. The context provider makes
//  the chat state and dispatch function available to child components through the ChatContext