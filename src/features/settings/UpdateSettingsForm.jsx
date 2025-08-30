import Form from "../../ui/Form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { getSettings, updateSetting } from "../../services/apiSettings";

import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { data, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Successfully updated settings");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => toast.error("Cannot update settings"),
  });

  function handleUpdate(e, field) {
    mutate({ [field]: e.target.value });
  }
  if (isPending) return <Spinner />;
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = data;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
