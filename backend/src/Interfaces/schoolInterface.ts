export interface ASchool {
    name: string;
    institute_id: string;
    status: number;
    created_by: string;
    created_at: string;
}
export interface USchool {
    _id: string;
    name: string;
    institute_id: string;
    status: number;
    updated_by: string;
    updated_at: string;
    user_id?: string;
}
