import { toast } from "sonner";
import { useNavigate } from "react-router";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";

export function LogoutButton() {
  const [logout] = useLogoutMutation();
  const dispatch=useAppDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState())
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </Button>
  );
}
