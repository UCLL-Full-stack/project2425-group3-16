import React from "react";
import Head from "next/head";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import AddAppliance from '@components/appliances/AddAppliance';
import applianceService from '@services/applianceService';
import { Appliance } from '@types';

type Props = {
    update: boolean;
    appliance?: Appliance;
};

const AddAppliancePage: React.FC<Props> = ({ update, appliance }) => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{update ? t('updateappliance') : t('addappliance')}</title>
            </Head>
            <Header />
            <main className="bg-gray-100 min-h-screen">
                <div className="container mx-auto flex justify-center items-center h-screen">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">{t(update ? 'updateappliance' : 'addappliance')}</h2>
                        <AddAppliance update={update} appliance={appliance} />
                    </div>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query } = context;
    const update = query.update === 'true';
    let appliance = null;

    if (update && query.applianceId) {
        const response = await applianceService.getApplianceById({ id: query.applianceId as string });
        appliance = await response.json();
    }

    return {
        props: {
            update,
            appliance,
        },
    };
};

export default AddAppliancePage;
