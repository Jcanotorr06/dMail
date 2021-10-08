import { createContext } from "react";

export const StatusContext = createContext({
    status: {data:[], error:false, loading:false},
    setStatus: () => {},
    cookies: {email: null, name: null, provider: null},
    setCookie: () => {},
    removeCookie: () => {}
})
