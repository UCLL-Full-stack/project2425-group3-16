import React from "react";
import { Coach } from "@types";  // or wherever your Coach type is defined
import { useTranslation } from "next-i18next";

type Props = {
    coaches: Coach[];
    selectCoach: (coach: Coach) => void;
};

const CoachOverviewTable: React.FC<Props> = ({ coaches, selectCoach }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            {coaches && (
                <table className="text-left">
                    <thead>
                    <tr>
                        <th scope="col">{t("coaches.coachOverviewTable.firstname")}</th>
                        <th scope="col">{t("coaches.coachOverviewTable.lastname")}</th>
                        <th scope="col">{t("coaches.coachOverviewTable.email")}</th>
                        <th scope="col">{t("coaches.coachOverviewTable.expertise")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coaches.map((coach, index) => (
                        <tr
                            key={index}
                            onClick={() => selectCoach(coach)}
                            role="button"
                        >
                            {/* Safely access coach.user fields via optional chaining */}
                            <td>{coach.user?.firstName}</td>
                            <td>{coach.user?.lastName}</td>
                            <td>{coach.user?.email}</td>
                            <td>{coach.expertise}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CoachOverviewTable;
