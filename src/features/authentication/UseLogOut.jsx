import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function UseLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}

export default UseLogOut;
