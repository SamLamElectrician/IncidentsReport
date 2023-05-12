"use client";
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import DataTable from "./components/DataTable";
import { NextUIProvider } from "@nextui-org/react";

export const Context = createContext();

export default function Home() {
	//use this use state to set the fetch call to store incident type
	const [IncidentType, setIncidentType] = useState(new Set(["all"]));
	const [incidentReport, setIncidentReport] = useState([]);
	const [loading, setLoading] = useState(true);

	// const [employeeNumber, setEmployeeNumber] = useState([]);

	// This function is used to check and confirm the end points
	const checkIncidentType = () => {
		if (
			(IncidentType.currentKey === "denial") |
			(IncidentType.currentKey === "intrusion") |
			(IncidentType.currentKey === "executable")
		) {
			let incidentUrl = `http://localhost:9000/incidents/${IncidentType.currentKey}/`;

			return incidentUrl;
		}
	};

	//This function is used to fetch the data, could use some error handling
	const fetchIncidentData = async () => {
		try {
			const url = checkIncidentType();
			if (!url) {
				console.log("Invalid incident type");
				return;
			}
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const incidentData = await response.json();
			setIncidentReport(incidentData);
		} catch (error) {
			console.error("Error fetching incident data:", error);
		} finally {
			setLoading(false);
		}
	};

	// fetching the data based on each change of Incident type
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
