import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

export function Signup() {
  return (
    <div className="w-[350px] justify-self-center">
      <Card title="Signup"  >
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="A secure password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
