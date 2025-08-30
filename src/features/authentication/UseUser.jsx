import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

function UseUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return { user, isPending, isAuthenticated: user?.role === "authenticated" };
}

export default UseUser;
