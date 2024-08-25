import { useState } from "react";
import { useValuesContext } from "./context/valuesContext";
import { LineChart } from "@mui/x-charts/LineChart";

const App = () => {
	const [balances, setBalances] = useState<number[]>([]);
	const { values, setValues } = useValuesContext();
	const { initial, annual, returnRate, years } = values;

	const formatValue = (value: number) => "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	const calculate = () => {
		const urlParams = new URLSearchParams({
			initial: initial.toString(),
			annual: annual.toString(),
			ror: returnRate.toString(),
			years: years.toString(),
		});

		fetch("https://compound-interest-api.vercel.app/calculate" + "?" + urlParams.toString())
			.then((res) => res.json())
			.then((data) => setBalances(data.balance));
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<h1 style={{ padding: 0, margin: "0.5rem", textAlign: "center", fontSize: "1.55rem" }}>
				Compound Interest Calculator
			</h1>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div className="input-group">
					<div className="input-div">
						<label>Initial Investment:</label>
						<input
							type="number"
							value={initial}
							onChange={(e) => setValues({ initial: Number(e.target.value) })}
						/>
					</div>
					<div className="input-div">
						<label>Annual Contribution:</label>
						<input
							type="number"
							value={annual}
							onChange={(e) => setValues({ annual: Number(e.target.value) })}
						/>
					</div>
				</div>
				<div className="input-group">
					<div className="input-div">
						<label>Return Rate:</label>
						<input
							type="number"
							value={returnRate}
							onChange={(e) => setValues({ returnRate: Number(e.target.value) })}
						/>
					</div>
					<div className="input-div">
						<label>Years:</label>
						<input
							type="number"
							value={years}
							onChange={(e) => setValues({ years: Number(e.target.value) })}
						/>
					</div>
				</div>
			</div>
			<button
				onClick={() => calculate()}
				style={{ padding: "0.5rem", margin: "0.25rem", backgroundColor: "darkseagreen", borderWidth: "1.5px" }}>
				Calculate
			</button>
			{balances.length > 0 && (
				<div style={{ width: "100%", maxWidth: "800px", margin: "2rem", marginTop: "0.5rem" }}>
					<h3>Final Balance: {formatValue(balances[balances.length - 1])}</h3>
					<div style={{ width: "100%", height: "400px" }}>
						<LineChart
							title="Compound Interest"
							xAxis={[{ data: Array.from({ length: balances.length }, (_, i) => i) }]}
							series={[
								{
									data: balances,
									valueFormatter: (value) => (value ? formatValue(value) : ""),
									color: "darkgreen",
								},
							]}
							yAxis={[
								{
									valueFormatter: (value) =>
										value
											? Intl.NumberFormat("en-US", {
													notation: "compact",
													maximumFractionDigits: 1,
											  }).format(value)
											: "",
								},
							]}
							sx={{ backgroundColor: "darkseagreen" }}
							margin={{ left: 60 }}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
