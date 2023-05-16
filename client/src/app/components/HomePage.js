import React from "react";
import tableStyle from "../styles/table.module.css";
export default function HomePage() {
	return (
		<>
			<div className={tableStyle.wrapperNoTable}>
				<h3 className={tableStyle.noTable}>Please Select A Source</h3>
				<p className={tableStyle.intro}>
					Welcome to internal tools by Sammy Lam. This tool sorts the data by
					returning IP address which is translated inside the backend to always
					return employee ID as well as date and status of the results. Please
					select a source on the top right
				</p>
				<div className={tableStyle.linkTree}>
					<a
						href='https://github.com/SamLamElectrician/IncidentsReport'
						className={tableStyle.link}
					>
						REPO
					</a>
					<a
						href='https://www.linkedin.com/in/sammy-lam-front-end-dev-electrician/'
						className={tableStyle.link}
					>
						LINKEDIN
					</a>
					<a
						href='https://github.com/SamLamElectrician'
						className={tableStyle.link}
					>
						GITHUB
					</a>
				</div>
			</div>
		</>
	);
}
