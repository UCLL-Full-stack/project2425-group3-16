import classNames from "classnames";
import dayjs from "dayjs";
import React, { useState } from "react";
import ScheduleService from "@services/ScheduleService";
import { Schedule, Player } from "@types"; // Adjust import paths
import { Coach } from "@types";            // If needed
import { Game } from "@types";             // If needed

type Props = {
    schedules: Schedule[]; // Each schedule has { game, coach, players }
    allPlayers: Player[];  // The list of all possible players to enroll
};

const ScheduleOverview: React.FC<Props> = ({ schedules, allPlayers }: Props) => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

    /**
     * Select a schedule row to see details and possible enrollment options.
     */
    const selectSchedule = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
    };

    /**
     * Enroll a player into the selected schedule
     */
    const handleEnroll = async (player: Player) => {
        if (!selectedSchedule?.id) return;

        // Call your API's enroll endpoint.
        // This method would be updated to handle "players" instead of "students".
        await ScheduleService.enrollPlayer(selectedSchedule, player);

        // Update local state
        if (!selectedSchedule.players) {
            selectedSchedule.players = [];
        }
        selectedSchedule.players.push(player);
    };

    return (
        <>
            {schedules && (
                <table className="mt-6">
                    <thead>
                    <tr>
                        <th scope="col">Game</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Coach</th>
                        <th scope="col">Enrolled Players</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((schedule, index) => (
                        <tr
                            key={index}
                            onClick={() => selectSchedule(schedule)}
                            className={classNames({
                                "table-active": selectedSchedule?.id === schedule.id
                            })}
                            role="button"
                        >
                            <td>{schedule.game?.name}</td>
                            <td>
                                {schedule.start
                                    ? dayjs(schedule.start).format("DD-MM-YYYY HH:mm")
                                    : ""}
                            </td>
                            <td>
                                {schedule.end
                                    ? dayjs(schedule.end).format("DD-MM-YYYY HH:mm")
                                    : ""}
                            </td>
                            <td>
                                {schedule.coach?.user
                                    ? schedule.coach.user.firstName +
                                    " " +
                                    schedule.coach.user.lastName
                                    : ""}
                            </td>
                            <td>{schedule.players ? schedule.players.length : 0}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedSchedule && (
                <section className="mt-5">
                    <h2 className="text-center">Players</h2>
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Player Number</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {allPlayers.map((player, index) => {
                            const isEnrolled = selectedSchedule.players?.some(
                                (p) => p.playerNumber === player.playerNumber
                            );

                            return (
                                <tr key={index}>
                                    <td>{player.user?.firstName}</td>
                                    <td>{player.user?.lastName}</td>
                                    <td>{player.playerNumber}</td>
                                    <td>
                                        {!isEnrolled && (
                                            <button
                                                className="text-white bg-blue-700 hover:bg-blue-800
                                     font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={() => handleEnroll(player)}
                                            >
                                                Enroll
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    );
};

export default ScheduleOverview;
