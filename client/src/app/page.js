"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import DataTable from "./components/DataTable";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
	//use this use state to set the fetch call
	const [IncidentType, setIncidentType] = useState(new Set(["all"]));
	const [incidentReport, setIncidentReport] = useState([]);

	// This function is used to check and confirm the end points
	const checkIncidentType = () => {
		let baseUrl = `http://localhost:9000/incidents`;
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
	const fetchData = async () => {
		try {
			let url = checkIncidentType();
			let response = await fetch(url);
			let data = await response.json();
			setIncidentReport(data.results);
		} catch (error) {
			console.error(error);
		} finally {
			console.log(incidentReport);
		}
	};

	// fetching the data based on each change of Incident type
	useEffect(() => {
		fetchData();
	}, [IncidentType]);

	return (
		<NextUIProvider>
			<Header
				setIncidentType={setIncidentType}
				IncidentType={IncidentType}
			></Header>
			<DataTable
				incidentReport={incidentReport}
				IncidentType={IncidentType}
			></DataTable>
		</NextUIProvider>
	);
}
