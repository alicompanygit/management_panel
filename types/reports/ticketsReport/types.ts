import ticketsReportTable from "~/components/reports/ticketsReport/index.vue";

export type TFilters = {
    board: number | null,
    times: number,
    date: {
        from: string,
        to: string,
    },
}
export type TConstantHeaders = {
    title: string,
    key: string,
    align?: string,
}
export type TDatePicker = {
    gregorian: {
        from: string,
        to: string,
    }
    jalali: {
        from: string,
        to: string,
    }
}
export type TSidebarItems = {
    title: string,
    items: [
        {
            icon: string,
            title: string,
            value: string,
            component: object,
            componentProps: {
                title: string,
                tableHeaders: TConstantHeaders
            }
            tableItems: object,
            activeValue: string,
        }[]
    ]
}[]

export type TViewMode = 'date' | 'users' | 'entrance' | 'subjects'

export type TReportRowKey =
    | 'index'
    | 'created_tickets'
    | 'total_closed'
    | 'rate'
    | 'avg_time_to_first_response'
    | 'avg_time_to_close'
    | 'date'
    | 'user_id'
    | 'communication_port'

export type TItemConfig = {
    icon: string
    titleKey: string
    mode: TViewMode
    header: { title: string; key: TReportRowKey; align: 'left' | 'center' | 'right' }[]
}

