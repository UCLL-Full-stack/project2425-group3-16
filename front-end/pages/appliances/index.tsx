import Head from "next/head";
import Header from "@components/header";
import React from "react";
import applianceService from '@services/applianceService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import ApplianceOverviewTable from '@components/appliances/applianceOverviewTable';
import { useRouter } from 'next/router';
import { Appliance } from '@types';
import * as assert from 'node:assert';

const ApplianceOverview: React.FC = () => {

    const router = useRouter();

    const getAllAppliances = async () => {
        const response = await  Promise.all([
            applianceService.getAllAppliances()
        ])

        const [applianceResponse] = response;
        const appliances = await applianceResponse.json();

        return {appliances}
    }

    const {data, isLoading, error} = useSWR('GetAllAppliances', getAllAppliances)

    useInterval(() => {
        mutate('GetAllAppliances', getAllAppliances())
    }, 30000)


    const handleAddMoreAppliances = () => {
        router.push('/appliances/addAppliance');
    }

    const handleInfoClick = (appliance: Appliance) => {
        console.log('Appliance Info:', appliance);
        router.push(`/appliances/${appliance.applianceId}`);
    };

    const handleDeleteClick = async (appliance: Appliance) => {
        console.log('Delete Appliance:', appliance);
        if (appliance.applianceId === undefined) {
            console.error('Appliance ID is missing');
            return;
        }
        const response = await applianceService.deleteAppliance({ id: appliance.applianceId });
        if(response.ok) {
            mutate('GetAllAppliances', getAllAppliances());
        }
    }

    return (
        <>
            <Head>
                <title>Appliance</title>
            </Head>
            <Header/>
            <main className="flex flex-col items-center justify-center pt-8 w-3/5 mx-auto">
                <h1 className="text-3xl font-bold mb-4">Appliance</h1>
                <div className="w-full flex justify-end mb-6">
                    <button className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleAddMoreAppliances}
                    >
                        + Add More Appliances
                    </button>
                </div>
                <section className="w-full">
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p>Loading....</p>}
                    {data && <ApplianceOverviewTable
                        appliances={data.appliances}
                        onInfoClick={handleInfoClick}
                        onDeleteClick={handleDeleteClick}
                    />}
                </section>
            </main>
        </>
    )
}
export default ApplianceOverview;