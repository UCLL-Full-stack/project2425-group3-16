const getGameById = (gameId: string) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const GameService = {
    getGameById,
};

export default GameService;
