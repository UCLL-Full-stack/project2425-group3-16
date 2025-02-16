import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

import Header from "@components/header";
import ScheduleOverview from "@components/schedule/ScheduleOverview";
// Make sure this ScheduleOverview now displays { game, coach, players }
// instead of { course, lecturer, students }.

import ScheduleService from "@services/ScheduleService";
// Should return schedules with { game, coach, players }.
import PlayerService from "@services/PlayerService";
// Instead of StudentService, returning an array of players.

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Schedules: React.FC = () => {
    /**
     * Combine both schedules and players via Promise.all
     */
    const getSchedulesAndPlayers = async () => {
        const [ schedulesResponse, playersResponse ] = await Promise.all([
            ScheduleService.getSchedule(),
            PlayerService.getAllPlayers(),
        ]);

        if (schedulesResponse.ok && playersResponse.ok) {
            const schedules = await schedulesResponse.json();
            const players = await playersResponse.json();
            return { schedules, players };
        }

        // If there's an error, you could throw or return undefined.
        // SWR's 'error' will become truthy in the returned hook.
        throw new Error("Failed fetching schedules or players");
    };

    // useSWR key changed from "schedulesAndStudents" to "schedulesAndPlayers"
    const { data, isLoading, error } = useSWR("schedulesAndPlayers", getSchedulesAndPlayers);

    // Re-fetch every 1 second for live updates (optional)
    useInterval(() => {
        mutate("schedulesAndPlayers", getSchedulesAndPlayers());
    }, 1000);

    return (
        <>
            <Head>
                <title>Schedules</title>
            </Head>
            <Header />

            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>All Schedules</h1>

                {error && <div className="text-red-800">{error.message}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}

                {data && (
                    <ScheduleOverview
                        schedules={data.schedules}
                        players={data.players}
                    />
                )}
            </main>
        </>
    );
};

/**
 * i18n setup for SSR
 */
export const getServerSideProps = async (context: any) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Schedules;
