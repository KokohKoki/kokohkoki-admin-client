import { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../components/UI/content-wrapper";
import { getAllTypes } from "../api/type-api";
import TypeItem from "../components/type/type-item";
import AddType from "../components/type/add-type";

export default function ManageTypePage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  console.log(types);

  const fetchTypes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllTypes();
      setTypes(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const reFetchTypes = () => {
    fetchTypes();
  };

  return (
    <>
      <section id="type-section" className="section-wrapper">
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button className="bg-rose-500 text-white px-3 py-2.5 rounded-md">Add Type</button>
        </div>
        <ContentWrapper loading={loading}>
          {types.map((type) => (
            <TypeItem key={type._id} {...type} />
          ))}
        </ContentWrapper>
      </section>
      <AddType isOpen={isOpen} setIsOpen={setIsOpen} onAdd={reFetchTypes} />
    </>
  );
}