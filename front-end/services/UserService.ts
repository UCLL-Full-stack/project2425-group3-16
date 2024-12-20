import { User } from "@types";

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const signupUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/signup`, {
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
