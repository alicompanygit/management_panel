import { i18n } from "~/plugins/vue-i18n";

export type TTicketData = {
    id: string
    org_id: string
    user_id: string
    assigned_to: string
    subject: string
    description: string
    ticket_number: string
    board_id: number
    priority_id: number
    current_flow_step_id: number
    communication_port_id: number
    sla_id: number
    type_id: number
    sense_of_audience_id: number
    product: string
    tags: string
    is_delete: boolean
    is_close: boolean
    response_due_at: Date,
    creator: string,
    created_at: Date,
    modifier: string,
    update_at: Date,
}

type TTicketHeader = {
    title: string
    key: string
}
export type TPaginator = {
    page: number;
    itemsPerPage: number
}

export interface IMailBox {
    tickets: TTicketData[]
    ticketCount: number
    headers: TTicketHeader[]
    isFetching: boolean
    paginator: TPaginator

    setTickets(ticketList: TTicketData[]): void
    setIsFetching(state: boolean): void
    setPaginator(paginator: TPaginator): void
    setTicketCount(count: number): void
}

export class MailBox implements IMailBox {
    tickets: TTicketData[] = [];
    ticketCount: number = 0;
    headers: TTicketHeader[];
    isFetching: boolean = false;
    paginator: TPaginator = {
        page: 1,
        itemsPerPage: 10
    }

    constructor() {
        this.headers = [
            { title: 'ردیف', key: 'index' },
            { title: 'شماره تیکت', key: 'ticket_number' },
            { title: 'عنوان', key: 'subject' },
            { title: 'تاریخ ایجاد', key: 'created_at' },
            { title: 'تاریخ آخرین فعالیت', key: 'updated_at' },
            { title: 'وضعیت', key: 'current_flow_step_name' },
            { title: 'کارشناس پیگیری', key: 'assigned_to' },
            { title: 'مخاطب', key: 'user_id' },
            { title: 'اولویت', key: 'priority' },
            { title: 'درگاه ارتباطی', key: 'communication_port' },
            { title: 'نوع', key: 'ticket_type' },
            { title: 'توضیحات', key: 'description' },
            { title: 'عملیات', key: 'actions' },
        ]
    }

    setTickets(ticketList: TTicketData[]) {
        this.tickets = ticketList
    }
    setIsFetching(state: boolean) {
        this.isFetching = state
    }
    setPaginator(paginator: TPaginator) {
        this.paginator = paginator
    }
    setTicketCount(count: number) {
        this.ticketCount = count
    }
}

type TSelectType = { id: number, name: string }

type TTicketCreateForm = {
    subject: string
    user_id: string
    board_id: TSelectType | null
    current_flow_step_id: TSelectType | null
    assigned_to: string
    priority_id: TSelectType | null
    communication_port_id: TSelectType | null
    description: string
    type_id: TSelectType | null
    sense_of_audience_id: TSelectType | null
    product: string
    tags: string
    attachments_ids: string[]
}

export interface ITicketCreateForm {
    form: TTicketCreateForm

    isFetching: boolean
    isFormValid: boolean

    userList: TSelectType[]
    boardList: TSelectType[]
    stepList: TSelectType[]
    assignedToList: TSelectType[]
    priorityList: TSelectType[]
    communicationPortList: TSelectType[]
    typeList: TSelectType[]
    customerSense: TSelectType[]

    clearForm(): void
}

export class TicketCreateForm implements ITicketCreateForm {
    form: TTicketCreateForm = {
        subject: "",
        user_id: "",
        board_id: null,
        current_flow_step_id: null,
        assigned_to: "",
        priority_id: null,
        communication_port_id: null,
        description: "",
        type_id: null,
        sense_of_audience_id: null,
        product: "",
        tags: "",
        attachments_ids: []
    }

    isFetching: boolean = false
    isFormValid: boolean = false

    // for populating select inputs by id
    userList: TSelectType[] = []
    boardList: TSelectType[] = []
    assignedToList: TSelectType[] = []
    stepList: TSelectType[] = []
    priorityList: TSelectType[] = []
    communicationPortList: TSelectType[] = []
    typeList: TSelectType[] = []
    customerSense: TSelectType[] = []

    constructor() {

    }

    clearForm() {
        this.form = {
            subject: "",
            user_id: "",
            board_id: null,
            current_flow_step_id: null,
            assigned_to: "",
            priority_id: null,
            communication_port_id: null,
            description: "",
            type_id: null,
            sense_of_audience_id: null,
            product: "",
            tags: "",
            attachments_ids: []
        }
    }
}

export type TFormSelectType = {
    id: number
    type: string
    value: string
}


export type TBoard = {
    created_at: Date
    creator: string
    description: string
    id: number
    name: string
    orgId: string
}
export type TBoardState = {
    "id": number,
    "creator": string
    "board_id": number,
    "orders": number,
    "name": string
    "description": string
    "created_at": Date
    "tickets": null
}
export interface ITicketBoard {
    list: TBoard[]
    selectedBoard: TBoard | null
    states: TBoardState[]
    selectedState: TBoardState | null
}

export class TicketBoard implements ITicketBoard {
    list: TBoard[] = []
    selectedBoard: TBoard | null = null
    states: TBoardState[] = []
    selectedState: TBoardState | null = null

    constructor() {

    }
}

// ----------------------------------------------------------------------------- Ticket By Id

export interface ITicket {
    detail: TTicketData | null
    isFetching: boolean

    setIsFetching(state: boolean): void
    setDetail(ticket: TTicketData): void
}

export class Ticket {
    detail: TTicketData | null = null
    isFetching: boolean = false
    constructor() {
    }

    setIsFetching(state: boolean) {
        this.isFetching = state
    }
    setDetail(ticket: TTicketData) {
        this.detail = ticket
    }
}

// ----------------------------------------------------------------------------- Filters
export interface IFilter {
    // allParams: string
    priority_id: number
    assigned_to: string
    created_at: string
    updated_at: string
}

export class Filter implements IFilter {
    // allParams: string = ""
    priority_id: number = 0
    assigned_to: string = ""
    created_at: string = ""
    updated_at: string = ""
    constructor() {
    }
}

// ----------------------------------------------------------------------------- Components
export type TTicketAction = {
    id: number
    icon: string
    title: string
    action: () => void
}

export type TTicketActionTypes = 'call' | 'note' | 'task'