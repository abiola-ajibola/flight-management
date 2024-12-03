import { Link } from "react-router-dom";
import { flights, IFlightData, IFlightResponse } from "@/lib/api";
import { FlightCard } from "@/components/Card/FlightCard";
import { Pagination } from "@/components/Pagination";
import { useEffect, useState } from "react";
import { TFlightQuery } from "@/lib/api";
import { Input } from "@/components/Input";
import { Skeleton } from "@/components/Skeleton";
// import { sampleFLightsResponse } from "./sampleData";

const defaultQuery: TFlightQuery = {
  page: 1,
  size: 10,
  code: "",
};

export function Flights() {
  // const [flightsData, setFlightsData] = useState<IFlightData[]>(
  //   sampleFLightsResponse.resources
  // );
  const [flightsData, setFlightsData] = useState<IFlightData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<TFlightQuery>(defaultQuery);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      const { data, status } = await flights.get(defaultQuery);
      console.log({ data });
      if (status === 200 && data) {
        setCurrentPage(1);
        setTotal((data as IFlightResponse).total);
        setFlightsData((data as IFlightResponse).resources);
      }
      if (data || data === undefined) {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const { data, status } = await flights.deleteOne(id);
    if (status! >= 200 && status! < 300) {
      setFlightsData((flighData) =>
        flighData.filter((flight) => flight.id !== id)
      );
    }
    if (data || data === undefined) {
      setIsLoading(false);
    }
  };

  async function handlePageChange(page: number) {
    setIsLoading(true);
    const { data, status } = await flights.get({ ...query, page });
    console.log({ data });
    if (status === 200) {
      setCurrentPage(page);
      setFlightsData((data as IFlightResponse).resources);
    }
    setQuery((qry) => ({ ...qry, page }));
    if (data || data === undefined) {
      setIsLoading(false);
    }
  }

  async function handleSearch(value: string) {
    setIsLoading(true);
    const { data, status } = await flights.get({
      ...query,
      page: 1,
      code: value,
    });
    console.log({ data });
    if (status === 200 && (data as IFlightResponse)) {
      setCurrentPage(1);
      setFlightsData((data as IFlightResponse).resources);
      setTotal((data as IFlightResponse).total);
    }
    setQuery((qry) => ({ ...qry, page: 1, email: value }));
    if (data || data === undefined) {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl w-9/12 min-w-96">
      <h2 className="text-center">
        <Link to={"/flight"}>Add New Flight</Link>
      </h2>
      <h2 className="text-center my-6 font-bold">Flights</h2>
      <Input
        type="text"
        placeholder="Search by code"
        onBlur={(e) => handleSearch(e.target.value)}
        className="my-4"
      />
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="overflow-y-auto flex flex-col gap-4 max-h-[50vh] mb-4">
          {flightsData?.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onNext={() => handlePageChange(currentPage + 1)}
        onPrevious={() => handlePageChange(currentPage - 1)}
        onPageClick={handlePageChange}
        pages={Math.ceil(total / query.size)}
      />
    </div>
  );
}
