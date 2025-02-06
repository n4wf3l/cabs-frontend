import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary">
      <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Taxi Time</h1>
          <p className="text-muted-foreground">
            Gérez votre flotte de taxis efficacement
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;