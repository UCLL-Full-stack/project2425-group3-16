import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Header from "@components/header";

import CoachService from "@services/CoachService"; // <-- Adjust your import paths
import GameService from "@services/GameService";    // <-- Adjust your import paths

import ScheduleForm from "@components/schedule/ScheduleForm";
// This is your updated form that expects { coach, game } rather than { lecturer, course }.

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CreateSchedule = () => {
    const router = useRouter();
    // Instead of "lecturerId" and "courseId", use "coachId" and "gameId"
    const { coachId, gameId } = router.query;

    // Fetch both the coach and the game simultaneously
    const fetcher = async (): Promise<{ coach: any; game: any } | undefined> => {
        try {
            const [coachResponse, gameResponse] = await Promise.all([
                CoachService.getCoachById(coachId as string),
                GameService.getGameById(gameId as string),
            ]);

            if (coachResponse.ok && gameResponse.ok) {
                const [coach, game] = await Promise.all([
                    coachResponse.json(),
                    gameResponse.json(),
                ]);
                return { coach, game };
            } else {
                // If either response is not OK, throw an error (or return undefined)
                throw new Error("Failed to fetch coach or game.");
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    // Use SWR to load the data
    const { data, isLoading, error } = useSWR("coachGame", fetcher);

    return (
        <>
            <Head>
                <title>Create a new schedule</title>
            </Head>
            <Header />

            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>Create a new schedule</h1>
                <section className="w-50">
                    {error && <p className="text-red-800">{error as string}</p>}
                    {isLoading && <p className="text-green-800">Loading...</p>}

                    {data && (
                        <ScheduleForm
                            coach={data.coach}
                            game={data.game}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default CreateSchedule;
