import WalletButton from "./components/WalletButton";
import Staking from "./pages/Staking";

function App() {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>StakeVerse Protocol</h1>

      <p>
        Decentralized staking and governance
        MVP deployed on Sepolia.
      </p>

      <WalletButton />

      <hr style={{ margin: "2rem 0" }} />

      <Staking />
    </div>
  );
}

export default App;