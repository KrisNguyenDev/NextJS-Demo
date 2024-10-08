import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex justify-center mt-4">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login with your username and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
