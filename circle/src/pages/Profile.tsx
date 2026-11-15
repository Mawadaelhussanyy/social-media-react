import { Button } from "@heroui/react";
import { useContext } from "react";
import { counterContext } from "../contexts/counterContext";

export default function Profile() {
  const { count, setCount } = useContext(counterContext);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        profile
      </h1>

      <h2>Counter: {count}</h2>

      <Button
        color="primary"
        onClick={() => setCount(count + 1)}
      >
        Add
      </Button>
    </div>
  );
}