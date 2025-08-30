import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import UseLogOut from "./UseLogOut";
import Spinner from "../../ui/Spinner";

function LogOut() {
  const { logout, isLoading } = UseLogOut();
  if (isLoading) return <Spinner />;
  return (
    <ButtonIcon onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default LogOut;
