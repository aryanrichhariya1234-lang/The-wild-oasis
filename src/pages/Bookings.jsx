import { useQuery, useQueryClient } from "@tanstack/react-query";
import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getBookings } from "../services/apiBookings";
import Spinner from "../ui/Spinner";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useSearchParams } from "react-router-dom";

function Bookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, value] = sortBy.split("-");
  const sortByWithD = { field, value };
  const filterValue = searchParams.get("status");
  const status =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, isPending } = useQuery({
    queryKey: ["bookings", status, sortByWithD, currentPage],
    queryFn: () => getBookings({ sortByWithD, status, currentPage }),
    keepPreviousData: true,
  });
  queryClient.prefetchQuery({
    queryKey: ["bookings", status, sortByWithD, currentPage + 1],
    queryFn: () =>
      getBookings({ sortByWithD, status, currentPage: currentPage + 1 }),
  });
  if (isPending) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable bookings={bookings} count={count} />
    </>
  );
}

export default Bookings;
