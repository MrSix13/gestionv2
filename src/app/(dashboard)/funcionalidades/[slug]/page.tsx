import { useCookie } from "@/hooks/use-user-cookie";

export default function PageMantenedor() {
  //   const { store } = useStore();
  const { store } = useCookie();
  console.log("sotre mantenedor:", store);

  return <div>page</div>;
}
