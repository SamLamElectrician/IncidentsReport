"use client";
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import DataTable from "./components/DataTable";
import { NextUIProvider } from "@nextui-org/react";

//using context to avoid prop drilling to the data tables
export const Context = createContext();

export default function Home() {
	//use this use state to set the fetch call to store incident type
	const [IncidentType, setIncidentType] = useState(new Set(["none"]));
	//state to store data
	const [incidentReport, setIncidentReport] = useState([]);
	const [loading, setLoading] = useState(false);

	// This function is used to check and confirm the end points
	//THIS IS A STRETCH GOAL
	// const checkIncidentType = () => {
	// 	const baseUrl = "http://localhost:9000/incidents";
	// 	if (
	// 		(IncidentType.currentKey === "denial") |
	// 		(IncidentType.currentKey === "intrusion") |
	// 		(IncidentType.currentKey === "executable")
	// 	) {
	// 		let incidentUrl = `http://localhost:9000/incidents/${IncidentType.currentKey}/`;

	// 		return incidentUrl;
	// 	} else {
	// 		return baseUrl;
	// 	}
	// };

	//This function is used to fetch the data
	const fetchIncidentData = async () => {
		try {
			setLoading(true);
			// const url = checkIncidentType();
			const response = await fetch("http://localhost:9000/incidents");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const responseData = await response.json();
			setIncidentReport(responseData);
		} catch (error) {
			console.error("Error fetching incident data:", error);
		} finally {
			setLoading(false);
		}
	};

	// fetching the data based on each change of Incident type, refreshes on change of incidenty type
	useEffect(() => {
		fetchIncidentData();
		// fetchEmployeeData();
	}, [IncidentType]);

	return (
		<NextUIProvider>
			{/* providing the data to the tables using a useContext */}
			<Context.Provider value={incidentReport}>
				<Header
					setIncidentType={setIncidentType}
					IncidentType={IncidentType}
				></Header>
				<DataTable IncidentType={IncidentType} loading={loading}></DataTable>
			</Context.Provider>
		</NextUIProvider>
	);
}
