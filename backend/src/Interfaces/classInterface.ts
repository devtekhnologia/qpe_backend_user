export interface AClassname {
    name: string;
    school_id: string;
    status: number;
    created_by: string;
    created_at: string;
}
export interface UClassname {
    _id: string;
    name: string;
    school_id: string;
    status: number;
    updated_by: string;
    updated_at: string;
    user_id?: string;
}
