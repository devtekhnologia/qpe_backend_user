export interface Data {
    class_id: string;
    section_id: string;
    subject_ids: string[]; // Change from string to string[]
    school_id: string;
    status: number;
    created_by: string;
    created_at: string;
    user_id?: string
}