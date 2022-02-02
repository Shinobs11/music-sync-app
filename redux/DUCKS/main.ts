import { createReducer, createAction } from "@reduxjs/toolkit"

//schema for state to be based on
interface testType{
    test: number
}

//create testAction with number|undefined generic
export const testAction = createAction<number|undefined>("test");






//init state with testType schema
const initState = {
    test:0
} as testType


//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(testAction, (state, action)=>{
        if(action.payload){
            state.test+=action.payload
        }
    })
})





