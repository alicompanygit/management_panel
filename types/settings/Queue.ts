export interface IQueueState {
    queues: IQueue[];
    agents: any[];
    tiers: any[];
}
export interface IQueue {
    CallCenter_queue_uuid: string;
    Queue_name: string;
    Queue_extension: string,
    Queue_strategy: string,
    Queue_max_wait_time: string,
    Queue_max_wait_time_with_no_agent: string,
    Queue_max_wait_time_with_no_agnet_time_reached: string,
    Queue_timeout_action: string,
    Queue_description: string,
    Queue_enable_recording: string,
    Queue_caller_id: string,
    Queue_enable_rating: string,
    Queue_moh_sound: string,
    Queue_cc_exit_keys: string,
    Queue_cc_exit_Data: string,
    Queue_enable_announce_position: string,
    Queue_wait_avg_per_member: string
}