import { UserResponse } from "./usersResponse";

export interface UserPaginationResponse {
    content:          UserResponse[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface User {
    id:       number;
    email:    string;
    name:     string;
    surname:  string;
    rol_id:   number;
    rol_name: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
