import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { Toaster } from "sonner";

function App() {
   return (
      <BrowserRouter>
         <Routes />
         <Toaster
            position={"top-right"}
            richColors
            duration={5000}
            closeButton
         />
      </BrowserRouter>
   );
}

export default App;
