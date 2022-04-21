import { IFlagshipLogManager, LogLevel } from "@flagship.io/react-native-sdk";
import { Dispatch, SetStateAction } from "react";
import { AppState } from "../context/AppContext";

export class CustomLogger implements IFlagshipLogManager {

    setState:Dispatch<SetStateAction<AppState>>
    constructor(setState: Dispatch<SetStateAction<AppState>>){
        this.setState = setState
    }
    emergency(message: string, tag: string): void {
        this.log(LogLevel.EMERGENCY, message, tag);
    }
    alert(message: string, tag: string): void {
        this.log(LogLevel.ALERT, message, tag);
    }
    critical(message: string, tag: string): void {
        this.log(LogLevel.CRITICAL, message, tag);
    }
    error(message: string, tag: string): void {
        this.log(LogLevel.ERROR, message, tag);
    }
    warning(message: string, tag: string): void {
        this.log(LogLevel.WARNING, message, tag);
    }
    notice(message: string, tag: string): void {
        this.log(LogLevel.NOTICE, message, tag);
    }
    info(message: string, tag: string): void {
        this.log(LogLevel.INFO, message, tag);
    }
    debug(message: string, tag: string): void {
        this.log(LogLevel.DEBUG, message, tag);
    }
    log(level: LogLevel, message: string, tag: string): void {
        const now = new Date()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getTwoDigit = (value: any) => {
          return value.toString().length === 1 ? `0${value}` : value
        }
    
        const out = `[${getTwoDigit(now.getFullYear())}-${
          getTwoDigit(
            now.getMonth()
          )
        }-${getTwoDigit(now.getDay())} ${
          getTwoDigit(
            now.getHours()
          )
        }:${getTwoDigit(now.getMinutes())}] [Flagship SDK] [${
          LogLevel[level]
        }] [${tag}] : ${message}`
        
        this.setState(prev => {
            let logs  = prev.logs;
            logs += out + "\n\n";
            return {
                ...prev,
                logs
            }
        })
    }

}