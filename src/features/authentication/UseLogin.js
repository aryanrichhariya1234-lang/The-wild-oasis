import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UseLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => Login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Could not login");
    },
  });
  return { isPending, login };
}

export default UseLogin;
