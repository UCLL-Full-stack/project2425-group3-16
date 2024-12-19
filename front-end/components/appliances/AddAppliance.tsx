import { useRouter } from 'next/router';
import React, { useState} from 'react';
import {Appliance, StatusMessage} from '@types';
import ApplianceService from '@services/applianceService';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type Props = {
    update: boolean;
    appliance?: Appliance;
};

const AddOrUpdateAppliance: React.FC<Props> = ({ update, appliance }) => {
    const [name, setName] = useState(appliance?.name || '');
    const [description, setDescription] = useState(appliance?.description || '');
    const [createdAt, setCreatedAt] = useState(appliance?.created_at || new Date());
    const [updatedAt, setUpdatedAt] = useState(appliance?.updated_at || new Date());

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const { t } = useTranslation();

    const clearErrors = () => {
        setStatusMessages([]);
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        if (!name || name.trim() === '') {
            setStatusMessages([{ message: 'The name field cannot be left empty', type: 'error' }]);
            result = false;
        }
        if (!description || description.trim() === '') {
            setStatusMessages([{ message: 'The description field cannot be left empty', type: 'error' }]);
            result = false;
        }
        return result;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
            return;
        }

        const applianceData = {
            name,
            description,
            created_at: createdAt,
            updated_at: update ? updatedAt : undefined,
        };

        if (update && appliance?.applianceId === undefined) {
            setStatusMessages([{ message: 'Appliance ID is missing for update', type: 'error' }]);
            return;
        }

        try {
            const response = update
                ? await ApplianceService.updateAppliance({ id: appliance!.applianceId!, applianceInput: applianceData })
                : await ApplianceService.createAppliance(applianceData);

            if (response.status === 201) {
                setStatusMessages([{ message: 'Success', type: 'success' }]);
                setTimeout(() => {
                    router.push('/appliances');
                }, 2000);
            } else {
                const { errorMessage } = await response.json();
                setStatusMessages([{ message: errorMessage, type: 'error' }]);
            }
        } catch (error) {
            console.error('Error during appliance creation:', error);
            setStatusMessages([{ message: 'Unexpected error occurred', type: 'error' }]);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">{t(update ? 'updateappliance' : 'addappliance')}</h3>
            {statusMessages.length > 0 && (
                <div className="mb-6">
                    <ul className="list-none">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-green-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nameInput" className="block text-sm font-medium mb-2">
                        {t('addappliance.name')}
                    </label>
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descriptionInput" className="block text-sm font-medium mb-2">
                        {t('addappliance.description')}
                    </label>
                    <input
                        id="descriptionInput"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateInput" className="block text-sm font-medium mb-2">
                        {t(update ? 'addappliance.updatedat' : 'addappliance.createdat')}
                    </label>
                    <input
                        id="dateInput"
                        type="text"
                        value={update ? new Date(updatedAt).toISOString().split('T')[0] : new Date(createdAt).toISOString().split('T')[0]}
                        readOnly
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none bg-gray-100"
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg focus:outline-none"
                    >
                        {t(update ? 'addappliance.update' : 'addappliance.add')}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg focus:outline-none mt-2"
                    >
                        {t('addappliance.cancel')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddOrUpdateAppliance;