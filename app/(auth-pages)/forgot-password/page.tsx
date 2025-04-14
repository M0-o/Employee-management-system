import * as Auth from "../imports"

export default async function ForgotPassword(props: {
  searchParams: Promise<Auth.Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Auth.Link className="text-primary underline" href="/sign-in">
              Sign in
            </Auth.Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Auth.Label htmlFor="email">Email</Auth.Label>
          <Auth.Input name="email" placeholder="you@example.com" required />
          <Auth.SubmitButton formAction={Auth.forgotPasswordAction}>
            Reset Password
          </Auth.SubmitButton>
          <Auth.FormMessage message={searchParams} />
        </div>
      </form>
      <Auth.SmtpMessage />
    </>
  );
}
