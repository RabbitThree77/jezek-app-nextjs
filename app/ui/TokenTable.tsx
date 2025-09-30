import { Key } from "lucide-react"


export const TokenTable = ({table}: {
	table: { [id: string]: number }
}) => {
	return (
		<div className="flex justify-center">
			<table className="table-auto border-collapse border border-gray-400" >
			<thead>
				<tr>
					<th className="border border-gray-400 px-4 py-2">Name</th>
					<th className="border border-gray-400 px-4 py-2">Group points</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(table).map(([key, value]) => (
					<tr key={key}>
						<td className="border border-gray-400 px-4 py-2">{key}</td>
						<td className={`border border-gray-400 px-4 py-2 ${value*-1 > 0 ? "bg-green-800" : "bg-red-800"}`}>{value *-1}</td>
					</tr>
				))}
			</tbody>
		</table>
		</div>
		
	)
}