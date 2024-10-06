import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex justify-center mt-4">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register with your username and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
