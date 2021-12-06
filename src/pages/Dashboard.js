import Axios from "axios";
function Dashboard() {
  const Tax = async () => {
    const response = await Axios.get("http://localhost:3001/userdata", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { bas, lta, hra, fa, inv, rent, city, med } = response.data;
    let AppHRA;
    if (city === "Metro") {
      const Bas = bas / 2;
      const Rent = rent - (bas * 10) / 100;
      const HRA = hra;
      AppHRA = Math.min(Bas, Rent, HRA);
    } else if (city === "Non Metro") {
      const Bas = (bas * 40) / 100;
      const Rent = rent - (bas * 10) / 100;
      const HRA = hra;
      AppHRA = Math.min(Bas, Rent, HRA);
    }

    const TaxInc = bas + lta + hra + fa - AppHRA - inv - med;
    console.log("Tax ", TaxInc);
    window.alert(`Taxable Income is ${TaxInc}`);
  };
  Tax();
  return (
    <>
      <h1>Welcome to Dashboard</h1>
      <h2></h2>
    </>
  );
}

export default Dashboard;
