import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User, Coach, Game } from "@types";

type Props = {
    coach: Coach;
};

const GameOverviewTable: React.FC<Props> = ({ coach }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("loggedInUser");
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <>
            {coach.games && (
                <table className="mt-4">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Home</th>
                        <th scope="col">Season</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {coach.games.map((game: Game, index: number) => (
                        <tr key={index}>
                            <td>{game.name}</td>
                            <td>{game.description}</td>
                            <td>{game.home ? "Yes" : "No"}</td>
                            <td>{game.season}</td>
                            <td>
                                <Link
                                    href={`/schedule/${coach.id}/${game.id}`}
                                    passHref
                                >
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800
                                 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Schedule
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default GameOverviewTable;
