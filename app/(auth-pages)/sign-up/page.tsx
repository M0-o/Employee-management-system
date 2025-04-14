import * as Auth from "../imports"

export default async function Signup(props: {
  searchParams: Promise<Auth.Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <Auth.FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Auth.Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Auth.Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Auth.Label htmlFor="email">Email</Auth.Label>
          <Auth.Input name="email" placeholder="you@example.com" required />
          <Auth.Label htmlFor="password">Password</Auth.Label>
          <Auth.Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <Auth.SubmitButton formAction={Auth.signUpAction} pendingText="Signing up...">
            Sign up
          </Auth.SubmitButton>
          <Auth.FormMessage message={searchParams} />
        </div>
      </form>
      <Auth.SmtpMessage />
    </>
  );
}
