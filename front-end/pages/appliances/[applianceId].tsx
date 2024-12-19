import React from "react";
import { useRouter } from "next/router";
import applianceService from "@services/applianceService";
import { Appliance } from "@types";
import Head from "next/head";
import ApplianceDetail from "@components/appliances/ApplianceDetail";
import Header from "@components/header";
import useSWR from 'swr';



const ApplianceDetailsPage: React.FC = () => {
    const router = useRouter();
    const { applianceId } = router.query;

    const fetchApplianceById = async (id: string) => {
        const response = await applianceService.getApplianceById({id: id});
        const appliance: Appliance = await response.json();
        return appliance;
    };

    const { data: appliance, isLoading, error } = useSWR(
        applianceId ? applianceId : null,
        () => fetchApplianceById(applianceId as string));

    const handleUpdateData = () => {
        router.push({
            pathname: '/appliances/addAppliance',
            query: { update: 'true', applianceId: applianceId }
        });
    };


    return (
        <>
            <Head>
                <title>Appliance Details</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center justify-start pt-8 w-3/5 mx-auto">
                <h1 className="text-3xl font-bold mb-4">
                    Details of {appliance?.name}
                </h1>
                <div className="w-full mb-6">
                    <div className="flex justify-between">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => router.back()}
                        >
                            Back
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleUpdateData}
                        >
                            Update Data
                        </button>
                    </div>
                </div>
                <section className="w-full">
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p>Loading....</p>}
                    {appliance && <ApplianceDetail appliance={appliance} />}
                </section>
            </main>
        </>
    );
};

export default ApplianceDetailsPage;