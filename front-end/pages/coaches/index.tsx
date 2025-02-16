import Head from "next/head";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Header from "@components/header";
import CoachOverviewTable from "@components/coaches/CoachOverviewTable"; // <--- (Create or import your Coach table component)
import GameOverviewTable from "@components/games/gameOverviewTable";     // <--- (Create or import your Game table component)

import CoachService from "@services/CoachService"; // <--- (A service that fetches coaches)
import { Coach } from "@types";                    // <--- (Your Coach type)
import { Game } from "@types";                     // <--- (Your Game type)

/**
 * This page:
 * 1) Fetches all coaches from the backend
 * 2) Displays them in a table
 * 3) When a coach is selected, displays their associated games
 */
const Coaches: React.FC = () => {
    const { t } = useTranslation();
    const [coaches, setCoaches] = useState<Coach[]>();
    const [error, setError] = useState<string>();
    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

    /**
     * Fetch all coaches from the API
     */
    const getCoaches = async () => {
        setError("");

        const response = await CoachService.getAllCoaches();
        if (!response.ok) {
            // If unauthorized or other error
            const errorMessage =
                response.status === 401 ? t("error.unauthorized") : t("general.error");
            setError(errorMessage);
        } else {
            const data = await response.json();
            setCoaches(data);
        }
    };

    useEffect(() => {
        getCoaches();
    }, []);

    return (
        <>
            <Head>
                <title>{t("coaches.title")}</title>
            </Head>

            <Header />

            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>{t("coaches.title")}</h1>

                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {coaches && (
                        <CoachOverviewTable
                            coaches={coaches}
                            selectCoach={setSelectedCoach}
                        />
                    )}
                </section>

                {selectedCoach && (
                    <section className="mt-5">
                        <h2 className="text-center">
                            {t("coaches.gamesForCoach", {
                                name: selectedCoach.user?.firstName ?? "",
                            })}
                            {/* e.g. "Games coached by John" */}
                        </h2>
                        {/* Or just display them in a table */}
                        {selectedCoach.games && (
                            <GameOverviewTable coach={selectedCoach} />
                        )}
                    </section>
                )}
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

export default Coaches;
