import React from "react";
import { Appliance } from "@types";

type Props = {
    appliance: Appliance;
};

const ApplianceDetail: React.FC<Props> = ({ appliance }: Props) => {
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Key</th>
                    <th className="py-2 px-4 border-b">Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="py-2 px-4 border-b">Name</td>
                    <td className="py-2 px-4 border-b">{appliance.name}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Description</td>
                    <td className="py-2 px-4 border-b">{appliance.description}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Created At</td>
                    <td className="py-2 px-4 border-b">{new Date(appliance.created_at).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td className="py-2 px-4 border-b">Updated At</td>
                    <td className="py-2 px-4 border-b">{appliance.updated_at ? new Date(appliance.updated_at).toLocaleDateString() : "N/A"}</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default ApplianceDetail;