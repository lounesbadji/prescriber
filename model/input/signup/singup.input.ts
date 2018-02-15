export interface SignupInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    picture: string;
    role: 'visitor'|'doctor';
    sex: 'male'|'female';
}
