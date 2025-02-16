import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ScheduleService from '@services/ScheduleService';
import { Game, Coach } from '@types';

type Props = {
  coach: Coach;
  game: Game;
};

const ScheduleForm = ({ coach, game }: Props) => {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  /**
   * Basic client-side validation:
   * 1. Both start and end are required
   * 2. start <= end
   */
  const validate = () => {
    let valid = true;
    setErrors([]);

    if (!start) {
      setErrors((prev) => [...prev, 'Start date is required.']);
      valid = false;
    }
    if (!end) {
      setErrors((prev) => [...prev, 'End date is required.']);
      valid = false;
    }
    if (start && end && start > end) {
      setErrors((prev) => [...prev, 'Start date must be before end date.']);
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');

    if (!validate()) {
      return;
    }

    // Build schedule object
    const schedule = {
      start,
      end,
      game,
      coach,
      players: [],
    };

    // Send to API
    const response = await ScheduleService.createSchedule(schedule);
    const data = await response.json();

    if (!response.ok) {
      // Some error came back from the server
      setErrors((prev) => [...prev, data.message]);
    } else {
      // Success
      setStatus('Schedule created successfully.');
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          {!!errors.length && (
              <ul className="text-red-800 rounded-lg" role="alert">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
              </ul>
          )}
          {status && (
              <p className="text-green-800" role="alert">
                {status}
              </p>
          )}
        </div>

        {/* Display selected Game */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium">Game:</label>
          <div>
            <input
                type="text"
                value={game?.name ?? ''}
                disabled
                className="border border-gray-300 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500
                       block w-full p-2.5"
            />
          </div>
        </div>

        {/* Display selected Coach */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium">Coach:</label>
          <div>
            <input
                type="text"
                value={
                  coach?.user
                      ? `${coach.user.firstName ?? ''} ${coach.user.lastName ?? ''}`
                      : ''
                }
                disabled
                className="border border-gray-300 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500
                       block w-full p-2.5"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium">Start Date:</label>
          <DatePicker
              selected={start}
              onChange={(date) => setStart(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy HH:mm"
              timeFormat="HH:mm"
              className="border border-gray-300 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500
                     block w-full p-2.5"
          />
        </div>

        {/* End Date */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium">End Date:</label>
          <DatePicker
              selected={end}
              onChange={(date) => setEnd(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy HH:mm"
              timeFormat="HH:mm"
              className="border border-gray-300 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500
                     block w-full p-2.5"
          />
        </div>

        {/* Submit */}
        <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create Schedule
        </button>
      </form>
  );
};

export default ScheduleForm;
