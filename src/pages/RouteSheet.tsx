import { useState, useEffect } from "react";
import { RouteSheetHeader } from "@/components/routeSheet/RouteSheetHeader";
import { RouteSheetStats } from "@/components/routeSheet/RouteSheetStats";
import { RouteSheetFilters } from "@/components/routeSheet/RouteSheetFilters";
import { RouteSheetTable } from "@/components/routeSheet/RouteSheetTable";
import { RouteSheetDetail } from "@/components/routeSheet/RouteSheetDetail";
import type { DateFilterType, RouteSheet, StatusFilterType } from "@/components/routeSheet/types";

// Mock data - À remplacer par les données de l'API
const mockData: RouteSheet[] = [
	{
		id: "1",
		driverName: "John Doe",
		vehicleId: "CAB-001",
		shiftType: "day",
		date: "2024-01-15",
		startTime: "08:00",
		endTime: "16:00",
		startLocation: "Gare Centrale",
		endLocation: "Aéroport",
		status: "completed",
		kilometers: 120,
		revenue: 450,
	},
	{
		id: "2",
		driverName: "Jane Smith",
		vehicleId: "CAB-002",
		shiftType: "night",
		date: "2024-01-15",
		startTime: "20:00",
		endTime: "04:00",
		startLocation: "Centre-ville",
		endLocation: "Gare Sud",
		status: "in-progress",
		kilometers: 85,
		revenue: 320,
	},
];

export default function RouteSheet() {
	const [selectedRouteSheet, setSelectedRouteSheet] = useState<RouteSheet | null>(null);
	const [dateFilter, setDateFilter] = useState<DateFilterType>("today");
	const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed">(() => {
		// Lire l'état initial du sidebar depuis localStorage
		const mode = localStorage.getItem("sidebarMode");
		return mode === "expanded" ? "expanded" : "collapsed";
	});
	
	// Effet pour écouter les changements dans le mode du sidebar
	useEffect(() => {
		const handleSidebarChange = (e: CustomEvent) => {
			setSidebarState(e.detail.collapsed ? "collapsed" : "expanded");
		};
		
		// Écouter l'événement personnalisé de changement de sidebar
		window.addEventListener("sidebarStateChange", handleSidebarChange as EventListener);
		
		// Assurer que le composant s'adapte correctement à l'état initial du sidebar
		const checkSidebarState = () => {
			if (document.body.classList.contains("sidebar-expanded")) {
				setSidebarState("expanded");
			} else {
				setSidebarState("collapsed");
			}
		};
		
		// Vérifier l'état au montage et après un délai pour s'assurer que les classes sont appliquées
		checkSidebarState();
		setTimeout(checkSidebarState, 200);
		
		return () => {
			window.removeEventListener("sidebarStateChange", handleSidebarChange as EventListener);
		};
	}, []);

	const handleCreateNew = () => {
		// Implémenter la création d'une nouvelle feuille
		console.log("Create new route sheet");
	};

	const handleExport = () => {
		// Implémenter l'export
		console.log("Export route sheets");
	};

	const handleViewDetails = (id: string) => {
		const sheet = mockData.find((s) => s.id === id);
		setSelectedRouteSheet(sheet || null);
	};

	const handleEdit = (id: string) => {
		// Implémenter la modification
		console.log("Edit route sheet", id);
	};

	const handleDelete = (id: string) => {
		// Implémenter la suppression
		console.log("Delete route sheet", id);
	};

	return (
		<div className="h-full w-full bg-background">
			<main className="flex-1 p-4 md:p-8">
				<RouteSheetHeader onCreateNew={handleCreateNew} onExport={handleExport} />
				<hr className="hr-light-effect mt-10 mb-10" />
				<RouteSheetStats />
				<div className="grid gap-8 md:grid-cols-[1fr,320px]">
					<div className="space-y-4">
						<RouteSheetFilters
							dateFilter={dateFilter}
							setDateFilter={setDateFilter}
							statusFilter={statusFilter}
							setStatusFilter={setStatusFilter}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>

						<RouteSheetTable
							data={mockData}
							onViewDetails={handleViewDetails}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					</div>

					<RouteSheetDetail
						data={selectedRouteSheet}
						onEdit={() => selectedRouteSheet && handleEdit(selectedRouteSheet.id)}
					/>
				</div>
			</main>
		</div>
	);
}
