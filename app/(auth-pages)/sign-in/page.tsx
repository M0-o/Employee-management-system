import * as Auth from "../imports"

export default async function Login(props: { searchParams: Promise<Auth.Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Auth.Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Auth.Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Auth.Label htmlFor="email">Email</Auth.Label>
        <Auth.Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Auth.Label htmlFor="password">Password</Auth.Label>
          <Auth.Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Auth.Link>
        </div>
        <Auth.Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <Auth.SubmitButton pendingText="Signing In..." formAction={Auth.signInAction}>
          Sign in
        </Auth.SubmitButton>
        <Auth.FormMessage message={searchParams} />
      </div>
    </form>
  );
}
