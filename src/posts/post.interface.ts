import { UserType } from "../users/user.interface";

export interface PostType {
    id: number;
    title: string;
    content: string;
    user: UserType;
}
