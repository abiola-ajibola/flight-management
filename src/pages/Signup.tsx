import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Form, InputGroup } from "@/components/Form";
import { auth } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useState } from "react";
import { Control, FieldErrors, FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { object, string } from "zod";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  "confirm-password": string;
};

const formSchema = object({
  name: string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: string().email({
    message: "Please enter a valid email address.",
  }),
  password: string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  "confirm-password": string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data["confirm-password"], {
  message: "Passwords don't match",
  path: ["confirm-password"],
});

export function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      "confirm-password": "",
    },
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(data: FieldValues) {
    setIsLoading(true);
    console.log({ data });
    const { status, data: responseData } = await auth.register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    console.log({ status, responseData });
    if (data || data === undefined) {
      setIsLoading(false);
    }
  }

  function onErrors(
    errors: FieldErrors<SignupFormValues>,
    e?: BaseSyntheticEvent
  ) {
    console.log("errors in form");
    console.log({ errors, e });
  }

  return (
    <div className="w-[350px] justify-self-center">
      <Card title="Signup">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
            <div className="grid w-full items-center gap-4">
              <InputGroup
                id="name"
                name="name"
                label="Name"
                placeholder="Your name"
                control={form.control as unknown as Control<FieldValues>}
              />
              <InputGroup
                id="email"
                name="email"
                label="Email"
                placeholder="Your email address"
                control={form.control as unknown as Control<FieldValues>}
              />
              <InputGroup
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="A secure password"
                control={form.control as unknown as Control<FieldValues>}
              />
              <InputGroup
                id="confirm-password"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                control={form.control as unknown as Control<FieldValues>}
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button loading={isLoading} type="submit">
                Signup
              </Button>
            </div>
          </form>
        </Form>
        <h4 className="text-center mt-4">
          Already registered? <Link to="/signin">Sign in</Link>
        </h4>
      </Card>
    </div>
  );
}
