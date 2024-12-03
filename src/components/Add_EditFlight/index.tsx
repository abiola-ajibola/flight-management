import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Form, InputGroup } from "@/components/Form";
import { FlightFormValues, flights, IFlightData } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Control, FieldErrors, FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { coerce, number, object, preprocess, string } from "zod";
const sampleData = {
  id: "e9890ca4-2bac-4e5b-b614-732176270bad",
  img: "https://robohash.org/e9890ca4-2bac-4e5b-b614-732176270bad/?size=200x200",
  status: "none",
  code: "AbcDef",
  capacity: 50,
  departureDate: "2020-10-23",
};
const formSchema = object({
  code: string().min(2, {
    message: "Flight code must be at least 2 characters.",
  }),
  capacity: preprocess(
    (val) => parseInt(string().parse(val), 10),
    number()
      .min(10, {
        message: "Capacity must be at least 10",
      })
      .max(1000, {
        message: "Capacity must be at most 1000",
      })
  ),
  departureDate: coerce.date().min(new Date(), {
    message: "Departure date must be now or in the future",
  }),
});

export function AddOrEditFlight() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id?: string }>();
  const isEdit = !!params.id;
  const form = useForm<FlightFormValues>({
    defaultValues: {
      code: "",
      capacity: 0,
      departureDate: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!isEdit) {
      return;
    }
    setIsLoading(true);
    const fetchFlight = async () => {
      const { data, status } = await flights.getOne(params.id!);
      if (status! >= 200 && status! < 300) {
        form.reset(sampleData as IFlightData);
      }
      if (data || data === undefined) {
        setIsLoading(false);
      }
    };
    fetchFlight();
  }, [form, isEdit, params.id]);

  async function onSubmit(_data: FieldValues, e?: BaseSyntheticEvent) {
    setIsLoading(true);
    const { status, data: responseData } = isEdit
      ? await flights.update(new FormData(e?.target as HTMLFormElement))
      : await flights.create(new FormData(e?.target as HTMLFormElement));
    if (status! >= 200 && status! < 300) {
      form.reset();
      console.log({ status, responseData });
    }
    if (responseData || responseData === undefined) {
      setIsLoading(false);
    }
  }

  function onErrors(
    errors: FieldErrors<FlightFormValues>,
    e?: BaseSyntheticEvent
  ) {
    console.log("errors in form");
    console.log({ errors, e });
  }

  return (
    <div className="w-[350px] justify-self-center">
      <Card title={isEdit ? "Edit Flight" : "Add New Flight"}>
        <Form {...form}>
          <form
            encType="multipart/form-data"
            onSubmit={form.handleSubmit(onSubmit, onErrors)}
          >
            <div className="grid w-full items-center gap-4">
              <InputGroup
                id="code"
                name="code"
                label="Code"
                placeholder="Code of the flight"
                control={form.control as unknown as Control<FieldValues>}
              />
              <InputGroup
                id="capacity"
                name="capacity"
                label="Capacity"
                placeholder="Capacity of the flight"
                type="number"
                min={0}
                control={form.control as unknown as Control<FieldValues>}
              />
              <InputGroup
                id="departureDate"
                name="departureDate"
                label="Date of departure"
                type="date"
                placeholder="Date of departure"
                control={form.control as unknown as Control<FieldValues>}
              />
              <InputGroup
                id="photo"
                name="photo"
                label="Photo"
                type="file"
                accept="image/*"
                placeholder="Select an image"
                control={form.control as unknown as Control<FieldValues>}
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button disabled={isLoading} type="submit" loading={isLoading}>
                {isEdit ? "Edit Flight" : "Add Flight"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
