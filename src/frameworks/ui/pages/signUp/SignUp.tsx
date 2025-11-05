import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Card/card";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import AppLogo from "../../common/AppLogo";
import Container from "../../common/Container";

export default function Page() {
  return (
    <main className="bg-gradient-to-tr from-primary.dark via-black to-primary text-white">
      <Container className="flex min-h-screen justify-around">
        {/* Left Section */}
        <section className="hidden flex-col justify-between py-24 md:flex">
          <div className="flex items-center gap-2">
            <AppLogo />
            <p className="font-bold text-accent">Astra</p>
          </div>
          <h3 className="text-5xl font-bold leading-tight text-white">
            Build your <br /> project faster
          </h3>
        </section>

        {/* Sign-up Card */}
        <Card className="my-auto h-fit w-full max-w-md bg-white text-black shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-primary">Sign Up</CardTitle>
          </CardHeader>

          <CardContent>
            <SignUpForm />
          </CardContent>

          <CardFooter>
            <small className="mx-auto text-center text-neutral-200">
              Already have an account?
              <Link
                to="/login"
                className="ms-1 font-bold text-accent underline hover:text-primary.dark"
              >
                Login
              </Link>
            </small>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
}
