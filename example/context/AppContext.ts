import { DecisionMode, FlagshipStatus } from "@flagship.io/react-native-sdk"
import React, { Dispatch, SetStateAction } from "react"

export type AppState = {
    envId: string
    apiKey:string
    decisionMode?: DecisionMode
    timeout: number
    visitorData: {
      id?: string,
      context?: Record<string, any>,
      isAuthenticated?: boolean,
      hasConsented?: boolean
    },
    logs: string,
    status: FlagshipStatus
  }
  
  export type AppContext = {
    state: AppState
    setState?: Dispatch<SetStateAction<AppState>>;
  }
  export const defaultContext:AppContext = {
    state: {
      envId: "",
      apiKey:"",
      decisionMode: DecisionMode.DECISION_API,
      timeout: 2,
      visitorData: {
          hasConsented: true
      },
      logs:"",
      status: FlagshipStatus.NOT_INITIALIZED
    }
  }

  export const appContext = React.createContext<AppContext>(defaultContext);