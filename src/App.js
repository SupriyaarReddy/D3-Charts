import Card from "./components/Card";
import SpiderChart from "./components/SpiderGraph"
import SpiderRadius from "./components/SpiderRadius";
import Poll from "./components/Poll"


function App() {
  return (
    < >
      <div className="Div" style={{ display: "flex" }}>
      <Card width='34rem' height='30rem'>
       <SpiderChart />
      </Card>
      <Card width='34rem' height='30rem'>
        <SpiderRadius />
      </Card>
      </div>

      <div className="Div2">
      <Card width='35rem' height='30rem' marginleft='40rem'>
        <Poll/>
      </Card>
      </div>
   </>
  );
}

export default App;
