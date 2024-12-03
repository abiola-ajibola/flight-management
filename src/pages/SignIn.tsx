import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Form, InputGroup } from "@/components/Form";
import { useUserProfileContext } from "@/contexts/auth/authContext";
import { auth } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { Control, FieldErrors, FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "zod";

type SigninFormValues = {
  email: string;
  password: string;
};

const formSchema = object({
  email: string().email({
    message: "Please enter a valid email address.",
  }),
  password: string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Signin() {
  const navigate = useNavigate();
  const { isSignedIn } = useUserProfileContext();
  if (isSignedIn) {
    navigate("/home");
  }
  const form = useForm<SigninFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(data: FieldValues) {
    console.log("submitting form");
    console.log({ data });
    const { status, data: responseData } = await auth.signin({
      email: data.email,
      password: data.password,
    });
    console.log({ status, responseData });
  }

  function onErrors(
    errors: FieldErrors<SigninFormValues>,
    e?: BaseSyntheticEvent
  ) {
    console.log("errors in form");
    console.log({ errors, e });
  }

  return (
    <div className="w-[350px] justify-self-center">
      <Card title="Sign in">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
            <div className="grid w-full items-center gap-4">
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
            </div>
            <div className="flex justify-center mt-4">
              <Button type="submit">Signin</Button>
            </div>
          </form>
        </Form>
        <h4 className="text-center mt-4">
          Don't have an account? <Link to="/signup">Register</Link>
        </h4>
      </Card>
    </div>
  );
}
