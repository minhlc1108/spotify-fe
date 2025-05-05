export interface AuthLogin {
	identifier: string;
	password: string;
}

export interface User {
	id: number;
	username: string;
	email: string;
}

export interface AuthLoginResponse {
	access: string;
	refresh: string;
	user: User;
}

export interface AuthRegister {
	username: string;
	email: string;
	password: string;
	rePassword: string;
}
