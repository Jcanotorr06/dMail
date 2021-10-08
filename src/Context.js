import { createContext } from "react";

export const StatusContext = createContext({
    status: {data:[], error:false, loading:true},
    setStatus: () => {},
    cookies: {email: null, name: null, provider: null},
    setCookie: () => {},
    removeCookie: () => {}
})
