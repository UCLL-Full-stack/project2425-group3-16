import { AuthenticationRequest, User } from "@types";

const loginUser = (auth: AuthenticationRequest) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
    });
};

const signupUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({ user })
    });
}

const UserService = {
    loginUser,
    signupUser
};

export default UserService;
