"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-2xl">Hello World</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
