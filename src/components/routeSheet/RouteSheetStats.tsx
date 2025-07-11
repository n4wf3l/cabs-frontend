import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, Receipt, TrendingUp, MapPin, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
	{
		title: "Feuilles de route actives",
		value: "12",
		icon: Receipt,
		description: "2 terminées aujourd'hui",
		trend: "+8% depuis la semaine dernière",
		color: "text-green-500",
	},
	{
		title: "Temps moyen par route",
		value: "8h20",
		icon: Clock,
		description: "+15min vs moyenne mensuelle",
		trend: "-5% depuis le mois dernier",
		color: "text-red-500",
	},
	{
		title: "Véhicules assignés",
		value: "18",
		icon: Car,
		description: "3 en maintenance",
		trend: "Stable depuis 2 semaines",
		color: "text-blue-500",
	},
	{
		title: "Distance totale parcourue",
		value: "2,450 km",
		icon: MapPin,
		description: "Cette semaine",
		trend: "+12% depuis la semaine dernière",
		color: "text-green-500",
	},
	{
		title: "Revenus générés",
		value: "9,850 €",
		icon: TrendingUp,
		description: "Ce mois",
		trend: "+3% vs mois précédent",
		color: "text-green-500",
	},
	{
		title: "Taux de ponctualité",
		value: "94.7%",
		icon: UserCheck,
		description: "116 trajets à l'heure",
		trend: "+2.3% depuis le mois dernier",
		color: "text-green-500",
	},
];

export function RouteSheetStats() {
	return (
		<motion.div
			className="grid gap-4 md:grid-cols-3"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, staggerChildren: 0.1 }}
		>
			{stats.map((stat, index) => (
				<motion.div
					key={stat.title}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.1 }}
				>
					<Card
						className="overflow-hidden border-t-4"
						style={{
							borderTopColor:
								stat.color === "text-green-500"
									? "#10b981"
									: stat.color === "text-red-500"
									? "#ef4444"
									: "#3b82f6",
						}}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
							<CardTitle className="text-sm font-medium">
								{stat.title}
							</CardTitle>
							<stat.icon className={`h-4 w-4 ${stat.color}`} />
						</CardHeader>
						<CardContent className="pt-4">
							<div className="text-2xl font-bold">{stat.value}</div>
							<p className="text-xs text-muted-foreground mt-1">
								{stat.description}
							</p>
							<div
								className={`text-xs mt-2 ${stat.color} flex items-center gap-1 font-medium`}
							>
								{stat.trend}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</motion.div>
	);
}
