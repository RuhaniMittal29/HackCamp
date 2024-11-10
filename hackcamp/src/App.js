import Navbar from "./components/Navbar/navbar";

function App({customComponent: CustomCompoent}) {
  return (
    <div>
      <Navbar/>
      {CustomCompoent && <CustomCompoent/>}
    </div>
  );
}

export default App;
