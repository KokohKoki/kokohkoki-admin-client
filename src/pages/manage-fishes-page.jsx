import { useCallback, useEffect, useState } from "react";
import { getAllFishes } from "../api/fish-api";
import ContentWrapper from "../components/UI/content-wrapper";
import FishItem from "../components/fish/fish-item";
import SearchFish from "../components/fish/search-fish";
import AddFish from "../components/fish/add-fish-modal";
import { getAllTypes } from "../api/type-api";
import FishPagination from "../components/fish/fish-pagination";
import { getAllEvents } from "../api/event-api";

export default function ManageFishPage() {
  const [fishes, setFishes] = useState([]);
  const [types, setTypes] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const [searchQuery, setSearchQuery] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
  };

  const filteredFishes = fishes.filter((fish) => fish.name.toLowerCase().includes(searchQuery) || fish.type.toLowerCase().includes(searchQuery));
  const totalPages = Math.ceil(filteredFishes.length / ITEMS_PER_PAGE);
  const currentFishes = filteredFishes.slice(indexOfFirstItem, indexOfLastItem);

  const fetchFishes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllFishes();
      const types = await getAllTypes();
      const eventList = await getAllEvents();
      setFishes(data.data.reverse());
      setTypes(types.data);
      setEventList(eventList.data);
    } catch (error) {
      console.error("Failed to fetch fishes or types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFishes();
  }, [fetchFishes]);

  const reFetchFishes = () => {
    fetchFishes();
  };

  return (
    <>
      <section id="fish-section" className="section-wrapper">
        <h1 className="text-rose-500 text-2xl font-bold mb-6">Manage Fishes</h1>
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button className="bg-rose-500 text-white px-3 py-2.5 rounded-md" onClick={() => setIsOpen(true)}>
            Add Fish
          </button>
          <SearchFish onSearch={handleSearch} />
        </div>
        <FishPagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
        <ContentWrapper loading={loading}>
          {currentFishes.map((fish) => (
            <FishItem key={fish._id} {...fish} reFetchFishes={reFetchFishes} typesData={types} eventList={eventList} />
          ))}
        </ContentWrapper>
      </section>
      <AddFish isOpen={isOpen} setIsOpen={setIsOpen} types={types} onAdd={reFetchFishes} eventList={eventList} />
    </>
  );
}
