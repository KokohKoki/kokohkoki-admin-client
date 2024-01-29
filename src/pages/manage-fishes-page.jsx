import { useCallback, useEffect, useState } from "react";
import { getAllFishes } from "../api/fish-api";
import ContentWrapper from "../components/UI/content-wrapper";
import FishItem from "../components/fish/fish-item";
import SearchFish from "../components/fish/search-fish";
import AddFish from "../components/fish/add-fish";

export default function ManageFishPage() {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(fishes);

  const fetchFishes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllFishes();
      setFishes(data.data);
    } catch (error) {
      console.error("Failed to fetch fishes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFishes();
  }, [fetchFishes]);

  return (
    <section className="section-wrapper">
      <div className="flex flex-wrap justify-between items-center mb-3">
        <AddFish />
        <SearchFish />
      </div>
      <ContentWrapper loading={loading}>
        {fishes.map((fish) => (
          <FishItem key={fish._id} {...fish} />
        ))}
      </ContentWrapper>
    </section>
  );
}
