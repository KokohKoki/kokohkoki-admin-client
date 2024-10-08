/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getAllFishes } from "../api/fish-api";
import ContentWrapper from "../components/UI/content-wrapper";
import FishItem from "../components/fish/fish-item";
import SearchFish from "../components/fish/search-fish";
import AddFish from "../components/fish/add-fish-modal";
import { getAllTypes } from "../api/type-api";
import FishPagination from "../components/fish/fish-pagination";
import { getAllEvents } from "../api/event-api";
import SortFishes from "../components/fish/sorting-fishes";

export default function ManageFishPage() {
  const [fishes, setFishes] = useState([]);
  const [types, setTypes] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFishes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllFishes(currentPage, itemsPerPage);
      setFishes(data.data.fish);
      setTotalPages(data.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch fishes or types:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

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

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEvents();
      setEventList(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchFishes();
  }, [fetchFishes]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
  };

  const filteredFishes = fishes.filter(
    (fish) =>
      fish.name.toLowerCase().includes(searchQuery) ||
      fish.type.toLowerCase().includes(searchQuery)
  );

  const currentFishes = filteredFishes.slice(0, itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const reFetchFishes = () => {
    fetchFishes();
    fetchTypes();
    fetchEvents();
  };

  return (
    <>
      <section id="fish-section" className="section-wrapper">
        <h1 className="text-rose-500 text-2xl font-bold mb-6">Manage Fishes</h1>
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button
            className="bg-rose-500 text-white px-3 py-2.5 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            Add Fish
          </button>
          <SearchFish onSearch={handleSearch} />
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <FishPagination
            totalPages={totalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
          <SortFishes
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </div>
        <ContentWrapper loading={loading}>
          {currentFishes.map((fish) => (
            <FishItem
              key={fish._id}
              {...fish}
              reFetchFishes={reFetchFishes}
              typesData={types}
              eventList={eventList}
            />
          ))}
        </ContentWrapper>
      </section>
      <AddFish
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        types={types}
        onAdd={reFetchFishes}
        eventList={eventList}
      />
    </>
  );
}
