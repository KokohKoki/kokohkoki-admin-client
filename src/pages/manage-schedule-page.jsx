import { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../components/UI/content-wrapper";
import { getAllSchedules } from "../api/schedule-api";
import ScheduleItem from "../components/schedules/schedule-item";
import AddSchedule from "../components/schedules/add-schedule-modal";

export default function ManageSchedulePage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllSchedules();
      setSchedules(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const reFetchSchedule = () => {
    fetchSchedules();
  };

  return (
    <>
      <section id="schedule-section" className="section-wrapper">
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button className="bg-rose-500 text-white px-3 py-2.5 rounded-md" onClick={() => setIsOpen(true)}>
            Add Schedule
          </button>
        </div>
        <ContentWrapper loading={loading}>
          {schedules.map((schedule) => (
            <ScheduleItem key={schedule._id} {...schedule} reFetchSchedule={reFetchSchedule} />
          ))}
        </ContentWrapper>
      </section>
      <AddSchedule isOpen={isOpen} onAdd={reFetchSchedule} setIsOpen={setIsOpen} />
    </>
  );
}
