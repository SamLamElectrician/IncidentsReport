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

	const [employeeNumber, setEmployeeNumber] = useState([]);

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
		// else {
		// 	return baseUrl;
		// }
	};

	//This function is used to fetch the data, could use some error handling
	const fetchIncidentData = async () => {
		let url;
		try {
			url = checkIncidentType();
			if (url) {
				let response = await fetch(url);
				let IncidentData = await response.json();
				// console.log("finally" + JSON.stringify(data));
				setIncidentReport(IncidentData);
			}
		} catch (error) {
			console.error(error);
	};

	const fetchEmployeeData = async () => {
		let url = "http:localhost:9000/identities";
		try {
			let response = await fetch(url);
			let EmployeeData = await response.json();
			setEmployeeNumber(EmployeeData);
		} catch (error) {
			console.error(error);
		}
	};

	// fetching the data based on each change of Incident type
	useEffect(() => {
		fetchIncidentData();
		fetchEmployeeData()
	}, [IncidentType]);

	return (
		<NextUIProvider>
			{/* providing the data to the tables using a useContext */}
			<Context.Provider value={incidentReport, employeeNumber}>
				<Header
					setIncidentType={setIncidentType}
					IncidentType={IncidentType}
				></Header>
				<DataTable IncidentType={IncidentType}></DataTable>
			</Context.Provider>
		</NextUIProvider>
	);
}
