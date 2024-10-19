"use client";

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout = ({ children }: SignInLayoutProps) => {
  return (
    <div className="flex flex-col">
      <nav className="h-10"></nav>
      {children}
    </div>
  );
};

export default SignInLayout;
