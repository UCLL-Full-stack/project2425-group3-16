import React from 'react';
import { Appliance } from '@types';
import DateUtils from '../../utils/dateUtils';

type Props = {
    appliances: Array<Appliance>;
    onInfoClick: (appliance: Appliance) => void;
    onDeleteClick: (appliance: Appliance) => void;
};

const ApplianceOverviewTable: React.FC<Props> = ({ appliances, onInfoClick, onDeleteClick }: Props) => {
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated at</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody>
                {appliances.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-red-800">There are no appliances in the system currently</td>
                    </tr>
                ) : (
                    appliances.map((appliance, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{appliance.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{appliance.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{DateUtils.formatDateStringToEuropean(appliance.created_at?.toString())}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{DateUtils.formatDateStringToEuropean(appliance.updated_at?.toString())}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => onInfoClick(appliance)}
                                >
                                    Info
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => onDeleteClick(appliance)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </>
    );
};

export default ApplianceOverviewTable;