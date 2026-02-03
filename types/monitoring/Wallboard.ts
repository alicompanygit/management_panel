export interface IWallboardState {
    asr: string,
    ivr: number,
    liveAgents: ILiveAgents,
    membersInQueue: number,
    freeChannels: number,
    outputSuccessCall: number,
    noAnswere: number,
    outputCall: IOutputCall | null,
    cancelCall: number
}

export interface IFilterData {
    from_date?: string | null,
    fromDate?: string | null,
    to_date?: string | null,
    toDate?: string | null,
    queue?: string | null,
    queueID?: string | null
}

export interface ILiveAgents {
    incoming: number,
    outgoing: number,
    intCnt?: number | null,
    extCnt?: number | null,
}

export interface IOutputCall {
    sumDuration: number,
    avgDuration: number,
    sumCost: number,
    count: number
}
