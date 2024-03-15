export interface JsonUserResponse {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface JsonPostResponse {
    title: string;
    body: string;
    userId: number;
    id: number;
}
