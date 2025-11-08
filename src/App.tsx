import React from "react";
import { Button } from "@heroui/react";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-5xl font-bold text-red-500">
          Welcome to the eBook Frontend
        </h1>
        <Button variant="solid" onPress={() => alert("HeroUI is working!")}>
          Test HeroUI Button
        </Button>
      </header>
    </div>
  );
};

export default App;
