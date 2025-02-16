const getHeadersWithToken = () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    return loggedInUser ? JSON.parse(loggedInUser).token : null;
};

/**
 * GET /coaches
 */
const getAllCoaches = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getHeadersWithToken()}`,
        },
    });
};

/**
 * GET /coaches/:coachId
 */
const getCoachById = (coachId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${coachId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getHeadersWithToken()}`,
        },
    });
};

const CoachService = {
    getAllCoaches,
    getCoachById,
};

export default CoachService;
